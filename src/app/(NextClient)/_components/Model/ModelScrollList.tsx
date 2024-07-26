import { extend } from "dayjs";
import React, { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import ClickOutSide from "./ClickOutSide";
import useGetAllProvinces from "@/app/hooks/common/address/useGetAllProvinces";

export type ScorllDataItem = {
      label: string;
      value: string;
      path_with_type: string;
      name_with_type: string;
};

type TProps = {
      dataRender: ScorllDataItem[];
      onChange?: (value: ScorllDataItem) => void;
      disable?: boolean;
      label: string;
      clear?: boolean;
      defaultValue?: ScorllDataItem;
};

const ModelScrollList = (props: TProps) => {
      const { dataRender, label, disable = false, clear = false, onChange, defaultValue } = props;
      const [openModel, setOpenModel] = useState<boolean>(false);
      const [itemSelect, setItemSelect] = useState<ScorllDataItem | undefined>(defaultValue || undefined);
      const ulListRef = useRef<HTMLUListElement | null>(null);
      const liItemSelect = useRef<HTMLLIElement | null>(null);

      useEffect(() => {
            if (ulListRef.current && liItemSelect.current && openModel) {
                  ulListRef.current.scrollTop = liItemSelect.current.offsetTop;
            }
      }, [openModel]);

      useEffect(() => {
            setItemSelect(defaultValue);
      }, [defaultValue]);

      useEffect(() => {
            setItemSelect(undefined);
      }, [dataRender]);

      useEffect(() => {
            if (clear) setItemSelect(undefined);
      }, [clear]);

      return (
            <button
                  disabled={disable}
                  onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenModel((prev) => !prev);
                  }}
                  className="relative min-w-[18rem] text-[1.4rem] border-[.1rem] border-[#ccc] w-max  max-h-[8rem] xl:h-[3rem] py-[.3rem] flex items-center justify-center gap-[1rem] rounded-lg disabled:cursor-not-allowed "
            >
                  <span>{itemSelect?.label || label}</span>
                  {openModel && (
                        <div className="absolute bottom-0  w-full z-[3] top-[4rem] right-[0rem] left-0">
                              <ClickOutSide setOpenModel={setOpenModel}>
                                    <ul
                                          ref={ulListRef}
                                          className="scroll-text-size text-[1.3rem]  w-full max-h-[16rem]  overflow-y-scroll bg-[#ffffff] text-[#000] border-[.1rem] border-gray-200 outline-none rounded-lg"
                                    >
                                          {dataRender.map((item, i) => {
                                                if (item.label === itemSelect?.label) {
                                                      return (
                                                            <li
                                                                  key={itemSelect.label + i}
                                                                  ref={liItemSelect}
                                                                  className="bg-blue-400 p-[1rem_2rem] hover:cursor-pointer flex items-center justify-center"
                                                            >
                                                                  {itemSelect.label}
                                                            </li>
                                                      );
                                                }
                                                return (
                                                      <li
                                                            onClick={() => {
                                                                  onChange && onChange(item);
                                                                  setItemSelect({ ...item });
                                                            }}
                                                            key={item?.label + i}
                                                            className="p-[1rem_2rem] hover:bg-blue-200 hover:cursor-pointer flex items-center justify-center"
                                                      >
                                                            {item.label}
                                                      </li>
                                                );
                                          })}
                                    </ul>
                              </ClickOutSide>
                        </div>
                  )}
            </button>
      );
};

export default ModelScrollList;
