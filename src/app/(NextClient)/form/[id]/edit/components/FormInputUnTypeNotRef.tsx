import React, { SetStateAction, forwardRef } from "react";
import FormInputUnType from "./InputCore/InputCoreText";

type TProps = {
	setArrayInput: React.Dispatch<SetStateAction<{ type: string; Component: React.ReactNode }[]>>;
};
type Ref = HTMLInputElement;

const FormInputUnTypeNotRef = (props: TProps) => {
	const { setArrayInput } = props;

	const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setArrayInput((prev) =>
				prev.concat({ type: "NoRef", Component: <FormInputUnTypeNotRef setArrayInput={setArrayInput} /> })
			);
		}
	};
	return (
		<div className="flex gap-[.5rem]">
			<input className="w-[50px] h-[50px] bg-blue-400" onKeyDown={onPressEnter} />
		</div>
	);
};

export default FormInputUnTypeNotRef;
