import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
//import { urlFor } from '../lib/client';
import { client } from '../lib/client';

const FooterBanner = ({ footerBanner: { discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image } }) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <h2>{midText}</h2>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <h2>{discount}</h2>
          <p>{smallText}</p>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        <img src={urlFor(image)} className="footer-banner-image" />
      </div>
    </div>
  )
};

FooterBanner.propTypes = {
  footerBanner: PropTypes.shape({
    discount: PropTypes.string,
    largeText1: PropTypes.string,
    largeText2: PropTypes.string,
    saleTime: PropTypes.string,
    smallText: PropTypes.string,
    midText: PropTypes.string,
    desc: PropTypes.string,
    product: PropTypes.string,
    buttonText: PropTypes.string,
    image: PropTypes.object, // You can make this stricter if needed
  }).isRequired
};

export default FooterBanner;
