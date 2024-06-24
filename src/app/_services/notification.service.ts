import { Notification } from "@/type";
import Http from "../_lib/http";
import { ResponseApi } from "../_schema/api/response.shema";
import { NotificationMode } from "../(NextClient)/(user)/notification/_components/NotificationMode";

class NotificationService {
	static async getAllNotification() {
		console.log("run dispatch");
		return Http.get<ResponseApi<{ notification_user: Notification.NotificationUser }>>(
			"/v1/api/notification/get-all-notification",
			{ cache: "no-store" }
		);
	}

	static async getNotificationType({ type, page, limit }: { type: NotificationMode; page: number; limit: number }) {
		console.log("run dispatch", page);
		return Http.get<ResponseApi<{ notification_user: Notification.NotificationUser }>>(
			`/v1/api/notification/get-notification-type?type=${type}&page=${page}&limit=${limit}`,
			{ cache: "no-store" }
		);
	}

	static async deleteNotificationItem({ notification_id }: { notification_id: string }) {
		return Http.delete<ResponseApi<{ notification_user: Notification.NotificationUser }>>(
			`/v1/api/notification/delete-notification-item?notification_id=${notification_id}`
		);
	}
}

export default NotificationService;
