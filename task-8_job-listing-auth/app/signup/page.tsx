"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

import PageStruct from "../components/PageStruct";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { signup } from "@/app/api/api";

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
	confPassword: string;
}

export default function SignUp() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<SignUpFormData>();

	const router = useRouter();
	const { data: session, status } = useSession();

	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		if (status === "authenticated") {
			router.push("/");
		}
	}, [status, router]);

	const onSubmit = async (formData: SignUpFormData) => {
		setLoading(true);
		setErrorMsg("");

		try {
			const response = await signup(formData);

			if (response?.success) {
				router.push(`/verifyEmail?email=${encodeURIComponent(formData.email)}`);
			} else {
				setErrorMsg("Something went wrong. Please try again.");
			}
		} catch (error) {
			console.error("Signup error:", error);
			setErrorMsg("Something went wrong. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<PageStruct title="Sign Up Now!">
				<button
					type="button"
					onClick={() => signIn("google", { callbackUrl: "/" })}
					className="w-full border border-gray-300 flex items-center justify-center p-2 rounded my-4 text-indigo-800 font-bold"
				>
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJg75LWB1zIJt1VTZO7O68yKciaDSkk3KMdw&s"
						alt="Google"
						className="w-4 h-4 mx-2"
					/>
					Sign Up with Google
				</button>

				<InputBox
					label="Full Name"
					ph="Enter your full name"
					register={register("name", { required: "Name is required" })}
					error={errors.name?.message}
				/>

				<InputBox
					type="email"
					label="Email Address"
					ph="Enter email address"
					register={register("email", {
						required: "Email is required",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Invalid email address",
						},
					})}
					error={errors.email?.message}
				/>

				<InputBox
					type="password"
					label="Password"
					ph="Enter password"
					register={register("password", {
						required: "Password is required",
						minLength: {
							value: 6,
							message: "Password must be at least 6 characters",
						},
					})}
					error={errors.password?.message}
				/>

				<InputBox
					type="password"
					label="Confirm Password"
					ph="Re-enter password"
					register={register("confPassword", {
						required: "Confirm password is required",
					})}
					error={errors.confPassword?.message}
				/>

				{errorMsg && (
					<p className="text-red-500 text-center text-sm">{errorMsg}</p>
				)}

				<Button
					type="submit"
					name={loading ? "Sending Code..." : "Continue"}
					disabled={loading}
				/>

				<p className="px-1 py-4 text-sm">
					Already have an account?{" "}
					<Link href="/login" className="text-indigo-900 font-bold">
						Login
					</Link>
				</p>

				<DevTool control={control} />
			</PageStruct>
		</form>
	);
}
