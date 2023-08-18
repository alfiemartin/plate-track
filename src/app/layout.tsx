import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Footer from "../components/footer";
import Header from "../components/header";
import { UIProvider } from "../components/nextui";
import { carApiKey } from "../lib/carApiKey";
import logger, { Logger } from 'pino';

const font = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Plate track",
  description: "Get help, help others",
};

declare global {
  var logger: Logger | undefined;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  carApiKey();
  globalThis.logger = globalThis.logger ?? logger();

  return (
    <html className="light text-foreground bg-background" lang="en">
      <body className={font.className}>
        <UIProvider>
          <div className="flex flex-col justify-between min-h-screen">
            <Header />
            <main className="container mx-auto py-8 px-2 sm:px-0">
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
