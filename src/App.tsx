import "./App.css";

import { createClient } from "@supabase/supabase-js";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

import GiftCard from "./GiftCard";
import { Database } from "./database.types";

// Get data for gifts from supabase
const supabase = createClient<Database>(
	"https://uydcurfxaixdhrljgwlj.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5ZGN1cmZ4YWl4ZGhybGpnd2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxOTI5MzIsImV4cCI6MjA1NDc2ODkzMn0.YkJ22WwJaJF55iBj03gZryRNTE4lA8a9KXLCPRwyywU"
);
const { data: gifts, error: giftsError } = await supabase
	.from("Gifts")
	.select();
const { data: contributions, error: contributionsError } = await supabase
	.from("Contributions")
	.select("amount, gift_id");
const gotError = giftsError || contributionsError;

// If this is a redirect from Stripe
const urlParams = new URLSearchParams(window.location.search);
const stripeId = Array.from(urlParams.entries()).find((param) => {
	return param[0] === "stripe_id";
});
if (stripeId) {
	setTimeout(() => {
		const url = new URL(window.location.href);
		history.replaceState({}, "", url.origin);
	}, 0);
}

function App() {
	return (
		<>
			<Typography variant="h3" padding={4}>
				Wedding registry
			</Typography>
			{stripeId && (
				<Typography variant="h5" padding={4}>
					Merci pour votre contribution 🎉
				</Typography>
			)}
			{gotError ? (
				<div>Could not get gifts ); Contact Geo & Clem for tech support...</div>
			) : (
				<Grid container spacing={4} sx={{ justifyContent: "center" }}>
					{gifts?.map((gift) => {
						const progress =
							contributions?.reduce((acc, curr) => {
								if (curr.gift_id === gift.id) {
									return acc + curr.amount;
								}
								return acc;
							}, 0) / gift.price;
						return (
							<GiftCard
								giftId={gift.id}
								imageUrl={gift.image_url}
								name={gift.name}
								description={gift.description}
								price={gift.price}
								progress={progress * 100}
								actionText="Contribute"
								actionUrl="https://buy.stripe.com/test_5kA3d1bZbdeFfbGdQQ"
							/>
						);
					})}
				</Grid>
			)}
		</>
	);
}

export default App;
