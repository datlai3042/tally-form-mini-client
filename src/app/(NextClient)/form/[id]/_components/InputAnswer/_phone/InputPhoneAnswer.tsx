"use client";
import { FormCore, InputCore } from "@/type";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import InputAnswerWrapper from "../InputAnswerWrapper";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import { superTextValidate } from "../_validate/inputText.validate";
import InputErrorMessage from "../InputError/InputErrorMessage";
import {
      deleteErrorGlobal,
      deleteErrorWhenFocus,
      renderControllerInputAnswer,
      renderErrorInput,
      setDataInputGlobal,
      setErrorGlobal,
      setInputRequireGlobal,
      validateWhenFocus,
} from "../_utils/formAnswer.uti";
import MinMaxInput from "../../MinMaxInput";
import { superPhoneValidate } from "../_validate/inputPhone.validate";
import { AtSign, Phone } from "lucide-react";
import RenderStyleInputAnswer from "../constant/RenderStyleInputAnswer";
import InputAnswerTitle from "../../InputAnswerTitle";
import BoxHandlerInputAnswerError from "../../BoxHandlerInputAnswerError";
import BoxHandlerInputAnswerErrorMsg from "../../BoxHandlerInputAnswerErrorMsg";

type TProps = {
      inputItem: InputCore.InputPhone.InputTypePhone;
      formCore: FormCore.Form;
};

const InputPhoneAnswer = (props: TProps) => {
      const { inputItem, formCore } = props;

      const {
            formAnswer: { inputFormErrors, inputFormData, submitState },
            setFormAnswer,
      } = useContext(FormAnswerContext);

      const [write, setWrite] = useState<boolean>(false);

      const inputItemInArrayGlobal = useMemo(() => {
            return renderControllerInputAnswer<FormCore.FormAnswer.Data.Phone>({ inputFormErrors, inputItem, inputFormData });
      }, [inputItem, inputFormErrors, inputFormData]);

      const [phone, setPhone] = useState<string>(inputItemInArrayGlobal.input?.value || "");

      const onFocus = () => {
            setWrite(true);
            deleteErrorWhenFocus({ setFormAnswer, inputFormErrors, inputItem });
      };

      const onBlur = () => {
            if (write) {
                  validateWhenFocus<InputCore.InputPhone.InputSettingPhone>({
                        inputItem,
                        inputValue: phone,
                        setFormAnswer,
                        validateCallback: superPhoneValidate,
                  });
            }
      };

      return (
            <InputAnswerWrapper>
                  <BoxHandlerInputAnswerError inputItemInArrayGlobal={inputItemInArrayGlobal} input_id={inputItem._id!} write={write}>
                        <InputAnswerTitle inputItem={inputItem} formCore={formCore} />
                        <DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
                              <input
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    value={phone ? +phone : ""}
                                    type="number"
                                    className={` ${RenderStyleInputAnswer.StyleTitle({
                                          formCore,
                                          inputItem,
                                    })} w-[90%] h-full pb-[2rem] border-b-[.1rem] border-gray-300  outline-none text-[1.7rem] placeholder:text-[1.3rem]`}
                                    placeholder="Nhập số điện thoại của bạn"
                                    onChange={(e) => setPhone(e.target.value)}
                              />
                              <DivNative className="absolute z-[2] right-[1rem]" title={""}>
                                    <Phone className=" text-textMain opacity-50" size={18} />
                              </DivNative>
                        </DivNative>

                        {inputItemInArrayGlobal?.globalError?.state && (
                              <BoxHandlerInputAnswerErrorMsg inputItem={inputItem} inputItemInArrayGlobal={inputItemInArrayGlobal} />
                        )}
                  </BoxHandlerInputAnswerError>
            </InputAnswerWrapper>
      );
};

export default InputPhoneAnswer;
