'use client'

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { FiSun, FiMoon } from "react-icons/fi";
import Button from "./button";

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState<boolean>(false);
    const {setTheme, resolvedTheme} = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div/>

    if (resolvedTheme === 'dark'){
        return (
            <Button
                variant="ghost"
                size="base"
                onClick={() => setTheme('light')}
            >
                <FiSun 
                    className="w-5 h-5 cursor-pointer"
                />
            </Button>
        )
    }

    return (
        <Button
                variant="ghost"
                size="base"
                onClick={() => setTheme('dark')}
            >
                <FiMoon 
                    className="w-5 h-5 cursor-pointer"
                />
            </Button>
    )
}