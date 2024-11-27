"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../Components/ProductForm";
import ProductList from "../Components/ProductList";

interface Product {
  id: number;
  shopId: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>
      <ProductForm onProductAdded={fetchProducts} />
      <ProductList products={products} onProductUpdated={fetchProducts} />
    </div>
  );
};

export default ProductsPage;
