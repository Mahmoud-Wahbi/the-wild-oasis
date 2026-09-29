import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mypgkuulrpbhvnffunrr.supabase.co";
const supabaseKey = `sb_publishable_20lRakV1ZTsPYC5A6WLQvg_3GT3xz3I`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
