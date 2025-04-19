import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./redux/provider";

export const metadata = {
  title: "Login - Dhwani Astro",
  description: "Securely log in to your Dhwani Astro account.",
  openGraph: {
    title: "Login - Dhwani Astro",
    description: "Securely log in to your Dhwani Astro account.",
    url: "https://dashboard-panale-55f259im3-nikhildh08s-projects.vercel.app/", 
    siteName: "Dhwani Astro",
    images: [
      {
        url: "https://shop.dhwaniastro.com/cdn/shop/files/logo.png?height=628&pad_color=ffffff&v=1704542290&width=1200", // Upload an image to your site
        width: 1200,
        height: 630,
        alt: "Dhwani Astro Login Page",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login - Dhwani Astro",
    description: "Securely log in to your Dhwani Astro account.",
    images: ["https://shop.dhwaniastro.com/cdn/shop/files/logo.png?height=628&pad_color=ffffff&v=1704542290&width=1200"], // Same as OG image
  },
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        {children}
        </Providers>
      
      </body>
    </html>
  );
}
