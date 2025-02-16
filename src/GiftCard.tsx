import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ProgressBar from "./ProgressBar";

interface GiftCardProps {
	imageUrl: string;
	name: string;
	description: string;
	price: number;
	progress: number;
}

const GiftCard: React.FC<GiftCardProps> = ({
	imageUrl,
	name,
	description,
	price,
	progress,
}) => {
	return (
		<Card
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
			</CardContent>
		</Card>
	);
};

export default GiftCard;
