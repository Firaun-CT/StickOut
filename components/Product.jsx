import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img 
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">R{price}</p>
        </div>
      </Link>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.array,
    name: PropTypes.string,
    slug: PropTypes.shape({
      current: PropTypes.string,
    }),
    price: PropTypes.number,
  }).isRequired,
};

export default Product;
