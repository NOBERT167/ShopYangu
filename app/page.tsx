// import Link from "next/link";
// import React from "react"; // Use this if you're using React Router, or Next.js navigation if it's a Next app.

// const LandingPage: React.FC = () => {
//   return (
//     <div className=" ">
//       {/* Hero Section */}
//       <section className="text-center py-16 bg-background">
//         <div className="max-w-3xl mx-auto">
//           <h2 className="text-4xl font-bold text-gray-800 mb-4">
//             Welcome to ShopManager
//           </h2>
//           <p className="text-lg text-gray-600 mb-6">
//             Manage your products and shops with ease. Keep track of inventory,
//             update products, and manage shop details all in one place.
//           </p>
//           <Link
//             href="/products"
//             className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 transition"
//           >
//             Get Started
//           </Link>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-background">
//         <div className="max-w-screen-xl mx-auto text-center">
//           <h3 className="text-3xl font-semibold text-gray-800 mb-12">
//             Key Features
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
//             <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
//               <h4 className="text-xl font-semibold text-gray-700 mb-4">
//                 Product Management
//               </h4>
//               <p className="text-gray-600">
//                 Add, edit, and delete products with ease. Track inventory and
//                 keep everything updated.
//               </p>
//             </div>
//             <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
//               <h4 className="text-xl font-semibold text-gray-700 mb-4">
//                 Shop Management
//               </h4>
//               <p className="text-gray-600">
//                 Manage your shops and view detailed information about each.
//                 Easily associate products with shops.
//               </p>
//             </div>
//             <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
//               <h4 className="text-xl font-semibold text-gray-700 mb-4">
//                 Real-time Notifications
//               </h4>
//               <p className="text-gray-600">
//                 Get instant updates with toast notifications when actions like
//                 adding, updating, or deleting products are performed.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="text-center py-16 bg-blue-600 text-white">
//         <div className="max-w-screen-md mx-auto">
//           <h3 className="text-3xl font-semibold mb-4">
//             Ready to Manage Your Products and Shops?
//           </h3>
//           <p className="text-lg mb-8">
//             Get started today and simplify your product and shop management with
//             ShopManager.
//           </p>
//           <Link
//             href="/products"
//             className="inline-block bg-white text-blue-600 py-2 px-6 rounded-lg text-lg hover:bg-gray-100 transition"
//           >
//             Start Managing
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-6">
//         <div className="max-w-screen-xl mx-auto text-center">
//           <p>&copy; 2024 ShopManager. All Rights Reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };
{
  /* <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10 h-[150vh]" /> */
}

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklesCore } from "@/components/ui/sparkles";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { MagicCard } from "@/components/ui/magic-card";

import { BarChart2, ShoppingCart, Users, TrendingUp } from "lucide-react";
import Wrapper from "./Components/Wrapper";
import Container from "./Components/Container";
import { BorderBeam } from "@/components/ui/border-beam";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">
      {/* Hero Section with Sparkle Effect */}
      <Wrapper>
        <Container>
          <div className="relative w-full overflow-hidden">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={50}
              className="absolute inset-0 z-0"
            />
            <div className="relative z-10 container mx-auto px-4 py-16 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 mt-10 font-montserrat">
                Manage Your Shop <Highlight>Effortlessly</Highlight>
              </h1>
              <p className="text-xl mb-8 text-muted-foreground dark:text-dark-muted-foreground font-roboto mt-8">
                Streamline your business operations with powerful, intuitive
                tools
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="default" size="lg">
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Wrapper>
            <Container>
              <MagicCard className="dark:bg-gray-800/50 hover:bg-gray-950">
                <CardHeader>
                  <BarChart2 className="w-10 h-10 text-primary" />
                  <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Gain insights with real-time business analytics
                  </p>
                </CardContent>
                <BorderBeam
                  className="rounded-xl"
                  size={250}
                  delay={9}
                  duration={4}
                />
              </MagicCard>
            </Container>
          </Wrapper>

          <Wrapper>
            <Container>
              <MagicCard className="dark:bg-gray-800/50 hover:bg-gray-950">
                <CardHeader>
                  <ShoppingCart className="w-10 h-10 text-primary" />
                  <CardTitle>Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Track and manage your product inventory
                  </p>
                </CardContent>
                <BorderBeam
                  className="rounded-xl"
                  size={250}
                  delay={9}
                  duration={4}
                />
              </MagicCard>
            </Container>
          </Wrapper>

          <Wrapper>
            <Container>
              <MagicCard className="dark:bg-gray-800/50 hover:bg-gray-950">
                <CardHeader>
                  <Users className="w-10 h-10 text-primary" />
                  <CardTitle>Customer Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Keep track of customer interactions
                  </p>
                </CardContent>
                <BorderBeam
                  className="rounded-xl"
                  size={250}
                  delay={9}
                  duration={4}
                />
              </MagicCard>
            </Container>
          </Wrapper>

          <Wrapper>
            <Container>
              <MagicCard className="dark:bg-gray-800/50 hover:bg-gray-950">
                <CardHeader>
                  <TrendingUp className="w-10 h-10 text-primary" />
                  <CardTitle>Sales Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Monitor and optimize your sales performance
                  </p>
                </CardContent>
                <BorderBeam
                  size={250}
                  delay={9}
                  className="rounded-xl"
                  duration={4}
                />
              </MagicCard>
            </Container>
          </Wrapper>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
