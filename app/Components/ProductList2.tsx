"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";

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

interface ProductListProps {
  products: Product[];
  shops: Shop[];
  onProductUpdated: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  shops,
  onProductUpdated,
}) => {
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      toast.success("Product deleted successfully!");
      onProductUpdated();
    } catch (error) {
      toast.error("Failed to delete product. Please try again.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;

    try {
      await axios.put(
        `http://localhost:5000/products/${editProduct.id}`,
        editProduct
      );
      toast.success("Product updated successfully!");
      setEditProduct(null);
      onProductUpdated();
    } catch (error) {
      toast.error("Failed to update product. Please try again.");
    }
  };

  // Function to get the shop name by matching shopId
  const getShopName = (shopId: number): string => {
    console.log("Product Shop ID:", shopId); // Debug log
    console.log("Shops Array:", shops); // Debug log

    // Convert shopId to number to ensure matching types
    const shop = shops.find((s) => s.id === Number(shopId));

    // Debug log to check if the shop is found
    if (shop) {
      console.log("Found shop:", shop.name);
    } else {
      console.log("Shop not found for shopId:", shopId);
    }

    return shop ? shop.name : "Unknown Shop";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) =>
        editProduct?.id === product.id ? (
          <Card key={product.id} className="max-w-sm">
            <CardHeader>
              <h3 className="text-lg font-bold">Edit Product</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                  required
                  placeholder="Product Name"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="number"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      price: Number(e.target.value),
                    })
                  }
                  required
                  placeholder="Price"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <textarea
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                  required
                  placeholder="Description"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <div className="flex space-x-2">
                  <Button type="submit" variant="default">
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditProduct(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card key={product.id} className="max-w-sm">
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">
                Shop: {getShopName(product.shopId)}
              </p>{" "}
              {/* Display the shop name */}
              <p className="mb-2">Price: ${product.price}</p>
              <p className="mb-2">Stock: {product.stock}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => setEditProduct(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

export default ProductList;
