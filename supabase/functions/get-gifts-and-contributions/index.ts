import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

import { corsHeaders } from "../_shared/cors.ts";

function response(body: string, status: number) {
	return new Response(body, {
		headers: { ...corsHeaders, "Content-Type": "application/json" },
		status,
	});
}

Deno.serve(async (req) => {
	if (req.method === "OPTIONS") {
		return new Response("ok", { headers: corsHeaders });
	}

	const client = createClient(
		Deno.env.get("SUPABASE_URL") ?? "",
		Deno.env.get("SUPABASE_ANON_KEY") ?? ""
	);

	const [
		{ data: gifts, error: giftsError },
		{ data: contributions, error: contributionsError },
	] = await Promise.all([
		client.from("Gifts").select("*"),
		client.from("Contributions").select("amount, gift_id"),
	]);
	if (giftsError) return response(giftsError.message, 400);
	if (contributionsError) return response(contributionsError.message, 400);

	return response(JSON.stringify({ gifts, contributions }), 200);
});
