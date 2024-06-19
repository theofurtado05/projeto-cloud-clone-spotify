import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster";
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TheoFy",
  description: "O melhor streaming de músicas do Brasil varonil!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        

            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
          {/* <!-- Meta Pixel Code --> */}
          
         
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        {children}
        <Toaster/>
        <style>
          {`
            html {
              scroll-behavior: smooth !important;
            }
          `}
        </style>
        
      </body>
      <footer>
        <Script strategy="afterInteractive">
        {`
          function work() {
              function getParams() {
                  const url = new URL(window.location.href);
                  const src = url.searchParams.get("src");
                  const sck = url.searchParams.get("sck");
                  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
                      .map(param => \`\${param}=\${encodeURIComponent(url.searchParams.get(param) || '')}\`)
                      .join('&');
                  let allParams = '';
                  if (src) allParams += \`src=\${encodeURIComponent(src)}&\`;
                  if (sck) allParams += \`sck=\${encodeURIComponent(sck)}&\`;
                  allParams += utmParams;
                  return allParams;
              }
              (function updateLinks() {
                  document.querySelectorAll("a").forEach((link) => {
                      const params = getParams();
                      if (params) {
                          link.href += link.href.includes("?") ? \`&\${params}\` : \`?\${params}\`;
                      }
                  });
              })();
          }
          if (document.readyState === "complete") {
              work();
          } else {
              window.addEventListener("load", work);
          }
        `}
        </Script>
      </footer>
    </html>
  );
}
