"use server";

import { supabaseServerClient } from "@/supabase/supabase-server";

export const addMemberToWorkspace = async (
	userId: string,
	workspaceId: string
) => {
	const supabase = await supabaseServerClient();
	const { data: updatedWorkspace, error: updateError } = await supabase.rpc(
		"add_member_to_workspace",
		{
			user_id: userId,
			workspace_id: workspaceId,
		}
	);

	return [updatedWorkspace, updateError];
};
