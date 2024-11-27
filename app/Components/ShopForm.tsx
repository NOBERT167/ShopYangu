"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Add New Shop</h2>
      <div className="mb-4">
        <label className="block mb-2">Shop Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Shop Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Shop Logo URL</label>
        <input
          type="text"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Shop
      </button>
    </form>
  );
};

export default ShopForm;
