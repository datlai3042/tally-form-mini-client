import React from "react";

type TProps = {
	statusCode: number;
	statusCodeText: string;
	statusCodeReason: string;
};

const StatusCodeResponse = (props: TProps) => {
	const { statusCode, statusCodeText, statusCodeReason } = props;

	return (
		<section className="bg-white dark:bg-gray-900 min-h-[30rem] mt-[10rem]">
			<div className="py-8 px-4 mx-auto max-w-screen-xl min-h-[30rem] flex flex-col items-center text-[24rem] lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-sm text-center">
					<h1 className="mb-4 text-8xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
						{statusCode}
					</h1>
					<p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
						{statusCodeText}
					</p>
					<p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{statusCodeReason}</p>
				</div>
			</div>
		</section>
	);
};

export default StatusCodeResponse;
