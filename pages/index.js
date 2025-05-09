import React from 'react';
import PropTypes from 'prop-types';

import { client } from '../lib/client';

import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
    <div className="products-heading">
      <h2>Product List</h2>
      <p>(tell us of products required not listed)</p>
    </div>

    <div className="products-container">
      {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);

// ✅ Add PropTypes here:
Home.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      // Add more fields as needed, e.g., name, price, etc.
    })
  ).isRequired,
  bannerData: PropTypes.arrayOf(
    PropTypes.shape({
      // Define banner fields if known, e.g. image, title, etc.
    })
  ).isRequired,
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  };
};

export default Home;
