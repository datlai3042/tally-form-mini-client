import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { onFetchNotification } from "@/app/_lib/redux/features/notification.slice";
import FormService from "@/app/_services/form.service";
import { useQuery } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { Form } from "react-hook-form";
import { useDispatch } from "react-redux";

const useInfoFormNotification = ({
	form_id,
	active,
	notification_id,
}: {
	form_id: string;
	active: boolean;
	notification_id: string;
}) => {
	const infoFormNotification = useQuery({
		queryKey: ["info-form-notification", form_id],
		queryFn: () => FormService.getInfoFormNotification({ form_id, notification_id }),
		enabled: active,
	});

	return infoFormNotification;
};

export default useInfoFormNotification;
