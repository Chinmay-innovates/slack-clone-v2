"use server";

import { supabaseServerClient } from "@/supabase/supabase-server";

export const updateUserWorkspace = async (
	userId: string,
	workspaceId: string
) => {
	const supabase = await supabaseServerClient();
	const { data: updatedWorkspace, error: updateError } = await supabase.rpc(
		"add_workspace_to_user",
		{
			user_id: userId,
			new_workspace: workspaceId,
		}
	);

	return [updatedWorkspace, updateError];
};
