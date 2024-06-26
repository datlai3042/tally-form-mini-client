import { Notification } from "@/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
	notification: Notification.NotificationUser["notifications"];
	animation: boolean;
	new_notification: string[];
};

const initialState: InitialState = {
	notification: [],
	animation: false,
	new_notification: [],
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		onFetchNotification: (
			state,
			data: PayloadAction<{ notification: Notification.NotificationUser["notifications"]; animation?: boolean }>
		) => {
			const { notification, animation = false } = data.payload;
			state.notification = notification;
			state.animation = animation;
		},

		onDisableAnimation: (state, data: PayloadAction<{ animation: boolean }>) => {
			const { animation = false } = data.payload;
			state.animation = animation;
		},

		onAddNewNotification: (state, data: PayloadAction<{ notification_item_id: string }>) => {
			const { notification_item_id } = data.payload;
			state.new_notification = [...state.new_notification, notification_item_id];
		},

		onRemoveNewNotification: (state, data: PayloadAction<{ notification_item_id: string }>) => {
			const { notification_item_id } = data.payload;
			state.new_notification = state.new_notification.filter((notification) => {
				if (notification !== notification_item_id) return notification;
				return null;
			});
		},
	},
});

export const { onFetchNotification, onRemoveNewNotification, onAddNewNotification, onDisableAnimation } =
	notificationSlice.actions;
export default notificationSlice.reducer;
