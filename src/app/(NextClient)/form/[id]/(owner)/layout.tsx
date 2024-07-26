"use client";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import React, { useContext, useEffect, useState } from "react";
import HeaderEditForm from "./edit/components/HeaderEditForm";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import FormChangeMode from "./_components/FormChangeMode";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import LayoutSidebar from "@/app/(NextClient)/_components/Layout/LayoutSidebar";
import Link from "next/link";

export type FormPageMode = "edit" | "download" | "share" | "summary";

const FormModeLayout = ({ children, params }: { children: React.ReactNode; params: { id: string } }) => {
      const { modeScreen } = useContext(FormModeScreenContext);
      const segment = useSelectedLayoutSegments();
      const [formPageMode, setFormPageMode] = useState<FormPageMode>(segment[1] as FormPageMode);

      const dispatch = useDispatch();

      const getFormQuery = useQuery({
            queryKey: ["get-form", params.id],
            queryFn: () => FormService.getForm({ form_id: params.id }),
      });

      useEffect(() => {
            if (getFormQuery.isSuccess) {
                  const { form } = getFormQuery.data.metadata;
                  if (!!form) {
                        dispatch(onFetchForm({ form }));
                  }
            }
      }, [getFormQuery.isSuccess, params.id, getFormQuery.data, dispatch]);

      useEffect(() => {
            console.log({ "Chế độ": segment, getFormQuery });
      }, []);

      return (
            <LayoutSidebar>
                  {getFormQuery.data?.metadata.form !== null && (
                        <DivNative className={`bg-color-gap-empty  min-h-screen  h-max  flex flex-col  text-[1.4rem]   max-w-full `}>
                              <DivNative className={` w-full min-h-screen rounded-lg h-max  `}>
                                    {segment[0] !== "edit" && getFormQuery.data?.metadata.form && (
                                          <div className=" h-screen flex flex-col gap-[2rem] ">
                                                <HeaderEditForm showHeaderAction={segment[1] === "edit"} />

                                                <div className="min-h-[calc(100vh-8rem)]  layout-down ">
                                                      <div className="h-full pb-[2rem]">
                                                            <div className="h-full  bg-color-section-theme  ">
                                                                  <FormChangeMode formPageMode={formPageMode} setFormPageMode={setFormPageMode}>
                                                                        {children}
                                                                  </FormChangeMode>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    )}
                                    {segment[0] === "edit" && getFormQuery.data?.metadata.form && children}
                              </DivNative>
                        </DivNative>
                  )}
                  {getFormQuery.isSuccess && getFormQuery.data?.metadata.form === null && (
                        <div className="min-h-screen w-full flex items-center justify-center text-text-theme">
                              <div className="min-h-full  flex flex-col items-center    gap-[2rem]">
                                    <p className="text-[6rem] font-medium">Không tìm thấy Form</p>
                                    <Link
                                          href={"/dashboard"}
                                          className="min-w-[16rem] h-[4rem] p-[1rem_2rem] flex items-center justify-center text-[1.6rem] bg-blue-600 text-[#ffffff] rounded-lg"
                                    >
                                          Tạo form mới
                                    </Link>
                              </div>
                        </div>
                  )}
            </LayoutSidebar>
      );
};

export default FormModeLayout;
