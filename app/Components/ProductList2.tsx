import React, { useState, useMemo } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const ProductList2: React.FC<ProductListProps> = ({
  products,
  shops,
  onProductUpdated,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShop, setSelectedShop] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const productsPerPage = 6;

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
        `https://shop-yangudb.onrender.com/products/${editProduct.id}`,
        editProduct
      );
      toast.success("Product updated successfully!");
      setEditProduct(null);
      onProductUpdated();
    } catch (error) {
      toast.error("Failed to update product. Please try again.");
    }
  };

  // Filtering and pagination logic
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedShop !== null) {
      filtered = filtered.filter((product) => product.shopId === selectedShop);
    }

    return filtered;
  }, [products, searchTerm, selectedShop]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <Input
          type="text"
          placeholder="Search products..."
          className="font-roboto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="bg-white dark:bg-gray-800/50 rounded px-4 py-2 font-roboto"
          value={selectedShop || ""}
          onChange={(e) =>
            setSelectedShop(
              e.target.value ? parseInt(e.target.value, 10) : null
            )
          }
        >
          <option value="">All Shops</option>
          {shops.map((shop) => (
            <option
              className="bg-white dark:bg-gray-800/50"
              key={shop.id}
              value={shop.id}
            >
              {shop.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedProducts.map((product) =>
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
                  <Input
                    type="text"
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <Button
            variant="outline"
            className="font-montserrat"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <p className="font-roboto">
            Page {currentPage} of {totalPages}
          </p>
          <Button
            variant="outline"
            className="font-montserrat"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductList2;
