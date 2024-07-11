import { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderComponent from "../components/Header";
import Providers from "../../queryClient/QueryClient";
import FooterComponent from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "My Pokemon Book",
//   description: "나만의 포켓몬 도감!",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <HeaderComponent />
        <Providers>{children}</Providers>
        <FooterComponent />
      </body>
    </html>
  );
}
