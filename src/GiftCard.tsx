import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ProgressBar from "./ProgressBar";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

interface GiftCardProps {
	giftId: number;
	imageUrl: string;
	name: string;
	description: string;
	price: number;
	progress: number;
	actionText?: string;
	actionUrl?: string;
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
				height: 200,
				display: "flex",
			}}
		>
			<CardMedia sx={{ width: 200 }} image={imageUrl} title={name} />
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography variant="h5">{name}</Typography>
				<ProgressBar target={`${price}€`} progress={progress} />
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					{description}
				</Typography>
				{actionText && actionUrl && (
					<CardActions sx={{ justifyContent: "center" }}>
						<Button href={`${actionUrl}?utm_content=${giftId}`} size="small">
							{actionText}
						</Button>
					</CardActions>
				)}
			</CardContent>
		</Card>
	);
};

export default GiftCard;
