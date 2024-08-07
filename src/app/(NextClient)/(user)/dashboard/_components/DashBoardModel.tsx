"use client";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { onFocusSearch } from "@/app/_lib/redux/formEdit.slice";
import { Home, Search, Settings } from "lucide-react";
import Link from "next/link";
import React, { SetStateAction } from "react";
import { useDispatch } from "react-redux";

const WorkItem = [
      { Title: "Trang chủ", Icon: <Home className="w-[1.8rem]" />, Href: "/" },
      { Title: "Tìm kiếm", Icon: <Search className="w-[1.8rem]" />, Model: "search" },
      { Title: "Cài đặt", Icon: <Settings className="w-[1.8rem]" />, Href: "/settings" },
];

type TProps = {
      setOpenModel: React.Dispatch<SetStateAction<boolean>>;
};

const DashBoardModel = (props: TProps) => {
      const { setOpenModel } = props;
      const dispatch = useDispatch();
      const setopenModelSearch = () => {
            dispatch(onFocusSearch({ focus: true }));
      };

      return (
            <ClickOutSide setOpenModel={setOpenModel}>
                  <div className=" absolute z-[3] right-0 w-[20rem] min-h-[10rem] py-[1rem] h-max bg-[#ffffff] rounded-lg border-[.1rem] border-gray-200 shadow-lg flex flex-col gap-[.5rem] text-[1.4rem] text-[#000]">
                        {WorkItem.map((work) => {
                              if (work.Href)
                                    return (
                                          <Link
                                                key={work.Title}
                                                href={work.Href}
                                                className="p-[.2rem_.8rem] flex items-center gap-[1.6rem] hover:bg-slate-200 rounded-md"
                                          >
                                                <span className="min-w-[2.2rem]">{work.Icon}</span>
                                                <span className="font-medium">{work.Title}</span>
                                          </Link>
                                    );

                              if (work.Model === "search")
                                    return (
                                          <button
                                                key={work.Title}
                                                className="p-[.2rem_.8rem] flex items-center gap-[1.6rem] hover:bg-slate-200 rounded-md"
                                                onClick={() => setopenModelSearch()}
                                          >
                                                <span className="min-w-[2.2rem]">{work.Icon}</span>

                                                <span className="font-medium text-slate-600">{work.Title}</span>
                                          </button>
                                    );
                        })}
                  </div>
            </ClickOutSide>
      );
};

export default DashBoardModel;
