import { Database } from "./supabase";

type User = Database["public"]["Tables"]["users"]["Row"];
type Workspace = Database["public"]["Tables"]["workspaces"]["Row"];

export type { User, Workspace };
