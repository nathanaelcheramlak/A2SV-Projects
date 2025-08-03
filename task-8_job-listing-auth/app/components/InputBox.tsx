"use client";
interface InputBoxProps {
	type: string;
	label: string;
	ph: string;
	register: any;
	error?: string;
}

export default function InputBox({
	type,
	label,
	ph,
	register,
	error,
}: InputBoxProps) {
	return (
		<div className="mb-4">
			<label className="block mb-1 font-medium">{label}</label>
			<input
				type={type}
				placeholder={ph}
				{...register}
				className="w-full p-2 border rounded"
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
}
