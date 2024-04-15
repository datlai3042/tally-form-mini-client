import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactQueryProvider from "./(NextClient)/_components/provider/ReactQueryProvider";
import ReduxProvider from "./_lib/redux/ReduxProvider";
import AppProvider from "./(NextClient)/_components/AppProvider";
import { cookies } from "next/headers";
import CheckPathName from "./(NextClient)/_components/CheckPathName";
import ButtonNavigation from "./(NextClient)/_components/ui/button/ButtonNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

type TProps = {
	children: React.ReactNode;
};

export default function RootLayout(props: TProps) {
	const cookieStore = cookies();
	const _id = cookieStore.get("_id")?.value || "";
	const access_token = cookieStore.get("access_token")?.value || "";
	const refresh_token = cookieStore.get("refresh_token")?.value || "";
	console.log({ RootLayout: "root layout" });
	console.log({ access_token });
	console.log("");

	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className={inter.className}>
				<ReduxProvider>
					<ReactQueryProvider>
						<AppProvider id={_id} access_token={access_token} refresh_token={refresh_token}>
							{props.children}

							<CheckPathName access_token={access_token} />
							<ButtonNavigation Url="/see-token" />
						</AppProvider>
					</ReactQueryProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
