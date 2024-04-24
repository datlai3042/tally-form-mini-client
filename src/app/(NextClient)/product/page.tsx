"use client";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/_services/user.service";
import { useDispatch } from "react-redux";
import { onFetchUser } from "@/app/_lib/redux/features/authentication.slice";
import { set } from "zod";
import Http from "@/app/_lib/http";

const DashBoardPage = () => {
	const styleEffect = {
		onCheckSidebar: (check: boolean) => {
			if (check)
				return "w-full sm:w-[65%] xl:w-[83.5%] left-0 sm:left-[35%] xl:left-[16.5%] right-0 duration-[300ms]";
			return "w-full inset-0 duration-[600ms]";
		},
	};

	return <div className="relative max-w-screen w-full min-h-screen h-max flex  "></div>;
};

export default DashBoardPage;
