import { redirect } from "next/navigation";

import { getUserData } from "@/server/get-user-data";

export default async function Home() {
	const user = await getUserData();

	if (!user) return redirect("/auth");

	const workspaceId = user.workspaces?.[0];

	if (!workspaceId) return redirect("/create-workspace");

	if (workspaceId) return redirect(`/workspace/${workspaceId}`);
}
