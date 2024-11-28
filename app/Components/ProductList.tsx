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
                <Input
                  type="text"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                  required
                />
                <Input
                  type="number"
                  value={editProduct.price}
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
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, image: e.target.value })
                  }
                />
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
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card key={product.id} className="max-w-sm">
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-2 rounded-t"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Price: Ksh {product.price}</p>
              <p className="mb-4">Stock: {product.stock}</p>
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
