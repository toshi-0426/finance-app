import PageHeader from "@/components/app-header"
import { ReactNode } from "react"


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
          <footer>
            Footer
          </footer>
        </>
    );
}