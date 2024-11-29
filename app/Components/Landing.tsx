import React from "react";
import { Button } from "@shadcn/ui/button";
import { Card, CardHeader, CardContent } from "@shadcn/ui/card";
import { BorderBeam, ParticleBackground, GlitchText } from "magic-ui"; // Cool animations
import { Marquee, AuroraBackground } from "aceternity-ui"; // Extra stunning effects

const LandingPage: React.FC = () => {
  return (
    <main className="relative bg-gray-900 text-gray-100">
      {/* Particle Background */}
      <ParticleBackground
        config={{
          particleColor: "#ffffff",
          particleOpacity: 0.6,
          particleSize: 3,
          interactive: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Navbar */}
      <header className="relative z-10 bg-transparent py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-white">
            <GlitchText text="ShopManager" color="cyan" />
          </h1>
          <nav className="space-x-4">
            <Button variant="link" className="text-white hover:text-gray-400">
              Home
            </Button>
            <Button variant="link" className="text-white hover:text-gray-400">
              Products
            </Button>
            <Button variant="link" className="text-white hover:text-gray-400">
              Shops
            </Button>
            <Button
              variant="default"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Login
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section with Aurora Effect */}
      <section className="relative z-10 py-20">
        <AuroraBackground
          colorScheme="cyan-purple"
          intensity={0.5}
          className="absolute inset-0"
        />
        <div className="relative container mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-white mb-4">
            <GlitchText text="Revolutionize Your Shop Management" />
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Elevate your business with cutting-edge product and shop management
            tools. Designed for efficiency and simplicity.
          </p>
          <Button
            variant="default"
            size="lg"
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Cool Component: BorderBeam */}
      <section className="relative z-10 py-16 bg-gray-800">
        <div className="container mx-auto">
          <BorderBeam>
            <div className="p-8 text-center">
              <h3 className="text-3xl font-semibold text-white mb-4">
                Unique Animated Borders for a Fresh Look
              </h3>
              <p className="text-lg text-gray-300">
                Use visually striking components like BorderBeam to make your
                sections stand out.
              </p>
            </div>
          </BorderBeam>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-12">
            Features You'll Love
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-white">
                <h4 className="text-2xl font-bold">
                  Seamless Product Management
                </h4>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Add, edit, and delete products effortlessly while tracking
                  inventory in real time.
                </p>
              </CardContent>
            </Card>
            {/* Feature 2 */}
            <Card className="hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-white">
                <h4 className="text-2xl font-bold">Powerful Shop Tools</h4>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Manage multiple shops and associate products seamlessly with a
                  single dashboard.
                </p>
              </CardContent>
            </Card>
            {/* Feature 3 */}
            <Card className="hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-white">
                <h4 className="text-2xl font-bold">Real-Time Notifications</h4>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Get instant updates and stay informed on every action with
                  toast notifications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cool Component: Marquee */}
      <section className="py-12 bg-gray-700">
        <Marquee speed={40} className="text-lg text-gray-300">
          Manage Products • Manage Shops • Real-Time Updates • Revolutionize
          Your Workflow
        </Marquee>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-center">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold mb-6">Take the Leap Today</h3>
          <p className="text-lg mb-8">
            Join thousands of businesses already simplifying their management
            processes with ShopManager.
          </p>
          <Button
            variant="default"
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-200"
          >
            Start Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        &copy; 2024 ShopManager. Built with creativity, innovation, and passion.
      </footer>
    </main>
  );
};

export default LandingPage;

// Handing id
const handleAddShop = async (shopName: string) => {
  try {
    // Fetch the existing shops
    const response = await axios.get("http://localhost:5000/shops");
    const existingShops = response.data;

    // Calculate the next numeric ID
    const nextId =
      existingShops.length > 0
        ? Math.max(...existingShops.map((shop: { id: number }) => shop.id)) + 1
        : 1;

    // Add the new shop with the calculated ID
    const newShop = { id: nextId, name: shopName };
    await axios.post("http://localhost:5000/shops", newShop);

    console.log("Shop added successfully:", newShop);
  } catch (error) {
    console.error("Failed to add shop:", error);
  }
};

// Dashboard
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@shadcn/ui/card";

interface Shop {
  id: number;
  name: string;
}

interface Product {
  id: number;
  shopId: number;
  name: string;
  stock: number;
}

const Dashboard: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [topShops, setTopShops] = useState<
    { shop: Shop; totalStock: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopsResponse = await axios.get("http://localhost:5000/shops");
        const productsResponse = await axios.get(
          "http://localhost:5000/products"
        );

        setShops(shopsResponse.data);
        setProducts(productsResponse.data);

        // Calculate top 5 shops by stock level
        const stockByShop = productsResponse.data.reduce(
          (acc: Record<number, number>, product: Product) => {
            acc[product.shopId] = (acc[product.shopId] || 0) + product.stock;
            return acc;
          },
          {}
        );

        const topShopsData = Object.entries(stockByShop)
          .map(([shopId, totalStock]) => {
            const shop = shopsResponse.data.find(
              (s: Shop) => s.id === parseInt(shopId, 10)
            );
            return { shop, totalStock: totalStock as number };
          })
          .filter((entry) => entry.shop) // Filter out undefined shops
          .sort((a, b) => b.totalStock - a.totalStock) // Sort by stock in descending order
          .slice(0, 5); // Take top 5 shops

        setTopShops(topShopsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Top 5 Shops by Stock Level */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Top 5 Shops by Stock Level
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topShops.map(({ shop, totalStock }) => (
            <Card key={shop.id}>
              <CardHeader>
                <h3 className="text-lg font-bold">{shop.name}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Total Stock: {totalStock.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
