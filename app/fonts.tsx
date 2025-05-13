import { Roboto, Geist, Geist_Mono } from "next/font/google";


export const roboto = Roboto({
    weight: ["400", "700"],
    subsets: ["latin"],
    preload: false, 
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

