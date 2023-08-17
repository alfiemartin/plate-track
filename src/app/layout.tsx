import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Footer from "../components/footer";
import Header from "../components/header";
import { UIProvider } from "../components/nextui";
import { carApiKey } from "../lib/carApiKey";
import { useCallback, useState } from "react";

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
  const [apiKey, setApiKey] = useState('')
  useCallback(() => {
    (async () => {
      await carApiKey();
      setApiKey(globalThis.carApiKey);
    })()
  }, [])

  if(!globalThis.carApiKey) return <>loading</>

  return (
    <html className="light text-foreground bg-background" lang="en">
      <body className={font.className}>
        <UIProvider>
          <div className="flex flex-col justify-between min-h-screen">
            <Header />
            <main className="container mx-auto flex-1 py-16">
              {children}
            </main>
            <Footer />
          </div>
        </UIProvider>
      </body>
    </html>
  );
}

export const revalidate = 0;
