"use client";
import React, { useState } from "react";
import axios from "axios";
import ProductDropdown from "./ProductDropdown";
import { toast } from "react-toastify";

interface Shop {
  id: number;
  name: string;
  description: string;
  logo: string;
}

interface ShopListProps {
  shops: Shop[];
  onShopUpdated: () => void;
}

const ShopList: React.FC<ShopListProps> = ({ shops, onShopUpdated }) => {
  const [editShop, setEditShop] = useState<Shop | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/shops/${id}`);
      toast.success("Shop deleted successfully!");
      onShopUpdated();
    } catch (error) {
      toast.error("Failed to delete shop. Please try again.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editShop) return;

    try {
      await axios.put(`http://localhost:5000/shops/${editShop.id}`, editShop);
      toast.success("Shop updated successfully!");
      setEditShop(null);
      onShopUpdated();
    } catch (error) {
      toast.error("Failed to update shop. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {shops.map((shop) =>
        editShop?.id === shop.id ? (
          <form
            key={shop.id}
            onSubmit={handleUpdate}
            className="p-4 border rounded shadow-md"
          >
            <h3 className="text-lg font-bold mb-2">Edit Shop</h3>
            <input
              type="text"
              value={editShop.name}
              onChange={(e) =>
                setEditShop({ ...editShop, name: e.target.value })
              }
              required
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              value={editShop.description}
              onChange={(e) =>
                setEditShop({ ...editShop, description: e.target.value })
              }
              required
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              value={editShop.logo}
              onChange={(e) =>
                setEditShop({ ...editShop, logo: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditShop(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div key={shop.id} className="p-4 border rounded shadow-md">
            <img src={shop.logo} alt={shop.name} className="w-16 h-16 mb-2" />
            <h3 className="text-lg font-bold">{shop.name}</h3>
            <p className="mb-2">{shop.description}</p>
            <ProductDropdown shopId={shop.id} />
            <div className="mt-4">
              <button
                onClick={() => setEditShop(shop)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(shop.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ShopList;
