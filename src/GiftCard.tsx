import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProgressBar from "./ProgressBar";

interface GiftCardProps {
	giftId: number;
	imageUrl: string;
	name: string;
	description: string;
	price: number;
	progress: number;
	actionText: string;
	actionUrl: string;
}

const GiftCard: React.FC<GiftCardProps> = ({
	giftId,
	imageUrl,
	name,
	description,
	price,
	progress,
	actionText,
	actionUrl,
}) => {
	return (
		<Card
			id={giftId.toString()}
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
				<Button href={`${actionUrl}?giftId=${giftId}`} size="small">
					{actionText}
				</Button>
			</CardActions>
		</Card>
	);
};

export default GiftCard;
