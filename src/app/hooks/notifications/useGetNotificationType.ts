import { NotificationMode } from "@/app/(NextClient)/(user)/notification/_components/NotificationMode";
import NotificationService from "@/app/_services/notification.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { SetStateAction } from "react";

const useGetNotificationType = (type: NotificationMode) => {
	const LIMIT = 5;

	const getNotificationType = useInfiniteQuery({
		queryKey: ["get-notification-type", type],
		queryFn: ({ pageParam = 1 }) =>
			NotificationService.getNotificationType({ type, page: pageParam, limit: LIMIT }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			// cb((prev) => (lastPage.metadata.notification_user.notifications.length > 0 ? allPages.length + 1 : prev));
			return lastPage.metadata.notification_user.notifications.length > 0 ? lastPageParam + 1 : undefined;
		},
	});

	return getNotificationType;
};

export default useGetNotificationType;
