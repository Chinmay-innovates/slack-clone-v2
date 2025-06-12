"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useCreateWorkspaceValues } from "@/hooks/create-workspace-values";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/image-upload";
import { cn, slugify } from "@/lib/utils";
import { createWorkspace } from "@/server/create-workspace";
import { toast } from "sonner";
import { BsSlack } from "react-icons/bs";

const CreateWorkspace = () => {
	const { currStep } = useCreateWorkspaceValues();

	let stepInView = null;

	switch (currStep) {
		case 1:
			stepInView = <Step1 />;
			break;
		case 2:
			stepInView = <Step2 />;
			break;
		default:
			stepInView = <Step1 />;
	}

	const features = [
		"Real-time collaboration",
		"Secure file sharing",
		"Team management",
	];

	return (
		<div className="min-h-screen bg-gray-900 flex">
			{/* Left Side - Branding/Visual */}
			<div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-purple-800 via-purple-700 to-indigo-800 relative overflow-hidden">
				{/* Background pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
					<div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl"></div>
					<div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-300 rounded-full blur-2xl"></div>
				</div>

				{/* Content */}
				<div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
					<div className="max-w-md">
						<div className="flex items-center space-x-3 mb-12">
							<div className="size-12 bg-white rounded-xl flex items-center justify-center">
								<span className="text-purple-700 font-bold text-xl">
									<BsSlack />
								</span>
							</div>
							<Typography
								text="Snackk"
								className="text-4xl font-bold text-white"
								variant="h3"
							/>
							{/* <span className="text-2xl font-bold">Snackk</span> */}
						</div>

						<Typography
							text="Welcome to your new workspace"
							variant="h1"
							className="text-4xl font-bold mb-6 leading-tight"
						/>
						<Typography
							text="Create a space where your team can collaborate, share ideas, and
							get work done together."
							variant="lead"
							className="text-xl text-purple-100 mb-8 leading-relaxed"
						/>

						{/* Features list */}
						<div className="space-y-4">
							{features.map((feature, index) => (
								<div key={index} className="flex items-center space-x-3">
									<div className="size-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
										<svg
											className="w-4 h-4 text-white"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<Typography text={feature} className="text-purple-100" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Right Side - Form */}
			<div className="flex-1 lg:max-w-lg xl:max-w-xl bg-gray-900 flex flex-col">
				{/* Header */}
				<div className="px-6 py-6 border-b border-gray-800">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3 lg:hidden">
							<div className="size-12 bg-purple-600 rounded-lg flex items-center justify-center">
								<span className="text-white">
									<BsSlack />
								</span>
							</div>
							<Typography
								text="Snackk"
								className="text-4xl font-bold text-white"
								variant="h4"
							/>
						</div>
						<div className="text-sm text-gray-400">Step {currStep} of 2</div>
					</div>
				</div>

				{/* Progress bar */}
				<div className="px-6 py-2">
					<div className="w-full bg-gray-800 rounded-full h-1">
						<div
							className="bg-purple-600 h-1 rounded-full transition-all duration-500 ease-out"
							style={{ width: `${(currStep / 2) * 100}%` }}
						></div>
					</div>
				</div>

				{/* Main Content */}
				<div className="flex-1 flex items-center justify-center px-6 py-8">
					<div className="w-full max-w-sm">{stepInView}</div>
				</div>
			</div>
		</div>
	);
};

export default CreateWorkspace;

const Step1 = () => {
	const { name, updateValues, setCurrStep } = useCreateWorkspaceValues();

	return (
		<div className="space-y-8">
			<div className="space-y-4">
				<Typography
					text="What's the name of your company or team"
					className="text-2xl font-bold text-white leading-tight"
					variant="h1"
				/>
				<Typography
					text="This will be the name of your Snackk workspace — choose something that your team will recognize."
					className="text-gray-400 leading-relaxed"
					variant="p"
				/>
			</div>

			<form className="space-y-6">
				<fieldset>
					<Input
						className="w-full px-4 py-3 text-base bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-colors text-white placeholder:text-gray-500"
						type="text"
						value={name}
						placeholder="Ex: Acme Marketing or Acme Co"
						onChange={(event) => updateValues({ name: event.target.value })}
					/>

					<Button
						type="button"
						className={cn(
							"w-full mt-6 px-6 py-3 text-base font-medium rounded-lg transition-all duration-200",
							name
								? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl"
								: "bg-gray-700 text-gray-500 cursor-not-allowed"
						)}
						onClick={() => setCurrStep(2)}
						disabled={!name}
					>
						<Typography
							text="Continue"
							variant="p"
							className={name ? "text-white" : "text-gray-500"}
						/>
					</Button>
				</fieldset>
			</form>

			<div className="text-xs text-gray-500 leading-relaxed">
				By continuing, you're agreeing to our&nbsp;
				<span className="text-purple-400 hover:text-purple-300 cursor-pointer">
					Terms of Service&nbsp;
				</span>
				and&nbsp;
				<span className="text-purple-400 hover:text-purple-300 cursor-pointer">
					Privacy Policy.
				</span>
			</div>
		</div>
	);
};

const Step2 = () => {
	const { setCurrStep, updateImageUrl, imageUrl, name } =
		useCreateWorkspaceValues();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const handleSubmit = async () => {
		setIsSubmitting(true);
		const slug = slugify(name);
		const invite_code = uuidv4();

		const error = await createWorkspace({
			imageUrl,
			name,
			slug,
			invite_code,
		});
		setIsSubmitting(false);
		if (error?.error) {
			console.log(error);
			return toast.error("Could not create workspace. Please try again.");
		}
		toast.success("Workspace created successfully.");
		router.push("/");
	};

	return (
		<div className="space-y-8">
			{/* Back button */}
			<div className="flex justify-start">
				<Button
					className="text-purple-400 hover:text-purple-300 hover:bg-gray-800 p-2 h-auto font-medium -ml-2 rounded-lg"
					variant="ghost"
					onClick={() => setCurrStep(1)}
				>
					<svg
						className="w-5 h-5 mr-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					<Typography text="Back" variant="p" className="text-current" />
				</Button>
			</div>

			<div className="space-y-4">
				<Typography
					text="Add a workspace icon"
					className="text-2xl font-bold text-white leading-tight"
					variant="h1"
				/>
				<Typography
					text="This helps your team identify the workspace. You can change this later in settings."
					className="text-gray-400 leading-relaxed"
					variant="p"
				/>
			</div>

			<form>
				<fieldset disabled={isSubmitting} className="space-y-8">
					<div className="flex justify-center">
						<div className="relative">
							<ImageUpload />
							{isSubmitting && (
								<div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
									<div className="w-6 h-6 border-2 border-gray-600 border-t-purple-500 rounded-full animate-spin" />
								</div>
							)}
						</div>
					</div>

					<div className="space-y-3">
						{imageUrl ? (
							<Button
								type="button"
								onClick={handleSubmit}
								className="w-full px-6 py-3 text-base font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
								disabled={isSubmitting}
							>
								<Typography
									text={
										isSubmitting ? "Creating workspace..." : "Create workspace"
									}
									variant="p"
									className="text-white"
								/>
							</Button>
						) : null}

						<Button
							onClick={() => {
								updateImageUrl("");
								handleSubmit();
							}}
							className="w-full px-6 py-3 text-base font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200"
							disabled={isSubmitting}
						>
							<Typography
								text={
									isSubmitting
										? "Creating workspace..."
										: !imageUrl
										? "Skip for now"
										: ""
								}
								variant="p"
								className="text-gray-300"
							/>
						</Button>
					</div>
				</fieldset>
			</form>

			{isSubmitting && (
				<div className="text-sm text-gray-500 flex items-center justify-center space-x-2">
					<div className="w-4 h-4 border-2 border-gray-600 border-t-purple-500 rounded-full animate-spin" />
					<span>Setting up your workspace...</span>
				</div>
			)}
		</div>
	);
};
