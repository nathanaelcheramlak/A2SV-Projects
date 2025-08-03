"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "../api/api";

interface Code {
	email: string;
	OTP: string;
}

const VerifyEmail = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Code>();
	const searchParams = useSearchParams();
	const router = useRouter();
	const email = searchParams.get("email");

	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const [countdown, setCountdown] = useState(30);

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const onSubmit = async (data: Code) => {
		setErrMsg("");
		if (!email) return;

		setLoading(true);
		try {
			const response = await verifyEmail({ email, OTP: data.OTP });
			if (response.success) {
				router.push("/");
			} else {
				setErrMsg(response?.message || "Verification failed");
			}
		} catch (error) {
			console.error("Verification error:", error);
			setErrMsg("Verification failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="max-w-md mx-auto px-6 py-12">
			<h1 className="text-2xl font-semibold text-center mb-8">
				Verify with Email
			</h1>
			<p className="text-gray-600 mb-6 text-center">
				We've sent a verification code to the email address you provided. Please
				enter it below to continue.
			</p>

			<form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
				<div>
					<input
						type="text"
						placeholder="Enter Verification Code"
						{...register("OTP", { required: "Verification code is required" })}
						className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
					{errors.OTP && (
						<p className="text-red-500 text-sm mt-1">{errors.OTP.message}</p>
					)}
				</div>

				{errMsg && <p className="text-red-500 text-center text-sm">{errMsg}</p>}

				{countdown > 0 ? (
					<p className="text-center text-sm text-gray-500">
						You can{" "}
						<span className="font-semibold text-indigo-600">
							resend the code
						</span>{" "}
						in{" "}
						<span className="font-semibold text-indigo-600">
							0:{String(countdown).padStart(2, "0")}
						</span>
					</p>
				) : (
					<button
						type="button"
						className="w-full border border-indigo-500 text-indigo-600 rounded-full py-2 hover:bg-indigo-50 transition"
						onClick={() => {
							// Optionally implement resend logic
							setCountdown(30);
						}}
					>
						Resend Code
					</button>
				)}

				<button
					type="submit"
					disabled={loading}
					className={`w-full bg-indigo-600 text-white py-2 rounded-full font-semibold hover:bg-indigo-700 transition ${
						loading && "opacity-50 cursor-not-allowed"
					}`}
				>
					{loading ? "Verifying..." : "Continue"}
				</button>
			</form>
		</main>
	);
};

export default VerifyEmail;
