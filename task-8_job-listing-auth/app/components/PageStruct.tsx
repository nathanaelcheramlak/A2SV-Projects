"use client";
interface PageStructProps {
	title: string;
	children: React.ReactNode;
}

export default function PageStruct({ title, children }: PageStructProps) {
	return (
		<div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
			<h1 className="text-2xl font-bold mb-6">{title}</h1>
			{children}
		</div>
	);
}
