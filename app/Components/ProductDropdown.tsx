import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface ProductDropdownProps {
  shopId: number;
}

const ProductDropdown: React.FC<ProductDropdownProps> = ({ shopId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<Product[]>(
        `http://localhost:5000/products?shopId=${shopId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      fetchProducts(); // Fetch products only when opening
    }
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full text-sm font-montserrat dark:bg-gray-700 dark:text-gray-200"
        >
          {isOpen ? "Hide Products" : "Show Products"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <DropdownMenuItem key={product.id} className="flex flex-col">
              <span className="font-semibold font-montserrat">
                {product.name}
              </span>
              <span className="text-sm font-roboto">
                Price: ${product.price} | Stock: {product.stock}
              </span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="font-roboto">
            No products found for this shop.
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductDropdown;
