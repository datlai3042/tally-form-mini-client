import React, { SetStateAction, useEffect, useState } from "react";
import ClickOutSide from "../../Model/ClickOutSide";

type TProps = {
      month: number;
      year: number;

      cb?: (value: number, type: "month" | "year") => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ButtonSelectTime = (props: TProps) => {
      const { year, cb, month, ...buttonProps } = props;

      const [openDateModel, setOpenDateModel] = useState<boolean>(false);
      const [openYearModel, setOpenYearModel] = useState<boolean>(false);

      const date = new Date();
      const yearCurrent = date.getFullYear();

      const genderYearArray = () => {
            let newArray = [];
            for (let year = yearCurrent; year >= 2000; year--) {
                  newArray.push(year);
            }
            return newArray;
      };

      return (
            <div className=" flex xl:justify-end gap-[1rem] text-[1.2rem] xl:text-[1.4rem]">
                  <div className="w-[7rem]">
                        <button
                              onClick={(e) => {
                                    setOpenDateModel((prev) => !prev);
                              }}
                              className={` bg-[#fff] text-[#000] border-text-theme border-[.1rem] h-[2.4rem] min-w-[6rem] xl:min-w-[7rem] rounded-md relative flex items-center justify-center ${buttonProps.className}`}
                        >
                              <p>Tháng {month}</p>
                              {openDateModel && (
                                    <ClickOutSide setOpenModel={setOpenDateModel}>
                                          <button className="absolute z-[2] min-w-[9rem]  max-h-[30rem] overflow-auto scroll-color-main bottom-[-1rem] translate-y-[100%] bg-[#fff] border-[.1rem] border-text-theme left-[0] right-0 min-h-[4rem] h-max flex flex-col items-center text-[#000] rounded-lg text-[1.2rem]">
                                                {months.map((monthItem) => (
                                                      <span
                                                            onClick={(e) => {
                                                                  e.cancelable = true;
                                                                  if (cb) {
                                                                        cb(monthItem, "month");
                                                                        setOpenDateModel(false);
                                                                  }
                                                            }}
                                                            key={monthItem}
                                                            className={`${
                                                                  monthItem === month ? "bg-color-main text-[#fff]" : "hover:bg-color-main hover:text-[#fff]"
                                                            } hover:cursor-pointer p-[1rem]  w-full h-full flex items-center justify-center`}
                                                      >
                                                            Tháng {monthItem}
                                                      </span>
                                                ))}
                                          </button>
                                    </ClickOutSide>
                              )}
                        </button>
                  </div>
                  <div className="w-[8rem]">
                        <ClickOutSide setOpenModel={setOpenYearModel}>
                              <button
                                    className={` bg-[#fff] text-[#000] border-text-theme border-[.1rem] h-[2.4rem] min-w-[8rem] rounded-md relative flex items-center justify-center ${buttonProps.className}`}
                                    onClick={(e) => {
                                          setOpenYearModel((prev) => !prev);
                                    }}
                              >
                                    <>
                                          <p>Năm {year}</p>
                                          {openYearModel && (
                                                <div className="absolute z-[2] max-h-[30rem] overflow-auto scroll-color-main bottom-[-1rem] translate-y-[100%] bg-[#fff] left-[0] right-0 min-h-[4rem] h-max flex flex-col items-center  text-[#000] border-[.1rem] border-text-theme  rounded-lg text-[1rem]">
                                                      {genderYearArray().map((yearItem) => (
                                                            <p
                                                                  key={yearItem}
                                                                  onClick={(e) => {
                                                                        e.cancelable = true;

                                                                        if (cb) {
                                                                              cb(yearItem, "year");
                                                                              setOpenYearModel(false);
                                                                        }
                                                                  }}
                                                                  className={`${
                                                                        yearItem === year
                                                                              ? "bg-color-main text-[#fff]"
                                                                              : "hover:bg-color-main hover:text-[#fff]"
                                                                  } p-[1.6rem] hover:cursor-pointer w-full h-full flex items-center justify-center`}
                                                            >
                                                                  {yearItem}
                                                            </p>
                                                      ))}
                                                </div>
                                          )}
                                    </>
                              </button>
                        </ClickOutSide>
                  </div>
            </div>
      );
};

export default ButtonSelectTime;
