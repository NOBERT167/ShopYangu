import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklesCore } from "@/components/ui/sparkles";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { MagicCard } from "@/components/ui/magic-card";

import {
  BarChart2,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowRight,
  Heart,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  LinkIcon,
  WholeWordIcon,
  WholeWord,
  ExternalLink,
  LucideComputer,
  Computer,
  Laptop,
} from "lucide-react";
import Wrapper from "./Components/Wrapper";
import Container from "./Components/Container";
import { BorderBeam } from "@/components/ui/border-beam";
import SectionBadge from "@/components/ui/SectionBadge";
import Icons from "./Components/Globals/icons";
import { features } from "./Components/Globals/Constants";
import Link from "next/link";
import { LampContainer } from "@/components/ui/lamp";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

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
                <Button
                  variant="default"
                  size="lg"
                  className="text-white font-montserrat"
                >
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="font-roboto">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* Features Section */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-20">
          <Wrapper>
            <Container>
              <MagicCard className="dark:bg-gray-800/50 hover:bg-gray-950">
                <CardHeader>
                  <BarChart2 className="w-10 h-10 text-primary" />
                  <CardTitle className="font-montserrat">Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-roboto mb-4">
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
                  <CardTitle className="font-montserrat">Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-roboto mb-4">
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
                  <CardTitle className="font-montserrat">
                    Customer Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-roboto">
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
                  <CardTitle className="font-montserrat">
                    Sales Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-roboto mb-4">
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

        <div className="py-12">
          <Wrapper className="flex flex-col items-center relative">
            <Container>
              <div className="max-w-md md:mx-auto text-start md:text-center">
                <SectionBadge title="Features" />
                <h3 className="text-3xl md:text-4xl font-semibold mt-6">
                  Discover our powerful features
                </h3>
                <p className="text-muted-foreground mt-6 font-montserrat">
                  ShopYangu offers the following features to help you Elevate
                  your business
                </p>
              </div>
            </Container>

            <Container className="flex flex-col w-full justify-center items-center py-10 md:py-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start py-4 px-4 md:px-6 lg:px-8 lg:py-6"
                  >
                    <div className="flex items-center justify-center">
                      <feature.icon className="w-8 h-8 bg-primary p-1 rounded-md" />
                    </div>
                    <h3 className="text-lg font-semibold mt-4 font-roboto">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-start mt-2 font-montserrat">
                      {feature.info}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </Wrapper>
        </div>
      </div>

      {/* Call to Action */}
      <div className="">
        <Wrapper className="flex flex-col items-center justify-center py-4 relative">
          <Container>
            <LampContainer>
              <div className="flex flex-col items-center justify-center relative w-full text-center">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl lg:!leading-snug font-semibold mt-8">
                  Take the Leap Today
                </h2>
                <p className="text-muted-foreground mt-6 max-w-md mx-auto">
                  Join thousands of businesses already simplifying their
                  management processes with ShopManager.
                </p>
                <Button variant="default" className="mt-6" asChild>
                  <Link href="/shops" className="font-montserrat text-white">
                    Explore Now!
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </LampContainer>
          </Container>
        </Wrapper>
      </div>

      {/* footer */}
      <Wrapper>
        <Container>
          <footer className="">
            <div className="relative size-full overflow-hidden  bg-background py-8 px-2 md:px-4">
              <div className="">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 mb-10">
                  <div className="flex flex-wrap items-center space-x-2 z-30 justify-center sm:justify-start">
                    <span className="text-gray-600 font-montserrat dark:text-gray-300 mb-2 sm:mb-0 text-center sm:text-left">
                      Designed and crafted with ❤️ by{" "}
                    </span>
                    <Link
                      href="https://nobertdev-portfolio.netlify.app/"
                      target="_blank"
                      className="text-primary hover:text-primary/80 transition-colors mb-4 md:mb-0 text-center sm:text-left"
                    >
                      {" <Nobert.Dev />"}
                    </Link>
                  </div>

                  <div className="flex space-x-4">
                    <Link
                      href="https://github.com/NOBERT167"
                      target="_blank"
                      className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <Laptop size={24} />
                    </Link>
                    <Link
                      href="https://github.com/NOBERT167"
                      target="_blank"
                      className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <Github size={24} />
                    </Link>

                    <Link
                      href="https://www.linkedin.com/in/langat-kipkoech-nobert-ab44661ba/"
                      target="_blank"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Linkedin size={24} />
                    </Link>

                    <Link
                      href="https://twitter.com/Darkcode1999"
                      target="_blank"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      <Twitter size={24} />
                    </Link>

                    <Link
                      href="https://www.instagram.com/nobert.dev/"
                      target="_blank"
                      className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                    >
                      <Instagram size={24} />
                    </Link>
                    <Link
                      href="https://bio.link/nobertdev"
                      target="_blank"
                      className="text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                    >
                      <LinkIcon size={24} />
                    </Link>
                  </div>
                </div>
                <div className="text-sm text-center font-montserrat text-gray-600 dark:text-gray-300 mt-4 md:mb-0">
                  © {new Date().getFullYear()} Nobert.Dev All rights reserved.
                </div>
              </div>
              <GridPattern
                width={20}
                height={20}
                x={-1}
                y={-1}
                className={cn(
                  "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
                )}
              />
              <div className="pointer-events-none absolute w-1/3 bg-gradient-to-r from-background left-0 inset-y-0"></div>
              <div className="pointer-events-none absolute w-1/3 bg-gradient-to-l from-background right-0 inset-y-0"></div>
            </div>
          </footer>
        </Container>
      </Wrapper>
    </div>
  );
};

export default LandingPage;
