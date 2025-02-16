import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "https://esm.sh/stripe@17.6.0?target=deno";
import { createClient } from "jsr:@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_API_KEY") as string, {
	apiVersion: "2022-11-15",
	httpClient: Stripe.createFetchHttpClient(),
});
const cryptoProvider = Stripe.createSubtleCryptoProvider();

Deno.serve(async (req) => {
	let signature;
	try {
		signature = req.headers.get("Stripe-Signature");
	} catch (err) {
		return new Response(err.message, { status: 400 });
	}
	const body = await req.text();

	let receivedEvent;
	try {
		receivedEvent = await stripe.webhooks.constructEventAsync(
			body,
			signature!,
			Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET")!,
			undefined,
			cryptoProvider
		);
	} catch (err) {
		return new Response(err.message, { status: 400 });
	}

	const client = createClient(
		Deno.env.get("SUPABASE_URL") ?? "",
		Deno.env.get("SUPABASE_ANON_KEY") ?? ""
	);

	await client.from("Contributions").insert({
		amount: receivedEvent.data.object.amount_total / 100,
		email: receivedEvent.data.object.customer_details.email,
	});

	return new Response(JSON.stringify({ ok: true }), { status: 200 });
});
