"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: { queries: { staleTime: 60 * 1000, refetchOnWindowFocus: false, retry: false } },
		})
	);

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
