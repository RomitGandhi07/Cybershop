import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NotificationWrapper from "@/lib/notification/notification";
import ReduxProvider from "@/store/redux-provider";
import Navbar from "./navbar";
// import CheckLogin from "@/shared/components/check-login";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <NotificationWrapper />
          {/* <CheckLogin/> */}

          <span className="text-xs text-red-800 pt-0 bg-opacity-80 hidden">
          </span>
          {/* <div className="h-[20%]"> */}
          <Navbar></Navbar>
          {/* </div> */}
          {/* <div className="h-[80%]"> */}
          {children}
          {/* </div> */}
          {/* Runtime classes are not generated so, need to specify here */}
        </ReduxProvider>
      </body>
    </html>
  );
}
