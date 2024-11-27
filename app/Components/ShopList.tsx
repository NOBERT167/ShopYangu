import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ProductDropdown from "./ProductDropdown";

interface Shop {
  id: number;
  name: string;
  description: string;
  logo: string;
}

interface ShopListProps {
  shops: Shop[];
  onShopUpdated: () => void; // Callback to refresh the shop list
}

const ShopList: React.FC<ShopListProps> = ({ shops, onShopUpdated }) => {
  const [editShop, setEditShop] = useState<Shop | null>(null);

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/shops/${id}`);
      toast.success("Shop deleted successfully!");
      onShopUpdated(); // Refresh the shop list
    } catch (error) {
      toast.error("Failed to delete shop. Please try again.");
    }
  };

  // Handle update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editShop) return;

    try {
      await axios.put(`http://localhost:5000/shops/${editShop.id}`, editShop);
      toast.success("Shop updated successfully!");
      setEditShop(null); // Exit edit mode
      onShopUpdated(); // Refresh the shop list
    } catch (error) {
      toast.error("Failed to update shop. Please try again.");
    }
  };

  // Handle input changes during editing
  const handleInputChange = (field: keyof Shop, value: string) => {
    if (editShop) {
      setEditShop({ ...editShop, [field]: value });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {shops.map((shop) =>
        editShop?.id === shop.id ? (
          <Card key={shop.id}>
            <CardHeader>
              <h3 className="text-lg font-bold">Edit Shop</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-4">
                <Input
                  type="text"
                  value={editShop.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  placeholder="Shop Name"
                />
                <Textarea
                  value={editShop.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  required
                  placeholder="Shop Description"
                />
                <Input
                  type="text"
                  value={editShop.logo}
                  onChange={(e) => handleInputChange("logo", e.target.value)}
                  placeholder="Shop Logo URL"
                />
                <div className="flex space-x-2">
                  <Button type="submit" variant="default">
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditShop(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card key={shop.id}>
            <CardHeader>
              <img
                src={shop.logo}
                alt={shop.name}
                className="w-16 h-16 mb-2 rounded border dark:border-gray-700"
              />
              <h3 className="text-lg font-bold">{shop.name}</h3>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{shop.description}</p>
              <ProductDropdown shopId={shop.id} />
              <div className="mt-4 flex space-x-2">
                <Button variant="secondary" onClick={() => setEditShop(shop)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(shop.id)}
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

export default ShopList;
