import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
//import { urlFor } from '../lib/client';
import { client } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  const smallTextLines = heroBanner.smallText.split('\n');

  return (
    <div className="hero-banner-container">
      <div className="hero-banner-content">
        {smallTextLines.map((line, index) => (
          <p key={index} className="beats-solo">{line}</p>
        ))}

        <h1>{heroBanner.largeText1}</h1>
        <h3>{heroBanner.largeText2}</h3>

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
};

HeroBanner.propTypes = {
  heroBanner: PropTypes.shape({
    smallText: PropTypes.string,
    largeText1: PropTypes.string,
    largeText2: PropTypes.string,
    image: PropTypes.object, // You can make this stricter if needed
    product: PropTypes.string,
    buttonText: PropTypes.string,
    desc: PropTypes.string,
  }).isRequired
};

export default HeroBanner;

