import "./globals.css";
import NavBar from "@/components/NavBar";
import Background from "@/components/Background";
import { DarkModeProvider } from "./context/DarkModeContext";
import DarkModeToggle from "@/components/DarkModeToggle";

export const metadata = {
  title: "FoLo - Found, lost and co.",
  description: "Found something lost? or just lost something? FoLo is here to help!",
};

export default function RootLayout({ children }) {

  return (
    
      <html lang="en"><DarkModeProvider>
        <body>
          <NavBar/>
          <Background/>
          <DarkModeToggle/>
          <section className="lg:pt-5 pt-10"></section>
          {children}
        </body></DarkModeProvider>
    </html>
    
  );
}
