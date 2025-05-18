import PageHeader from "@/components/app-header"
import { Metadata } from "next";
import { ReactNode } from "react"


export const metadata: Metadata = {
  title: "Dashboard"   
};

type LayoutProps = {
    children: ReactNode
};

export default function Layout({ children } : LayoutProps) {
    return (
        <>
          <PageHeader className="my-8"/>
          <main>
            {children}
          </main>
          <footer className="mt-auto text-center pb-8">
            Footer
          </footer>
        </>
    );
}