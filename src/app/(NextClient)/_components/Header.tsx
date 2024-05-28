import Image from "next/image";
import React from "react";
import ButtonNavigation from "./ui/button/ButtonNavigation";
import ButtonCreateForm from "./ui/button/ButtonCreateForm";
import { cookies } from "next/headers";
import Link from "next/link";

const Header = () => {
	const cookieStore = cookies();

	const client_id = cookieStore.get("next_client_id")?.value;
	const access_token = cookieStore.get("next_access_token")?.value;
	const refresh_token = cookieStore.get("next_refresh_token")?.value;

	const authentication = !!client_id && !!access_token && !!refresh_token;

	return (
		<header className="p-[10px] xl:p-[20px] flex justify-between items-center ">
			<Image
				src={"/assets/images/icon/logo_v2.png"}
				width={70}
				height={28}
				alt="logo"
				className="w-[70px] h-[28px]"
			/>
			<div className="flex gap-[20px]">
				{!authentication && (
					<>
						<ButtonNavigation urlNavigation="/login" textContent="Đăng nhập" />
						<ButtonNavigation urlNavigation="/register" textContent="Đăng kí" />
					</>
				)}
				{authentication && (
					<ButtonNavigation urlNavigation="/logout" textContent="Đăng xuất" className="hidden xl:flex" />
				)}{" "}
				{/* <Link
					href={"/login"}
					// urlNavigation="create-form"
					// textContent="Tạo một form miễn phí"
					className="!mt-[10px] !xl:mt-[50px] p-[6px_12px] flex  justify-center items-center gap-[.8rem] text-[1.8rem] text-[#ffffff] bg-[rgb(0_112_215)] opacity-[.95] hover:opacity-100 transition-colors duration-200 rounded-[.6rem]"
				>
					Tạo form miễn phí
				</Link> */}
				{/* <ButtonCreateForm
					urlNavigation="/dashboard"
					textContent="Tạo Form"
					className="[&]:hidden [&]:xl:flex"
				/> */}
			</div>
		</header>
	);
};

export default Header;
