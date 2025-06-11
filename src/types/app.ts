import { Database } from "./supabase";

type User = Database["public"]["Tables"]["users"]["Row"];

export type { User };
