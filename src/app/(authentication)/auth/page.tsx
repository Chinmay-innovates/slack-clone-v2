"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsSlack } from "react-icons/bs";
import {
	Mail,
	Github,
	Chrome,
	Sparkles,
	ArrowRight,
	Shield,
	Check,
} from "lucide-react";
import { registerWithEmail } from "@/server/register-with-email";
import { supabaseBrowserClient } from "@/supabase/supabase-client";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ModernAuthPage = () => {
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [focusedInput, setFocusedInput] = useState("");

	const router = useRouter();

	useEffect(() => {
		const getCurrUser = async () => {
			const {
				data: { session },
			} = await supabaseBrowserClient.auth.getSession();

			if (session) {
				return router.push("/");
			}
		};

		getCurrUser();
		setIsMounted(true);
	}, [router]);
	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email) && email.length >= 2;
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);

		if (value && !validateEmail(value)) {
			setEmailError("Please enter a valid email");
		} else {
			setEmailError("");
		}
	};

	const onSubmit = async (values: { email: string }) => {
		setIsAuthenticating(true);
		const response = await registerWithEmail(values);
		const { error } = JSON.parse(response);
		setIsAuthenticating(false);

		if (error) {
			console.error("Sign in error", error);
			return;
		}
		// Redirect to home page on success
		router.push("/");
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateEmail(email)) {
			setEmailError("Please enter a valid email");
			return;
		}
		onSubmit({ email });
	};

	async function socialAuth(provider: "google" | "github") {
		setIsAuthenticating(true);
		await supabaseBrowserClient.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${location.origin}/auth/callback`,
			},
		});
		setIsAuthenticating(false);
	}

	if (!isMounted) return null;

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
			{/* Background Dots Pattern */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,23,246,0.1)_1px,transparent_0)] [background-size:12px_10px]" />
			<div className="relative w-full max-w-md">
				{/* Main Card */}
				<div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 border border-white/20 p-8 relative overflow-hidden">
					{/* Header */}
					<div className="text-center mb-8 relative">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
							<BsSlack className="size-8 text-white" />
						</div>
						<Typography
							text="Sign in to your Snackk"
							className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2"
							variant="h2"
						/>
						<Typography
							text="We suggest using the email address that you use at work"
							variant="p"
							className="text-gray-600 text-sm"
						/>
					</div>

					{/* Social Login Buttons */}
					<div className="space-y-3 mb-6">
						<Button
							onClick={() => socialAuth("google")}
							variant={"outline"}
							disabled={isAuthenticating}
							className="auth_button group"
						>
							<Chrome className="size-5 text-blue-500" />
							<Typography
								text="Sign in with Google"
								className="font-medium text-gray-700"
								variant="p"
							/>
							<ArrowRight className="size-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
						</Button>

						<Button
							onClick={() => socialAuth("github")}
							variant={"outline"}
							disabled={isAuthenticating}
							className="auth_button group"
						>
							<Github className="size-5 text-gray-700" />
							<Typography
								text="Sign in with GitHub"
								className="font-medium text-gray-700"
								variant="p"
							/>
							<ArrowRight className="size-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
						</Button>
					</div>

					{/* Divider */}
					<div className="relative mb-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-200" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-4 bg-white text-gray-500">OR</span>
						</div>
					</div>

					<div className="space-y-4">
						<fieldset disabled={isAuthenticating}>
							{/* Email Input */}
							<div className="relative mb-4">
								<div
									className={cn(
										"relative rounded-xl border-2 transition-all duration-200",
										focusedInput === "email"
											? "border-blue-500 bg-blue-50/50"
											: emailError
											? "border-red-300 bg-red-50/50"
											: "border-gray-200 bg-white"
									)}
								>
									<Mail
										className={cn(
											"absolute left-3 top-1/2 transform -translate-y-1/2 size-5 transition-colors",
											focusedInput === "email"
												? "text-blue-500"
												: "text-gray-400"
										)}
									/>
									<input
										type="email"
										value={email}
										onChange={handleEmailChange}
										onFocus={() => setFocusedInput("email")}
										onBlur={() => setFocusedInput("")}
										placeholder="name@work-email.com"
										className="w-full pl-12 pr-4 py-3.5 bg-transparent border-none outline-none placeholder-gray-500 text-gray-900"
										disabled={isAuthenticating}
									/>
									{email && !emailError && (
										<Check className="absolute right-3 top-1/2 transform -translate-y-1/2 size-5 text-green-500" />
									)}
								</div>
								{emailError && (
									<p className="mt-2 text-sm text-red-600 flex items-center gap-1">
										<span className="size-1 bg-red-600 rounded-full" />
										{emailError}
									</p>
								)}
							</div>

							{/* Submit Button */}
							<button
								onClick={handleSubmit}
								type="submit"
								className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mb-5"
								disabled={isAuthenticating}
							>
								{isAuthenticating ? (
									<>
										<div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
										<span>Signing in...</span>
									</>
								) : (
									<>
										<span>Sign in with Email</span>
										<ArrowRight className="size-4" />
									</>
								)}
							</button>

							{/* Magic Link Info */}
							<div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
								<div className="flex items-center gap-3">
									<div className="flex-shrink-0 size-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
										<Sparkles className="size-4 text-white" />
									</div>
									<div>
										<Typography
											text="Use a magic link for a password-free sign in."
											variant="p"
											className="text-xs text-gray-600 leading-relaxed"
										/>
									</div>
								</div>
							</div>
						</fieldset>
					</div>
				</div>

				{/* Security Badge */}
				<div className="mt-6 text-center">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 text-sm text-gray-600">
						<Shield className="size-4 text-green-500" />
						<Typography
							text="Secured with enterprise-grade encryption"
							variant="p"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModernAuthPage;
