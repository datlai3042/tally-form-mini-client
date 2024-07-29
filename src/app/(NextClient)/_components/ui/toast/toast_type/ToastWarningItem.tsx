import { Toast } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import ToastWrapper from "../ToastWrapper";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { removeOneToast } from "@/app/_lib/redux/toast.slice";
import { X } from "lucide-react";

type TProps = {
      toast_item: Toast.ToastWarning.ToastWarningCore;
      index: number;
};

const ToastWarningItem = (props: TProps) => {
      const { toast_item, index } = props;
      const toast_timer = useSelector((state: RootState) => state.toast.toast_timer);
      const dispatch = useDispatch();

      const [count, setCount] = useState<number>(toast_timer);

      const timer = useRef<NodeJS.Timeout | null>(null);

      useEffect(() => {
            timer.current = setInterval(() => {
                  setCount((prev) => {
                        return (prev -= 1);
                  });
            }, 1000);

            return () => {
                  clearInterval(timer.current as NodeJS.Timeout);
            };
      }, []);

      const onDeleteToast = () => {
            dispatch(removeOneToast({ toast_item_id: toast_item._id }));
      };

      return (
            <ToastWrapper toast_item_id={toast_item._id} indexItem={index}>
                  <div className="relative min-h-[8rem] h-max  p-[1rem] flex gap-[1rem] justify-between rounded-xl  bg-bg-input-theme  text-toast-warning text-[1.4rem]">
                        <button
                              onClick={onDeleteToast}
                              className="absolute right-[2rem] top-[1rem] w-[2.4rem] h-[2.4rem]  rounded-full  flex items-center justify-center hover:bg-[#f1f4fb]"
                        >
                              <X size={14} style={{ color: "var(--toast-warning)" }} />
                        </button>

                        <div className="flex  items-center min-w-[6rem]">
                              <Image
                                    src={"/assets/images/icon/toast/toast_warning.png"}
                                    width={50}
                                    height={50}
                                    alt="toast success"
                                    className="w-[4rem] h-[4rem]"
                              />
                        </div>
                        <div className="flex-1 flex justify-center flex-col min-w-[70%] max-w-[90%] gap-[.4rem]">
                              <span className=" font-semibold max-w-[80%] break-words text-[1.6rem] ">{toast_item.toast_title}</span>
                              <span className="text-[#000] opacity-80  font-medium max-w-[80%] break-words text-[1.3rem]">{toast_item.core.message}</span>
                        </div>

                        <div className="bg-toast-warning text-[#fff] w-[2rem] h-[2rem] text-[1rem] rounded-full flex items-center justify-center absolute bottom-[1rem] right-[2rem]">
                              {count}
                        </div>
                  </div>
            </ToastWrapper>
      );
};

export default ToastWarningItem;
