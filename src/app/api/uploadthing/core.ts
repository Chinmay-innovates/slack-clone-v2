import { getUserData } from "@/server/get-user-data";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const currUser = async () => {
	const user = await getUserData();
	if (!user) throw new UploadThingError("Unauthorized");

	return { userId: user.id };
};

export const ourFileRouter = {
	workspaceAvatar: f({
		image: { maxFileSize: "4MB", maxFileCount: 1 },
	})
		.middleware(() => currUser())
		.onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
