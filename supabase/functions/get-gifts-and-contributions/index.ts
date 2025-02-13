import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async () => {
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
	if (giftsError) {
		return new Response(giftsError.message, { status: 400 });
	}
	if (contributionsError) {
		return new Response(contributionsError.message, { status: 400 });
	}

	return new Response(JSON.stringify({ gifts, contributions }), {
		headers: { "Content-Type": "application/json" },
	});
});
