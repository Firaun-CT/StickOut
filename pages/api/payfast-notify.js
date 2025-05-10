// pages/api/payfast-notify.js

import crypto from 'crypto';
import clientPromise from '../../lib/mongodb';
import { Buffer } from 'buffer';

export const config = {
  api: {
    bodyParser: false,  // Disables body parser to handle raw body
  },
};

// Helper function to read the raw body
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
    const rawBody = await buffer(req);  // Get raw body
    const payloadString = rawBody.toString('utf-8');  // Convert the raw body to a string
    const params = Object.fromEntries(new URLSearchParams(payloadString));  // Parse params into an object

    const passphrase = 'TreacherousAffair';  // Your PayFast passphrase (keep this secret)
    
    // Remove signature field from params before creating the signature
    const sortedKeys = Object.keys(params).filter(k => k !== 'signature').sort();

    // Create the signature string from sorted parameters
    let signatureString = sortedKeys.map(key => `${key}=${params[key]}`).join('&');

    // Add the passphrase (if it exists) to the string
    if (passphrase) {
      signatureString += `&passphrase=${passphrase}`;
    }

    // Generate the signature using HMAC-MD5 (PayFast signature method)
    const calculatedSignature = crypto
      .createHmac('md5', params['merchant_key'])  // Use merchant_key as the secret key
      .update(signatureString)
      .digest('hex');  // Convert to hex format

    // Compare the calculated signature with the one received in the params
    if (calculatedSignature !== params.signature) {
      return res.status(400).end('Invalid signature');
    }

    // Now validate the request with PayFast by calling their validation endpoint
    const validateResponse = await fetch('https://sandbox.payfast.co.za/eng/query/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payloadString,  // Send the exact same payload back to PayFast for validation
    });

    const validateText = await validateResponse.text();  // Get the response text

    // Check if PayFast response is VALID
    if (validateText !== 'VALID') {
      return res.status(400).end('Validation failed');
    }

    // Now, handle the successful payment and insert into MongoDB if status is 'COMPLETE'
    if (params.payment_status === 'COMPLETE') {
      const client = await clientPromise;  // Wait for MongoDB client connection
      const db = client.db();  // Access the database

      // Create the order object from PayFast data
      const order = {
        pf_payment_id: params.pf_payment_id,
        amount: params.amount_gross,
        item_name: params.item_name,
        status: params.payment_status,
        date: new Date(),
      };

      // Insert the order into the MongoDB collection 'neondb'
      await db.collection('neondb').createIndex({ pf_payment_id: 1 }, { unique: true });
      await db.collection('neondb').insertOne(order);  // Insert order into the collection

      console.log('✅ Order saved:', order);  // Log the inserted order details
    }

    // Send a success response to PayFast (required for IPN)
    res.status(200).end('IPN processed');
  } catch (error) {
    console.error('IPN error:', error);  // Log any errors
    res.status(500).end('Server error');
  }
}
