// import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
// import { RootState } from "@/app/_lib/redux/store";
// import FormService from "@/app/_services/form.service";
// import { FormCore } from "@/type";
// import { useMutation } from "@tanstack/react-query";
// import { useDispatch, useSelector } from "react-redux";

// type TProps = {};

// const useAddInput = () => {
// 	const dispatch = useDispatch();

// 	const updateFormMutation = useMutation({
// 		mutationKey: ["add-input-form"],
// 		mutationFn: (form: FormCore.Form) => FormService.(form),
// 		onSuccess: (res) => {
// 			const { form } = res.metadata;
// 			dispatch(onFetchForm({ form }));
// 		},
// 	});

// 	return updateFormMutation;
// };

// export default useAddInput;
