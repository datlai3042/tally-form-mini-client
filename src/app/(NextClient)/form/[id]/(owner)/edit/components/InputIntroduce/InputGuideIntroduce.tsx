import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { NotebookPen, Plus } from "lucide-react";
import { Span } from "next/dist/trace";
import React from "react";

const InputGuideIntroduce = () => {
	return (
		<DivNative className="w-full min-h-[40rem] px-[1rem] xl:px-0 flex flex-col justify-center xl:items-center gap-[1rem] text-[1.3rem] xl:text-[1.8rem] opacity-65">
			<SpanNative textContent="Ngay tại đây" />
			<DivNative className="flex flex-wrap items-center gap-[1rem] ">
				<SpanNative textContent="Bạn có thể thêm" />

				<DivNative className="w-[3.6rem] h-[3.6rem] hidden xl:flex items-center justify-center rounded-full bg-[#ffffff] border-[.1rem] border-slate-600">
					<Plus />
				</DivNative>
				<SpanNative textContent="các input" />
			</DivNative>

			<DivNative className=" flex flex-wrap items-center gap-[1rem] ">
				<SpanNative textContent="Và xem các hướng dẫn ví dụ về từng loại" />

				<DivNative className="w-[3.6rem] h-[3.6rem] hidden xl:flex items-center justify-center rounded-full bg-[#ffffff] border-[.1rem] border-slate-600">
					<NotebookPen />
				</DivNative>
				<SpanNative textContent="các input" />
			</DivNative>
		</DivNative>
	);
};

export default InputGuideIntroduce;
