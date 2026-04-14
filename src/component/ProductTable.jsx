import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductTable.css';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products?limit=7');
        setProducts(res.data);
        localStorage.setItem('products', JSON.stringify(res.data));
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    fetchData();
  }, []);

  const processedData = products.filter((item) => {
    const title = item?.title || '';
    const cat = item?.category || '';

    return (
      title.toLowerCase().includes(search.toLowerCase()) &&
      (category === 'All' || cat === category)
    );
  });

  return (
    <div className="container">
      <h2 className="title">Product Inventory</h2>

      <div className="controls">
        <input
          className="search-input"
          type="text"
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-select"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {processedData.length > 0 ? (
              processedData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="thumb"
                      style={{ width: '50px' }}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <span className="badge">{item.category}</span>
                  </td>
                  <td className="price-cell">${item.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;