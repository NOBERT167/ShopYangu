"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../Components/ProductForm";
import ProductList from "../Components/ProductList";

interface Shop {
  id: number;
  name: string;
}

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
  const [shops, setShops] = useState<Shop[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchShops = async () => {
    try {
      const response = await axios.get("http://localhost:5000/shops");
      setShops(response.data);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchShops();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>
      <ProductForm onProductAdded={fetchProducts} shops={shops} />
      <ProductList products={products} onProductUpdated={fetchProducts} />
    </div>
  );
};

export default ProductsPage;
