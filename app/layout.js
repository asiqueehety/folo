import DashboardPage from "@/components/DashboardPage";
import "./globals.css";
import NavBar from "@/components/NavBar";
import MapPage from "@/components/Map";

export const metadata = {
  title: "FoLo - Found, lost and co.",
  description: "Found something lost? or just lost something? FoLo is here to help!",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body>
        <NavBar/>
        <section className="pt-20"></section>
        {children}
      </body>

    </html>
  );
}
