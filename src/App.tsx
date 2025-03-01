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
import { ThemeProvider, CssBaseline } from "@mui/material";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import GiftCard from "./GiftCard";
import theme from "./theme";
import { Tables } from "./database.types";

const backgroundImage =
	"https://uydcurfxaixdhrljgwlj.supabase.co/storage/v1/object/public/website//hero.jpg";
const stripeFormUrl = "https://buy.stripe.com/test_5kA3d1bZbdeFfbGdQQ";

const api =
	"https://uydcurfxaixdhrljgwlj.supabase.co/functions/v1/get-gifts-and-contributions";

const contentWidth = 800;

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
	const [isTablet, setTablet] = useState(false);

	useEffect(() => {
		function update() {
			setMobile(window.innerWidth < 680);
			setTablet(window.innerWidth >= 680 && window.innerWidth < contentWidth);
		}
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	const isMobileOrTablet = isMobile || isTablet;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box
				sx={{
					backgroundImage: `url('${backgroundImage}')`,
					backgroundSize: "cover",
					backgroundPosition: `50% ${isMobileOrTablet ? "20%" : "35%"}`,
					height: `${isMobileOrTablet ? "300px" : "500px"}`,
					color: "white",
					textShadow: "#676767 1px 0 30px",
					display: "flex",
					flexDirection: "column",
					justifyItems: "space-between",
					justifyContent: "space-between",
				}}
			>
				{isMobileOrTablet ? (
					<Typography variant="h3" paddingTop={4}>
						Liste de mariage
					</Typography>
				) : (
					<Typography variant="h3" paddingTop={4}>
						Liste de mariage
						<br />
						Clémence & Geoffroy
					</Typography>
				)}
				{isMobileOrTablet && (
					<Typography variant="h4" paddingBottom={4}>
						Clémence & Geoffroy
					</Typography>
				)}
				{stripeId && (
					<Typography variant="h5" paddingBottom={4}>
						Merci pour votre contribution 🎉
					</Typography>
				)}
			</Box>
			<Box sx={{ maxWidth: contentWidth, margin: "auto", padding: 4 }}>
				<Typography variant="h5" align="left">
					Une aventure romantique et inoubliable
				</Typography>
				<Typography variant="body1" align="justify">
					Votre participation nous permettra de concrétiser notre lune de miel
					rêvée au Vanuatu. Entre paysages volcaniques, traditions ancestrales
					et eaux cristallines… que l’aventure commence !
				</Typography>
				<Typography variant="h5" align="left" paddingTop={2}>
					Sur le Vanuatu
				</Typography>
				<iframe
					height="450"
					width="100%"
					src="https://www.google.com/maps/embed/v1/view?key=AIzaSyBjtF4aJ67znBG0Ue7806UZRi1UQ0A-1Pw&zoom=5&center=-15.3767,166.9592"
					style={{ border: 0, paddingTop: 2, paddingBottom: 2, height: 300 }}
				></iframe>
				<Typography variant="body1" align="justify" paddingTop={2}>
					Le Vanuatu, situé dans le Pacifique Sud, est un archipel de 83 îles
					volcaniques habitées depuis plus de 3 000 ans par les peuples
					mélanésiens. Ancienne colonie franco-britannique sous le nom de
					Nouvelles-Hébrides, il a obtenu son indépendance en 1980 après un long
					processus marqué par des tensions politiques et l’éphémère «
					République de Tanna », un mouvement séparatiste soutenu par des colons
					français.
					<br />
					<br />
					Sa population parle le bislama ainsi que l’anglais et le français.
					L'économie repose principalement sur l'agriculture, la pêche et le
					tourisme. Le Vanuatu est également connu pour ses traditions
					culturelles fortes, comme le rituel du saut du Gaul sur l’île de
					Pentecôte, et pour ses sites naturels exceptionnels, notamment le
					volcan actif du Mont Yasur.
					<br />
					<br />
					Enfin, malgré sa petite taille, le Vanuatu a été classé à plusieurs
					reprises parmi les pays les plus heureux du monde selon l’Happy Planet
					Index, en raison de son mode de vie simple, de ses liens
					communautaires forts et de son respect de la nature.
				</Typography>
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
							maxWidth: contentWidth,
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
													color={progress > 0 ? "primary" : "secondary"}
												/>
												<TimelineConnector
													sx={{
														bgcolor:
															progress > 0 ? "primary.main" : "secondary.main",
													}}
												/>
												{idx == gifts.length - 1 && (
													<TimelineDot
														color={progress > 0 ? "primary" : "secondary"}
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
													isTablet={isTablet}
												/>
											</TimelineContent>
										</TimelineItem>
									</>
								);
							})}
					</Timeline>
				</>
			)}
		</ThemeProvider>
	);
}

export default App;
