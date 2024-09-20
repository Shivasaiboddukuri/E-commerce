import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from URL
  const [product, setProduct] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]); // Set default variant
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleVariantChange = (e) => {
    const variant = product.variants.find(v => v.size === e.target.value);
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    // Logic to add product to the cart
    alert(`Added ${product.name} (Quantity: ${quantity}) to cart!`);
  };

  if (!product.name) return <h2>Loading...</h2>;

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <p>{product.description}</p>

        {selectedVariant ? (
          <div className="product-options">
            <label>Size: </label>
            <select value={selectedVariant.size} onChange={handleVariantChange}>
              {product.variants.map((variant) => (
                <option key={variant.size} value={variant.size}>
                  {variant.size}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="product-price">
          <h2>Price: ${product.price}</h2>
        </div>

        <div className="quantity">
          <label>Quantity: </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            max={selectedVariant ? selectedVariant.stock : product.stock}
          />
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
