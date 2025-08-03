"use client";
interface ButtonProps {
	name: string;
	type?: "submit" | "button";
	disabled?: boolean;
}

export default function Button({
	name,
	type = "submit",
	disabled,
}: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			className={`w-full p-2 text-white rounded ${
				disabled ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
			}`}
		>
			{name}
		</button>
	);
}
