"use client";

import { useEffect } from "react";

export const ReportView: React.FC = () => {
	useEffect(() => {
		fetch("/api/incr", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ bookshelf: true }),
		});
	}, []);

	return null;
};
