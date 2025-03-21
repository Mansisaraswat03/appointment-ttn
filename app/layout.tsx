import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: 'MedCare',
  description: 'Healthcare in Your Hands',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Navbar/>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
        <Footer/>
      </body>
    </html>
  );
}
