import DashboardPage from "@/components/DashboardPage";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import Script from "next/script";

export const metadata = {
  title: "FoLo - Found, lost and co.",
  description: "Found something lost? or just lost something? FoLo is here to help!",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin=""/>
      </Head>
      <body>
        <NavBar/>
        <DashboardPage/>
        {children}
      </body>

    </html>
  );
}
