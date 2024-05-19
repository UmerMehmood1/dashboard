import { AppProps } from "next/app";
import "./globals.css";
import Sidebar from "./components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4">{}</main>
        </div>
      </body>
    </html>
  );
}

export default MyApp;
