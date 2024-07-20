import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Churnkey Technical Assessment",
  description: "By Chris Hong",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const churnkeyAppId = process.env.NEXT_PUBLIC_APP_ID;

  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          !function(){  
            if (!window.churnkey || !window.churnkey.created) {
              window.churnkey = { created: true };
              const a = document.createElement('script');
              a.src = 'https://assets.churnkey.co/js/app.js?appId=${churnkeyAppId}';
              a.async = true;
              const b = document.getElementsByTagName('script')[0];
              b.parentNode.insertBefore(a, b);
            }
          }();
        `}}></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
