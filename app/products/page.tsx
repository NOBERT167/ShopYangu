"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../Components/ProductForm";
import ProductList2 from "../Components/ProductList2";

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
      const response = await axios.get(
        "https://shop-yangudb.onrender.com/products"
      );
      // Sort products in descending order by ID (newest first)
      const sortedProducts = response.data.sort(
        (a: Product, b: Product) => b.id - a.id
      );
      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchShops = async () => {
    try {
      const response = await axios.get(
        "https://shop-yangudb.onrender.com/shops"
      );
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
    <div className="px-2 md:px-6 md:py-4">
      <h1 className="text-2xl md:text-4xl font-montserrat font-bold mb-4">
        Products Management
      </h1>
      <ProductForm onProductAdded={fetchProducts} shops={shops} />
      <ProductList2
        products={products}
        shops={shops}
        onProductUpdated={fetchProducts}
      />
    </div>
  );
};

export default ProductsPage;
