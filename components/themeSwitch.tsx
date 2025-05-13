'use client'

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState<boolean>(false);
    const {setTheme, resolvedTheme} = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div/>

    if (resolvedTheme === 'dark'){
        return <FiSun 
            className="cursor-pointer" 
            size={30}
            onClick={() => setTheme('light')}
        />
    }

    return <FiMoon  
            className="cursor-pointer" 
            size={30}
            onClick={() => setTheme('dark')}
            />
}