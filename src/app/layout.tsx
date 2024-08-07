import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./(NextClient)/_components/provider/ReactQueryProvider";
import ReduxProvider from "./_lib/redux/ReduxProvider";
import AppProvider from "./(NextClient)/_components/AppProvider";
import SidebarContextProvider from "./(NextClient)/(user)/dashboard/SidebarContext";
import ToastProvider from "./(NextClient)/_components/provider/ToastProvider";
import ThemeProvider from "./(NextClient)/_components/provider/ThemeProvider";
import Footer from "./(NextClient)/_components/Layout/Footer";

const inter = Inter({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
      title: {
            template: "%s - By Kuroform ",
            default: "Form builder by Kuroform",
      },
      description: "Create Form with Form build by Kuroform",
      icons: {
            icon: "/icon_core.png",
      },
};

type TProps = {
      children: React.ReactNode;
};

export default function RootLayout(props: TProps) {
      return (
            <html lang="vi" suppressHydrationWarning={true}>
                  <head></head>
                  <body className={`${inter.className}`}>
                        <ReduxProvider>
                              <ReactQueryProvider>
                                    <ThemeProvider>
                                          <SidebarContextProvider>
                                                <AppProvider>{props.children}</AppProvider>
                                                <ToastProvider />
                                          </SidebarContextProvider>
                                    </ThemeProvider>
                              </ReactQueryProvider>
                        </ReduxProvider>
                  </body>
            </html>
      );
}
