import { InputData } from "../_components/AnalysisAnswer";

type TProps = {
	data: InputData[];
};
const generatePercentOption = (data: InputData[]) => {
	let dataAnalysis: { [key: string]: { count: number; percent: number } } = {};
	const total = data.length;
	console.log({ "Tổng số trang": total });
	data.map((dt) => {
		const covertValueArrayToString = typeof dt.value === "string" ? dt.value : dt.value.join(", ");

		if (!dataAnalysis[covertValueArrayToString]) {
			dataAnalysis[covertValueArrayToString] = { count: 1, percent: Number(((1 / total) * 100).toFixed(2)) };
		} else {
			dataAnalysis[covertValueArrayToString] = {
				count: (dataAnalysis[covertValueArrayToString].count += 1),
				percent: Number(((dataAnalysis[covertValueArrayToString].count / total) * 100).toFixed(2)),
			};
		}
	});
	console.log({ "Phần trăm xuất hiện của các option": dataAnalysis });

	return dataAnalysis;
};

export default generatePercentOption;
