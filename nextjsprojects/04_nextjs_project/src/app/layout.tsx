import "./globals.css";
import SessionProviderWrapper from "@/components/providers/SessionProvider";
import Navbar from "@/components/auth/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
