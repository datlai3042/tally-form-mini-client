"use client";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/_services/user.service";
import { useDispatch } from "react-redux";
import { onFetchUser } from "@/app/_lib/redux/features/authentication.slice";
import { set } from "zod";
import Http from "@/app/_lib/http";

const DashBoardPage = () => {
	const dispatch = useDispatch();
	const [res, setRes] = useState<any>();
	const [loading, setLoading] = useState<boolean>(false);
	// const fetchMe = useQuery({
	// 	queryKey: ["/me"],
	// 	queryFn: () => UserService.me(),
	// });

	// useEffect(() => {
	// 	console.log({ user: fetchMe.data });
	// 	if (fetchMe.isSuccess) {
	// 		// const { user } = fetchMe.data.metadata;
	// 		// dispatch(onFetchUser({ user }));
	// 	}
	// }, [fetchMe.isSuccess, dispatch, fetchMe]);

	useEffect(() => {
		const fetchMe = async () => {
			try {
				setLoading(true);
				const res = await Http.get<any>("/get-all-product");
				setRes(res);
			} catch (error) {
				console.log({ error });
			} finally {
				setLoading(false);
			}
		};

		if (typeof window !== "undefined") {
			fetchMe();
		}
	}, []);

	useEffect(() => {
		console.log({ res, loading });
	}, [res, loading]);

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
