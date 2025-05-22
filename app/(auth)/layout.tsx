import { sizes, variants } from "@/lib/variants";
import Link from "next/link";
import { ChevronLeft } from 'lucide-react';

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <main>
            <div className="absolute left-8 top-8">
                <Link href="/" className={`${variants['ghost']} ${sizes['base']} flex items-center space-x-2 text-sm`}>
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back</span>
                </Link>
            </div>

            <div className="mt-8">
                {children}
            </div>
        </main>
    )
}