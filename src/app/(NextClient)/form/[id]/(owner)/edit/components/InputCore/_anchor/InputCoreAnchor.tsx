import { FormCore, InputCore as TInputCore } from "@/type";
import React, { useMemo, useState } from "react";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import InputCore from "../InputCore";
import superAnchorValidate from "@/app/(NextClient)/form/[id]/_components/InputAnswer/_validate/inputAnchor.validate";
import InputValidateSuccess from "@/app/(NextClient)/form/[id]/_components/_common/InputValidateSuccess";
import InputValidateError from "@/app/(NextClient)/form/[id]/_components/_common/InputValidateError";

type TProps = {
      inputItem: TInputCore.InputAnchor.InputTypeAnchor;
};

const InputCoreAnchor = (props: TProps) => {
      const { inputItem } = props;
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const form_mode_display = formCore.form_mode_display === "custom";

      const [controlerInput, setControllerInput] = useState<TInputCore.Commom.ControlerInput<{ href: string }>>({
            value: {
                  href: "",
            },
            error: {
                  message: "",
            },
            validate: false,
      });

      const onValidate = () => {
            const { _next, message, type } = superAnchorValidate({ inputValue: controlerInput.value.href, inputSetting: inputItem.core.setting });
            if (_next) {
                  setControllerInput((prev) => ({ ...prev, error: { message: "" }, validate: true }));
            } else {
                  setControllerInput((prev) => ({ ...prev, error: { message }, validate: false }));
            }
      };

      const onChangeValue = (valueInput: string) => {
            setControllerInput((prev) => ({ ...prev, value: { href: valueInput } }));
      };

      const InputPhone = (
            <DivNative className="flex flex-col gap-[1rem] text-text-theme ">
                  <SpanNative
                        textContent="Nhập liên kết của bạn"
                        className={`${form_mode_display ? "group-hover:!text-[#ffffff]" : "text-text-theme"} text-[1.6rem] font-semibold`}
                  />
                  <DivNative
                        className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] border-[.1rem] bg-[#fff] border-gray-400 focus:border-transparent  rounded-lg`}
                  >
                        <input
                              value={controlerInput.value.href}
                              onChange={(e) => onChangeValue(e.target.value)}
                              className="w-[80%] h-full p-[1rem] rounded-lg text-[1.6rem]     outline-none   text-[#000]"
                              placeholder="Nhập đường dẫn liên kết của bạn"
                        />
                        <div className="absolute z-[2] right-[1rem]  opacity-70">www</div>
                  </DivNative>
                  <div className="flex flex-col h-[8rem] gap-[1rem]   justify-center">
                        {controlerInput.validate && controlerInput.value.href && <InputValidateSuccess message={"Đường dẫn hợp lệ"} />}
                        <button
                              onClick={onValidate}
                              className=" w-[9rem] flex items-center justify-center p-[.8rem] xl:p-[1rem] bg-blue-600 rounded-lg text-[1.2rem] xl:text-[1.4rem] text-[#ffffff]"
                        >
                              Xác nhận
                        </button>
                        {controlerInput.error.message && <InputValidateError message={controlerInput.error.message} />}
                  </div>
            </DivNative>
      );

      return <InputCore InputComponent={InputPhone} inputItem={inputItem} inputTitle={inputItem.input_title || ""} dataTextTitle="Thêm tiêu đề cho liên kết" />;
};

export default InputCoreAnchor;
