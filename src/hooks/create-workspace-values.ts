import { create } from "zustand";

type CreateWorkspaceValues = {
	name: string;
	imageUrl: string;
	updateImageUrl: (imageUrl: string) => void;
	updateValues: (values: Partial<CreateWorkspaceValues>) => void;
	currStep: number;
	setCurrStep: (step: number) => void;
};

export const useCreateWorkspaceValues = create<CreateWorkspaceValues>(
	(set) => ({
		name: "",
		imageUrl: "",
		updateImageUrl: (imageUrl: string) => set({ imageUrl }),
		updateValues: (values) => set(values),
		currStep: 1,
		setCurrStep: (step) => set({ currStep: step }),
	})
);
