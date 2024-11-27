"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface ProductDropdownProps {
  shopId: number;
}

const ProductDropdown: React.FC<ProductDropdownProps> = ({ shopId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`http://localhost:5000/products?shopId=${shopId}`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [isOpen, shopId]);

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-gray-200 px-4 py-2 rounded"
      >
        {isOpen ? "Hide Products" : "Show Products"}
      </button>
      {isOpen && (
        <ul className="mt-2 border rounded p-2 bg-white">
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product.id} className="mb-2">
                <strong>{product.name}</strong> - ${product.price} (Stock:{" "}
                {product.stock})
              </li>
            ))
          ) : (
            <li>No products found for this shop.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProductDropdown;
