import { InputCore } from "@/type";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// const inputOptionDemo: InputCore.InputForm = {
// type: 'EMAIL',
// } ;
