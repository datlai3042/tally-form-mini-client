import { FormCore, InputCore } from "@/type";
import { useDispatch } from "react-redux";
import { onFetchForm } from "../_lib/redux/features/formEdit.slice";

const useAddOptionClient = (form: FormCore.Form, inputItem: InputCore.InputForm) => {
	const dispatch = useDispatch();

	return () => {
		const newForm = structuredClone(form);
		newForm.form_inputs = newForm.form_inputs.map((ip) => {
			if (ip._id === inputItem._id) {
				ip.type = "OPTION";
				if (ip.type === "OPTION") {
					ip.core.options.push({ option_id: "", option_value: "" });
					return ip;
				}
			}

			return ip;
		});

		dispatch(onFetchForm({ form: newForm }));
	};
};

export default useAddOptionClient;
