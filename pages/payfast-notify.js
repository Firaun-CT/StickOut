// pages/api/payfast-notify.js

import crypto from 'crypto';
import clientPromise from '../../lib/mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

const buffer = async (readable) => {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const rawBody = await buffer(req);
    const payloadString = rawBody.toString('utf-8');
    const params = Object.fromEntries(new URLSearchParams(payloadString));

    const passphrase = 'your_passphrase';
    const sortedKeys = Object.keys(params).filter(k => k !== 'signature').sort();
    let signatureString = sortedKeys.map(key => `${key}=${params[key]}`).join('&');

    if (passphrase) {
      signatureString += `&passphrase=${passphrase}`;
    }

    const calculatedSignature = crypto.createHash('md5').update(signatureString).digest('hex');

    if (calculatedSignature !== params.signature) {
      return res.status(400).end('Invalid signature');
    }

    const validateResponse = await fetch('https://sandbox.payfast.co.za/eng/query/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payloadString,
    });

    const validateText = await validateResponse.text();

    if (validateText !== 'VALID') {
      return res.status(400).end('Validation failed');
    }

    if (params.payment_status === 'COMPLETE') {
      const client = await clientPromise;
      const db = client.db();

      const order = {
        pf_payment_id: params.pf_payment_id,
        amount: params.amount_gross,
        name: params.name_first + ' ' + params.name_last,
        email: params.email_address,
        item_name: params.item_name,
        status: params.payment_status,
        date: new Date(),
      };

      await db.collection('orders').insertOne(order);

      console.log('✅ Order saved:', order);
    }

    res.status(200).end('IPN processed');
  } catch (error) {
    console.error('IPN error:', error);
    res.status(500).end('Server error');
  }
}
