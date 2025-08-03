"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

import PageStruct from "../components/PageStruct";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

interface LogInField {
	email: string;
	password: string;
}

const LogIn: React.FC = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<LogInField>();

	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === "authenticated") {
			router.push("/");
		}
	}, [status, router]);

	const onSubmit = async (data: LogInField) => {
		setLoading(true);
		setErrorMsg("");

		const result = await signIn("credentials", {
			redirect: false,
			email: data.email,
			password: data.password,
		});

		if (result?.error) {
			setErrorMsg(result.error);
		} else {
			router.push("/");
		}

		setLoading(false);
	};

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<PageStruct title="Welcome Back,">
				<InputBox
					type="email"
					label="Email Address"
					ph="Enter email address"
					register={register("email", {
						required: "Email is required",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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

				{errorMsg && (
					<p className="text-center text-red-500 text-sm">{errorMsg}</p>
				)}

				<Button
					disabled={loading}
					name={loading ? "Logging in..." : "Continue"}
					type="submit"
				/>

				<p className="text-center py-4 text-sm">
					Don't have an account?{" "}
					<Link href="/signup" className="text-indigo-700 font-semibold">
						Sign Up
					</Link>
				</p>

				<DevTool control={control} />
			</PageStruct>
		</form>
	);
};

export default LogIn;
