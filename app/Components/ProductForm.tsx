import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "react-toastify";

interface ProductFormProps {
  onProductAdded: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [shopId, setShopId] = useState<number>(1); // Assume default shop ID

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/products", {
        name,
        price,
        stock,
        description,
        image,
        shopId,
      });
      toast.success("Product added successfully!");
      setName("");
      setPrice(0);
      setStock(0);
      setDescription("");
      setImage("");
      onProductAdded();
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Product Name"
      />
      <Input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
        placeholder="Price"
      />
      <Input
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        required
        placeholder="Stock"
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        placeholder="Product Description"
      />
      <Input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
      />
      <Input
        type="number"
        value={shopId}
        onChange={(e) => setShopId(Number(e.target.value))}
        required
        placeholder="Shop ID"
      />
      <Button type="submit" variant="default">
        Add Product
      </Button>
    </form>
  );
};

export default ProductForm;
