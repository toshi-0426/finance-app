import React from "react"
import SideNavigation from "./components/side-nav";

export const metadata = {
    title: "Settings"
}

type LayoutProps= {
    children: React.ReactNode
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="grid grid-cols-4 gap-8">
            <aside>
                <SideNavigation />
            </aside>
            <div className="col-span-3">
                {children}
            </div>
        </div>
    )
}