import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./Components/ThemeProvider";
import Sidebar from "./Components/Sidebar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <ToastContainer position="top-right" autoClose={3000} />
          <main className="px-5 mt-16 sm:pl-[300px] bg-gray-100 dark:bg-gray-950 sm:mt-0">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
