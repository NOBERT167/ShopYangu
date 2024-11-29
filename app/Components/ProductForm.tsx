import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "react-toastify";

interface Shop {
  id: number;
  name: string;
}

interface ProductFormProps {
  onProductAdded: () => void;
  shops: Shop[];
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductAdded, shops }) => {
  const [selectedShop, setSelectedShop] = useState<string | undefined>(
    undefined
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (shops.length > 0 && !selectedShop) {
      setSelectedShop(shops[0].id.toString());
    }
  }, [shops]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedShop) {
      toast.error("Please select a shop.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/products", {
        name,
        price,
        stock,
        description,
        image,
        shopId: Number(selectedShop),
      });
      toast.success("Product added successfully!");
      setName("");
      setPrice(0);
      setStock(0);
      setDescription("");
      setImage("");
      setSelectedShop(shops.length > 0 ? shops[0].id.toString() : undefined);
      onProductAdded();
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4 font-montserrat">
        Add New Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-800/50 w-full sm:max-w-2xl px-6 py-3 mb-10 rounded-md shadow-md"
      >
        <label className="block mb-2 text-sm font-medium font-roboto">
          Product Name
        </label>
        <Input
          type="text"
          value={name}
          className="font-montserrat"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          } // Typed here
          required
          placeholder="Product Name"
        />
        <label className="block mb-2 text-sm font-medium font-roboto">
          Product Price
        </label>
        <Input
          type="number"
          value={price}
          step="any"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrice(Number(e.target.value))
          } // Typed here
          required
          className="font-montserrat"
          placeholder="Price"
        />
        <label className="block mb-2 text-sm font-medium font-roboto">
          Stock
        </label>
        <Input
          type="number"
          value={stock}
          className="font-montserrat"
          step="1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStock(Number(e.target.value))
          } // Typed here
          required
          placeholder="Stock Quantity"
        />
        <label className="block mb-2 text-sm font-medium font-roboto">
          Product Description
        </label>
        <Textarea
          value={description}
          className="font-montserrat"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          } // Typed here
          required
          placeholder="Product Description"
        />
        <label className="block mb-2 text-sm font-medium font-roboto">
          Image URL
        </label>
        <Input
          type="text"
          value={image}
          className="font-montserrat"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImage(e.target.value)
          } // Typed here
          placeholder="Image URL"
        />
        <div>
          <label className="block mb-2 text-sm font-medium font-roboto">
            Select Shop
          </label>
          <Select
            value={selectedShop}
            onValueChange={(value: string) => setSelectedShop(value)} // Typed here
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a shop" />
            </SelectTrigger>
            <SelectContent>
              {shops.map((shop) => (
                <SelectItem key={shop.id} value={shop.id.toString()}>
                  {shop.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" variant="default">
          Add Product
        </Button>
      </form>
    </>
  );
};

export default ProductForm;
