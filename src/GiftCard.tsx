import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProgressBar from "./ProgressBar";

interface GiftCardProps {
	imageUrl: string;
	name: string;
	description: string;
	price: number;
	amountRaised: number;
	actionText: string;
	actionUrl: string;
}

const GiftCard: React.FC<GiftCardProps> = ({
	imageUrl,
	name,
	description,
	price,
	amountRaised,
	actionText,
	actionUrl,
}) => {
	const progress = Math.min((amountRaised / price) * 100, 100);
	return (
		<Card
			sx={{
				width: 345,
				display: "flex",
				flexDirection: "column",
			}}
		>
			<CardMedia sx={{ height: 140 }} image={imageUrl} title={name} />
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography variant="h5">{name}</Typography>
				<ProgressBar target={`${price}€`} progress={progress} />
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					{description}
				</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: "center" }}>
				<Button href={actionUrl} size="small">
					{actionText}
				</Button>
			</CardActions>
		</Card>
	);
};

export default GiftCard;
