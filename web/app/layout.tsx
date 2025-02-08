import { AuthContext } from "@/components/auth-context/auth-context";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContext>
      <html lang="en" className="h-full">
        <body
          className="flex flex-col h-full 
bg-gradient-to-l from-[#e4e4e4] via-[#f5f5f5] to-[#faf6f6]
"
        >
          {children}
        </body>
      </html>
    </AuthContext>
  );
}
