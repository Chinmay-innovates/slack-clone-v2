import { Typography } from "@/components/ui/typography";

const CreateWorkspace = () => {
	return (
		<div className="h-screen w-screen grid place-content-center bg-neutral-800 text-white">
			<div className="p-3 max-w-[550px]">
				<Typography
					text={"step 1 of 2"}
					variant="large"
					className="mb-4"
					color="subtle"
				/>
			</div>
		</div>
	);
};

export default CreateWorkspace;
