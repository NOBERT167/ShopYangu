import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface ShopFormProps {
  onShopAdded: () => void;
}

const ShopForm: React.FC<ShopFormProps> = ({ onShopAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/shops", {
        name,
        description,
        logo,
      });
      toast.success("Shop added successfully!");
      setName("");
      setDescription("");
      setLogo("");
      onShopAdded();
    } catch (error) {
      toast.error("Failed to add shop. Please try again.");
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800/50 w-full sm:max-w-lg">
      <CardHeader>
        <h2 className="text-lg font-bold font-roboto">Add New Shop</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium font-montserrat">
              Shop Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium font-montserrat">
              Shop Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium font-montserrat">
              Shop Logo URL
            </label>
            <Input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="dark:bg-gray-700 dark:text-gray-200 font-montserrat"
            />
          </div>
          <Button
            type="submit"
            variant="default"
            className="font-montserrat text-white"
          >
            Add Shop
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ShopForm;
