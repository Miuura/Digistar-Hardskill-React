import React, { useState, useEffect } from 'react';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    sku: '',
    weight: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form Data Submitted:", formData);
  };

  useEffect(() => {
    if (submitted) {
      setSubmitted(false);
    }
  }, [submitted, formData]);

  return (
    <form style={{ margin: '50px 200px' }} onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter product title"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="3"
          placeholder="Enter product description"
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          id="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Enter product price"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="brand" className="form-label">Brand</label>
        <input
          type="text"
          className="form-control"
          id="brand"
          value={formData.brand}
          onChange={handleInputChange}
          placeholder="Enter product brand"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="sku" className="form-label">SKU</label>
        <input
          type="text"
          className="form-control"
          id="sku"
          value={formData.sku}
          onChange={handleInputChange}
          placeholder="Enter product SKU"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="weight" className="form-label">Weight (in kg)</label>
        <input
          type="number"
          className="form-control"
          id="weight"
          value={formData.weight}
          onChange={handleInputChange}
          placeholder="Enter product weight"
        />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ProductForm;
