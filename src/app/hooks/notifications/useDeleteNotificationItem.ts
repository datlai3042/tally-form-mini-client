import { onFetchNotification } from "@/app/_lib/redux/features/notification.slice";
import NotificationService from "@/app/_services/notification.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useDeleteNotificationItem = () => {
	const deleteNotificationItem = useMutation({
		mutationKey: ["delete-notification-item"],
		mutationFn: ({ notification_id }: { notification_id: string }) =>
			NotificationService.deleteNotificationItem({ notification_id }),
	});

	useEffect(() => {
		if (deleteNotificationItem.isSuccess) {
		}
	}, [deleteNotificationItem.isSuccess]);

	return deleteNotificationItem;
};

export default useDeleteNotificationItem;
