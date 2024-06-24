import { onFetchNotification } from "@/app/_lib/redux/features/notification.slice";
import { RootState } from "@/app/_lib/redux/store";
import NotificationService from "@/app/_services/notification.service";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllNotification = () => {
	const getAllNotification = useQuery({
		queryKey: ["get-all-notification"],
		queryFn: () => NotificationService.getAllNotification(),
		staleTime: 0,
	});

	return getAllNotification;
};

export default useGetAllNotification;
