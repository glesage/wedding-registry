import "./App.css";

import axios from "axios";
import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import Button from "@mui/material/Button";

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
		url.searchParams.delete("stripe_id");
		window.history.pushState(null, "", url.toString());
	}, 0);
}

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [gifts, setGifts] = useState<Tables<"Gifts">[]>([]);
	const [totalContributions, setTotalContributions] = useState<number>(0);

	async function fetchGiftsAndContributions() {
		const data = await axios<EdgeRes>(api);
		setGifts(data.data.gifts);
		setTotalContributions(
			data.data.contributions.reduce((acc, curr) => {
				return acc + curr.amount;
			}, 0)
		);
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
				Liste de G&C
			</Typography>
			{stripeId && (
				<Typography variant="h5" padding={4}>
					Merci pour votre contribution 🎉
				</Typography>
			)}

			{isLoading ? (
				<div>Chargement du voyage...</div>
			) : (
				<>
					{!stripeId && (
						<>
							<Typography variant="body1" padding={4}>
								Aider nous a faire un super voyage de noces au Vanuatu! Chaque
								étape que nous attaingon nous permetra de faire quelques jours
								de plus.
							</Typography>
							<Button
								href="https://buy.stripe.com/test_5kA3d1bZbdeFfbGdQQ"
								size="small"
							>
								<Typography variant="h5">Contribuer</Typography>
							</Button>
						</>
					)}
					<Timeline
						sx={{
							[`& .${timelineItemClasses.root}:before`]: {
								flex: 0,
								padding: 0,
							},
							maxWidth: 800,
						}}
					>
						{gifts?.map((gift, idx) => {
							const previousGiftsTotal = gifts?.reduce((acc, curr, idx) => {
								if (idx < idx) {
									return acc + curr.price;
								}
								return acc;
							}, 0);
							const done = totalContributions > previousGiftsTotal + gift.price;
							return (
								<TimelineItem>
									<TimelineSeparator>
										<TimelineDot color={done ? "success" : "grey"} />
										{idx < gifts.length - 1 && <TimelineConnector />}
									</TimelineSeparator>
									<TimelineContent sx={{ marginTop: 4, paddingLeft: 8 }}>
										<GiftCard
											giftId={gift.id}
											imageUrl={gift.image_url}
											name={gift.name}
											description={gift.description}
											price={gift.price}
											progress={
												done
													? 1
													: ((totalContributions - previousGiftsTotal) /
															gift.price) *
													  100
											}
											actionText="Contribuer"
											actionUrl={`https://buy.stripe.com/test_5kA3d1bZbdeFfbGdQQ?utm_content=${gift.id}`}
										/>
									</TimelineContent>
								</TimelineItem>
							);
						})}
					</Timeline>
				</>
			)}
		</>
	);
}

export default App;
