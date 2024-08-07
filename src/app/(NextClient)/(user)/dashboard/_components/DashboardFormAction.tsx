"use client";
import BoxCopySuccess from "@/app/(NextClient)/form/[id]/(owner)/_components/BoxCopySuccess";
import { onFetchForm, onFetchFormState } from "@/app/_lib/redux/formEdit.slice";
import FormService from "@/app/_services/form.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Link as LinkIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

type TProps = {
      form_id: string;
};

const iconSize = 16;

const DashboardFormAction = (props: TProps) => {
      const { form_id } = props;
      const dispatch = useDispatch();
      const router = useRouter();
      const queryClient = useQueryClient();

      const deleteFormId = useMutation({
            mutationKey: ["delete-form", form_id],
            mutationFn: (formId: string) => FormService.deleteFormId({ form_id: formId }),
            onSuccess: (res) => {
                  queryClient.invalidateQueries({
                        queryKey: ["get-form-pagination"],
                  });

                  const { formDelete, formPrivate, formPublic } = res.metadata;
                  dispatch(onFetchFormState({ form_delete: formDelete, form_public: formPublic, form_private: formPrivate }));
                  queryClient.invalidateQueries({ queryKey: ["get-list-form-delete"] });

                  // router.refresh();
            },
      });

      const [copySuccess, setCopySuccess] = useState<boolean>(false);

      const timeoutRef = useRef<NodeJS.Timeout | null>(null);

      const styleEffect = {
            onFocus: (check: boolean) => {
                  if (!check) return " border-slate-200";
                  return " border-blue-400 outline-[4px] outline-blue-400";
            },
      };

      useEffect(() => {
            if (copySuccess) {
                  const time = 3000;
                  timeoutRef.current = setTimeout(
                        () => setCopySuccess(false),

                        time,
                  );
            }
            return () => {
                  clearTimeout(timeoutRef.current as NodeJS.Timeout);
            };
      }, [copySuccess]);

      const onDeleteForm = () => {
            deleteFormId.mutate(form_id);
      };

      return (
            <div className="flex  gap-[1rem]">
                  <button
                        className="flex items-center gap-[1rem] p-[.5rem_.7rem]  bg-color-main text-[#fff] rounded-lg"
                        onClick={(e) => {
                              e.preventDefault();
                              router.push(`/form/${form_id}/edit`);
                        }}
                  >
                        <Pencil size={iconSize} />
                        <span>Chỉnh sửa</span>
                  </button>

                  <div className="relative  ">
                        <button
                              onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    navigator.clipboard.writeText(`${window.location.origin}/form/${form_id}`).then(() => setCopySuccess(true));
                              }}
                              className="w-full h-full flex items-center gap-[1rem] p-[.5rem_.7rem] bg-color-main text-[#fff] rounded-lg"
                        >
                              <LinkIcon size={iconSize} />
                        </button>

                        {copySuccess && (
                              <div className="absolute bottom-[-2.5rem] left-[-10rem] xl:left-[-6rem] ">
                                    <BoxCopySuccess message="Copy link chia sẽ thành công" />
                              </div>
                        )}
                  </div>

                  <button
                        onClick={(e) => {
                              // e.stopPropagation();
                              e.preventDefault();

                              onDeleteForm();
                        }}
                        className="flex items-center gap-[1rem] p-[.5rem_.7rem] bg-color-main text-[#fff] rounded-lg"
                  >
                        <Trash2 size={iconSize} />
                  </button>
            </div>
      );
};

export default DashboardFormAction;
