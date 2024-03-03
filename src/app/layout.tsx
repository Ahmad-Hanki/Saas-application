import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import NavBar from "@/components/header/NavBar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const getData = async (userId: string) => {
  const data = prisma?.user.findUnique({
    where: { id: userId },
    select: {
      colorScheme:true
    }
  });
  return data;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {getUser} =  getKindeServerSession();
  const user = await getUser();
  const color = await getData(user?.id as string)
  return (
    <html lang="en">
      <body className={`${inter.className} ${color?.colorScheme}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
