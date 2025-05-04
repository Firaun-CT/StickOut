import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  // Split the smallText into an array of lines based on line breaks
  const smallTextLines = heroBanner.smallText.split('\n');

  return (
    <div className="hero-banner-container">
      <div className="hero-banner-content">
        {/* Render each line of smallText in a separate <p> */}
        {smallTextLines.map((line, index) => (
          <p key={index} className="beats-solo">{line}</p>
        ))}

        <h1>{heroBanner.largeText1}</h1>
        <h3>{heroBanner.largeText2}</h3>

        {/* Add image and apply text wrapping */}
        <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image" />
        
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>PRODUCTS</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
