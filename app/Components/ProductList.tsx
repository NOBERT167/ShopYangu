"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  onProductUpdated: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onProductUpdated,
}) => {
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://shop-yangudb.onrender.com/products/${id}`);
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
        `https://shop-yangudb.onrender.com/${editProduct.id}`,
        editProduct
      );
      toast.success("Product updated successfully!");
      setEditProduct(null);
      onProductUpdated();
    } catch (error) {
      toast.error("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) =>
        editProduct?.id === product.id ? (
          <Card
            key={product.id}
            className="max-w-sm bg-white dark:bg-gray-800/50"
          >
            <CardHeader>
              <h3 className="text-lg font-bold font-montserrat">
                Edit Product
              </h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-4">
                <Input
                  type="text"
                  value={editProduct.name}
                  className="font-roboto"
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                  required
                />
                <Input
                  type="number"
                  value={editProduct.price}
                  className="font-roboto"
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      price: Number(e.target.value),
                    })
                  }
                  required
                />
                <Input
                  type="number"
                  value={editProduct.stock}
                  className="font-roboto"
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      stock: Number(e.target.value),
                    })
                  }
                  required
                />
                <Textarea
                  value={editProduct.description}
                  className="font-roboto"
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  type="text"
                  value={editProduct.image}
                  className="font-roboto"
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, image: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  <Button
                    className="font-montserrat"
                    type="submit"
                    variant="default"
                  >
                    Save
                  </Button>
                  <Button
                    className="font-montserrat"
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
          <Card
            key={product.id}
            className="max-w-sm border-none bg-white dark:bg-gray-800/50"
          >
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-2 rounded-t font-montserrat"
              />
              <h3 className="text-lg font-bold font-montserrat">
                {product.name}
              </h3>
            </CardHeader>
            <CardContent>
              <p className="mb-4 font-roboto">
                Price: Ksh{product.price.toLocaleString()}
              </p>
              <p className="mb-4 font-roboto">Stock: {product.stock}</p>
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="secondary"
                  className="font-montserrat"
                  onClick={() => setEditProduct(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="font-montserrat"
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
