// pages/api/payfast.js

import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { totalAmount, items } = req.body;

    // Your PayFast sandbox merchant credentials
    const merchant_id = '10000100'; // Replace with real or sandbox
    const merchant_key = '46f0cd694581a'; // Replace with real or sandbox
    const passphrase = 'your_passphrase'; // Your PayFast passphrase (should be kept secret)
    const return_url = 'https://stick-out.vercel.app/success';
    const cancel_url = 'https://stick-out.vercel.app/cancel';
    const notify_url = 'https://stick-out.vercel.app/api/payfast-notify'; // optional for IPN

    // Build item description (for display only)
    const item_names = items; // Assuming this is an array or string that describes the items in the cart

    const paymentData = {
      merchant_id,
      merchant_key,
      return_url,
      cancel_url,
      notify_url,
      amount: Number(totalAmount).toFixed(2),  // Ensuring two decimal places
      item_name: item_names || 'Your Cart',
    };

    // Create the query string excluding the signature field
    const queryString = new URLSearchParams(paymentData).toString();

    // Add the passphrase to the string if it's available
    let signatureString = queryString;

    if (passphrase) {
      signatureString += `&passphrase=${passphrase}`;
    }

    // Generate the signature using HMAC-MD5
    const signature = crypto
      .createHmac('md5', merchant_key)
      .update(signatureString)
      .digest('hex'); // Final signature as a hex string

    // Append the signature to the query string
    const finalPaymentUrl = `${paymentUrl}?${queryString}&signature=${signature}`;

    // For sandbox (change to live when ready)
    const paymentUrl = `https://sandbox.payfast.co.za/eng/process`;

    return res.status(200).json({
      status: 'COMPLETE',
      paymentUrl: finalPaymentUrl,
    });

  } catch (error) {
    console.error('PayFast Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


//import { NextApiRequest, NextApiResponse } from 'next';

//export default async (req, res) => {
//  if (req.method === 'POST') {
//    try {
//     const { totalAmount, items } = req.body;
//
//      // Prepare data for PayFast
//      const payfastData = {
//        totalAmount: totalAmount,
//        item_name: items,
//        m_payment_id: '10037814',
//        merchant_key: 'x57qb6loyl7hr'
//        // Other required PayFast parameters here
//      };

      // Call PayFast API to generate payment link (this is just an example)
//      const payfastResponse = await fetch('https://sandbox.payfast.co.za/eng/process', {
//        method: 'POST',
//        headers: {
//          'Content-Type': 'application/json',
//       },
//        body: JSON.stringify(payfastData),
//      });

//      const data = await payfastResponse.json();

//      if (data.status === 'COMPLETE') {
//        return res.json({ status: 'COMPLETE', paymentUrl: data.payment_url });
//      } else {
//        return res.status(500).json({ status: 'error', message: 'Error from PayFast API' });
//      }
//    } catch (error) {
//      console.error('Error with PayFast API:', error);
//      res.status(500).json({ status: 'error', message: 'Internal server error' });
//    }
//  } else {
//    res.status(405).json({ message: 'Method Not Allowed' });
//  }
//};

//ORIGINAL CODE
//export default function handler(req, res) {//
//    if (req.method === 'POST') {
  //      const { merchant_id, merchant_key, return_url, cancel_url, notify_url, amount, item_name, email_address } = req.body;
//
        // Prepare the data
  //      const data = {
    //        10037814:
      //      x57qb6loyl7hr,
        //    stickout,
        //    cancel_url,
         //   notify_url,
         //   amount,
         //   item_name,
         //   email_address,
       // };

        // Generate the signature for the transaction
        //const signature = generateSignature(merchant_id, merchant_key, amount, item_name, email_address);
        //data.signature = signature;

        // Respond with the data (you can adjust this part depending on how you'd like to use this data)
        //res.status(200).json(data);
    //} else {
    //    res.status(405).json({ message: 'Method Not Allowed' });
   // }
//}

//function generateSignature(merchant_id, merchant_key, amount, item_name, email_address) {
    // Generate the signature using MD5 (same logic as the PHP code)
  //  const dataString = merchant_id + merchant_key + amount + item_name + email_address;
    //return require('crypto').createHash('md5').update(dataString).digest('hex');
//}//
