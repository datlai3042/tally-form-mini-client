import { Notification } from "@/type";
import React from "react";

type TProps = {
	notification_item: Notification.Account.NotificationAccount;
};

const NotificationAccountItem = (props: TProps) => {
	const { notification_item } = props;

	return <div>NotificationAccountItem</div>;
};

export default NotificationAccountItem;
