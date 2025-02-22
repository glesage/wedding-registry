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
import Box from "@mui/material/Box";

import GiftCard from "./GiftCard";
import { Tables } from "./database.types";

const backgroundImage =
	"https://uydcurfxaixdhrljgwlj.supabase.co/storage/v1/object/public/website//hero.jpg";
const stripeFormUrl = "https://buy.stripe.com/test_5kA3d1bZbdeFfbGdQQ";

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

	const [isMobile, setMobile] = useState(false);

	useEffect(() => {
		function update() {
			setMobile(window.innerWidth < 700);
		}
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return (
		<>
			<Box
				sx={{
					backgroundImage: `url('${backgroundImage}')`,
					backgroundSize: "cover",
					backgroundPosition: "50% 20%",
					height: "500px",
					color: "white",
					textShadow: "#676767 1px 0 30px",
					display: "flex",
					flexDirection: "column",
					justifyItems: "space-between",
					justifyContent: "space-between",
				}}
			>
				<Typography variant="h3" paddingTop={4}>
					Liste de mariage
					<br />
					Clémence & Geoffroy
				</Typography>
				{stripeId ? (
					<Typography variant="h5" paddingBottom={4}>
						Merci pour votre contribution 🎉
					</Typography>
				) : (
					<Typography variant="h5" paddingBottom={4}>
						Aider nous a concretiser notre projet de voyage!
					</Typography>
				)}
			</Box>
			{isLoading ? (
				<div>Chargement du voyage...</div>
			) : (
				<>
					<Button
						variant="contained"
						size="large"
						href={stripeFormUrl}
						fullWidth
						sx={{ maxWidth: 400, margin: "auto", marginTop: 4 }}
					>
						Contribuer
					</Button>
					<Timeline
						sx={{
							[`& .${timelineItemClasses.root}:before`]: {
								flex: 0,
								padding: 0,
							},
							maxWidth: 800,
							margin: "auto",
						}}
					>
						{gifts
							?.sort((a, b) => a.id - b.id)
							.map((gift, idx) => {
								const giftsTotalUpToIdx = gifts?.reduce((acc, curr, pIdx) => {
									if (pIdx <= idx) {
										return acc + curr.price;
									}
									return acc;
								}, 0);
								const done = totalContributions > giftsTotalUpToIdx;
								const progress = done
									? 100
									: ((totalContributions - giftsTotalUpToIdx + gift.price) /
											gift.price) *
									  100;
								return (
									<>
										{gift.bonus && (
											<Typography
												variant="h4"
												sx={{ pt: 4, textAlign: "left" }}
											>
												Bonus
											</Typography>
										)}
										<TimelineItem>
											<TimelineSeparator>
												<TimelineDot
													color={progress > 0 ? "primary" : "grey"}
												/>
												<TimelineConnector
													sx={{
														bgcolor: progress > 0 ? "primary.main" : "",
													}}
												/>
												{idx == gifts.length - 1 && (
													<TimelineDot
														color={progress > 0 ? "primary" : "grey"}
													/>
												)}
											</TimelineSeparator>
											<TimelineContent
												sx={{ marginTop: 4, paddingLeft: isMobile ? 2 : 8 }}
											>
												<GiftCard
													imageUrl={gift.image_url}
													name={gift.name}
													description={gift.description}
													price={gift.price}
													progress={progress}
													isMobile={isMobile}
												/>
											</TimelineContent>
										</TimelineItem>
									</>
								);
							})}
					</Timeline>
				</>
			)}
		</>
	);
}

export default App;
