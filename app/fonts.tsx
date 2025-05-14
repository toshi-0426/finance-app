import { Roboto, Inter } from "next/font/google";

export const inter = Inter({
    subsets: ["latin"]
})

export const roboto = Roboto({
    weight: ["400", "700"],
    subsets: ["latin"],
    preload: false, 
});
