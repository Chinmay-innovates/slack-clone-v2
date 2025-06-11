"use server";

import { supabaseServerClient } from "@/supabase/supabase-server";

export async function registerWithEmail({ email }: { email: string }) {
	const supabase = await supabaseServerClient();

	const response = await supabase.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: process.env.NEXT_PUBLIC_APP_ORIGIN,
		},
	});

	return JSON.stringify(response);
}
