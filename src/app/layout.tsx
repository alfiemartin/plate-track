import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Footer from "../components/footer";
import Header from "../components/header";
import { UIProvider } from "../components/nextui";
import { carApiKey } from "../lib/carApiKey";
import { useCallback } from "react";
import SetupCarApi from "@/providers/car-api/CarApi";

const font = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Plate track",
  description: "Get help, help others",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="light text-foreground bg-background" lang="en">
      <body className={font.className}>
        <UIProvider>
          <div className="flex flex-col justify-between min-h-screen">
            <Header />
            <main className="container mx-auto flex-1 py-16">
              <SetupCarApi />
              {children}
            </main>
            <Footer />
          </div>
        </UIProvider>
      </body>
    </html>
  );
}
