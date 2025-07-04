import DashboardPage from "@/components/DashboardPage";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "FoLo - Found, lost and co.",
  description: "Found something lost? or just lost something? FoLo is here to help!",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body>
        <NavBar/>
        <DashboardPage/>
        {children}
      </body>

    </html>
  );
}
