"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Metrics {
  totalShops: number;
  totalProducts: number;
  totalStock: number;
  totalValue: number;
}

interface StockStatus {
  inStock: number;
  lowStock: number;
  outOfStock: number;
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

interface Shop {
  id: number;
  name: string;
  description: string;
  logo: string;
}

const Dashboard = () => {
  const [isClient, setIsClient] = useState(false); // Fix hydration error
  const [metrics, setMetrics] = useState<Metrics>({
    totalShops: 0,
    totalProducts: 0,
    totalStock: 0,
    totalValue: 0,
  });
  const [stockStatus, setStockStatus] = useState<StockStatus>({
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
  });

  useEffect(() => {
    setIsClient(true); // Ensure client-only rendering

    const fetchData = async () => {
      try {
        const shopsResponse = await axios.get<Shop[]>(
          "http://localhost:5000/shops"
        );
        const productsResponse = await axios.get<Product[]>(
          "http://localhost:5000/products"
        );

        const shops = shopsResponse.data;
        const products = productsResponse.data;

        const totalStock = products.reduce(
          (acc, product) => acc + product.stock,
          0
        );
        const totalValue = products.reduce(
          (acc, product) => acc + product.price * product.stock,
          0
        );

        const stockStatus = {
          inStock: products.filter((product) => product.stock > 5).length,
          lowStock: products.filter(
            (product) => product.stock > 0 && product.stock <= 5
          ).length,
          outOfStock: products.filter((product) => product.stock === 0).length,
        };

        setMetrics({
          totalShops: shops.length,
          totalProducts: products.length,
          totalStock,
          totalValue,
        });
        setStockStatus(stockStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ["In Stock", "Low Stock", "Out of Stock"],
    datasets: [
      {
        label: "Stock Distribution",
        data: [
          stockStatus.inStock,
          stockStatus.lowStock,
          stockStatus.outOfStock,
        ],
        backgroundColor: ["#34D399", "#FBBF24", "#EF4444"],
      },
    ],
  };

  if (!isClient) return null;

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-gray-800 shadow-md">
          <CardHeader>Total Shops</CardHeader>
          <CardContent>{metrics.totalShops}</CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 shadow-md">
          <CardHeader>Total Products</CardHeader>
          <CardContent>{metrics.totalProducts}</CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 shadow-md">
          <CardHeader>Total Stock</CardHeader>
          <CardContent>{metrics.totalStock}</CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800 shadow-md">
          <CardHeader>Total Value</CardHeader>
          <CardContent>Ksh{metrics.totalValue.toLocaleString()}</CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Stock Distribution</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
