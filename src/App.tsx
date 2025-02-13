import "./App.css";

import axios from "axios";
import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

import GiftCard from "./GiftCard";
import { Tables } from "./database.types";

const api =
	"https://uydcurfxaixdhrljgwlj.supabase.co/functions/v1/get-gifts-and-contributions";

type EdgeRes = {
	gifts: Tables<"Gifts">[];
	contributions: Tables<"Contributions">[];
};

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
	const [isLoading, setIsLoading] = useState(false);
	const [gifts, setGifts] = useState<Tables<"Gifts">[]>([]);
	const [contributions, setContributions] = useState<Tables<"Contributions">[]>(
		[]
	);

	async function fetchGiftsAndContributions() {
		const data = await axios<EdgeRes>(api);
		setGifts(data.data.gifts);
		setContributions(data.data.contributions);
		setIsLoading(false);
	}

	useEffect(() => {
		if (!isLoading && gifts.length < 1) {
			setIsLoading(true);
			fetchGiftsAndContributions();
		}
	}, [isLoading, gifts]);

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

			{isLoading ? (
				<div>Finding gifts...</div>
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
