// pages/cancel.js

import React from 'react';
import Link from 'next/link';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Cancel = () => {
  return (
    <div className="cancel-wrapper">
      <div className="cancel">
        <p className="icon">
          <AiOutlineCloseCircle />
        </p>
        <h2>Payment Cancelled</h2>
        <p className="message">Your payment was not completed. No worries — your cart is still intact.</p>
        <Link href="/">
          <button type="button" className="btn">
            Return to Shop
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
