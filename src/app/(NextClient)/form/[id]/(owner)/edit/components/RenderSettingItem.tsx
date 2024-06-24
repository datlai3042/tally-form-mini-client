import { RootState } from "@/app/_lib/redux/store";
import { FormCore, InputCore } from "@/type";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

type TProps = {
	inputItem: InputCore.InputForm;
};

const generateLabelSetting = (settngName: keyof InputCore.Setting.SettingAll) => {
	let label;
	if (settngName === "input_color") return (label = "Màu sắc của chữ");
	if (settngName === "input_error") return (label = "Lỗi tùy chọn");
	if (settngName === "input_size") return (label = "Cỡ chữ");
	if (settngName === "input_style") return (label = "Kiểu chữ");
	if (settngName === "require") return (label = "Bắt buộc");
	if (settngName === "maxLength") return (label = "Độ dài tối đa");
	if (settngName === "minLength") return (label = "Độ dài tối thiểu");
	if (settngName === "placeholder") return (label = "Placeholder của input");
};

const RenderSettingItem = (props: TProps) => {
	const { inputItem } = props;

	return (
		<div className="h-full">
			{inputItem.type === "TEXT" && (
				<div className="flex flex-col justify-center h-full px-[4rem] py-[1.8rem] gap-[1rem] xl:text-[1.3rem]">
					{Object.keys(inputItem.core.setting).map((setting) => (
						<div key={uuidv4()}>
							{generateLabelSetting(setting as keyof InputCore.Setting.SettingAll)}:
							{inputItem.core.setting[setting as keyof InputCore.Setting.InputSettingCommon]}
						</div>
					))}
				</div>
			)}

			{inputItem.type === "EMAIL" && (
				<div className="flex flex-col justify-center h-full pl-[4rem] py-[1rem] gap-[1rem] text-[1.3rem]">
					{Object.keys(inputItem.core.setting).map((setting) => (
						<div key={uuidv4()}>
							{generateLabelSetting(setting as keyof InputCore.Setting.SettingAll)}:
							{setting !== "require"
								? inputItem.core.setting[setting as keyof InputCore.Setting.InputSettingCommon] ||
								  "Không bắt buộc"
								: "Bắt buộc nhập"}
						</div>
					))}
				</div>
			)}
			{inputItem.type === "DATE" && (
				<div className="flex flex-col justify-center h-full pl-[4rem] py-[1rem] gap-[1rem] text-[1.3rem]">
					{Object.keys(inputItem.core.setting).map((setting) => (
						<div key={uuidv4()}>
							{generateLabelSetting(setting as keyof InputCore.Setting.SettingAll)}:
							{setting !== "require"
								? inputItem.core.setting[setting as keyof InputCore.Setting.InputSettingCommon] ||
								  "Không bắt buộc"
								: "Bắt buộc nhập"}
						</div>
					))}
				</div>
			)}
			{inputItem.type === "OPTION" && (
				<div className="flex flex-col justify-center h-full pl-[4rem] py-[1rem] gap-[1rem] text-[1.3rem]">
					{Object.keys(inputItem.core.setting).map((setting) => (
						<div key={uuidv4()}>
							{generateLabelSetting(setting as keyof InputCore.Setting.SettingAll)}:
							{setting !== "require"
								? inputItem.core.setting[setting as keyof InputCore.Setting.InputSettingCommon] ||
								  "Không bắt buộc"
								: "Bắt buộc nhập"}
						</div>
					))}
				</div>
			)}
			{inputItem.type === "OPTION_MULTIPLE" && (
				<div className="flex flex-col justify-center h-full pl-[4rem] py-[1rem] gap-[1rem] text-[1.3rem]">
					{Object.keys(inputItem.core.setting).map((setting) => (
						<div key={uuidv4()}>
							{generateLabelSetting(setting as keyof InputCore.Setting.SettingAll)}:
							{setting !== "require"
								? inputItem.core.setting[setting as keyof InputCore.Setting.InputSettingCommon] ||
								  "Không bắt buộc"
								: "Bắt buộc nhập"}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default RenderSettingItem;
