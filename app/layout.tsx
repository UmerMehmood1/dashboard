import { AppProps } from "next/app";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
type LayoutProps = { children?: React.ReactNode };
function MyApp({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4">{children}</main>
          <Toaster richColors position="top-right" />
        </div>
      </body>
    </html>
  );
}

export default MyApp;
