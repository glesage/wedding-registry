import "./App.css";

import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

import GiftCard from "./GiftCard";

const contributeButtonText = "Contribute";
const contributionUrl = "https://buy.stripe.com/5kAdRG1aI94i9qwdQQ";

function App() {
	return (
		<>
			<div>
				<Typography variant="h3" padding={4}>
					Wedding registry
				</Typography>
			</div>
			<Grid container spacing={4} sx={{ justifyContent: "center" }}>
				<GiftCard
					imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqgsXNFBXzJZpIBidxK0IIIqhhPEdl2knOhg&s"
					name="Coffee machine"
					description="The best coffee machine ever"
					price={100}
					amountRaised={50}
					actionText={contributeButtonText}
					actionUrl={contributionUrl}
				/>
				<GiftCard
					imageUrl="https://nemodivingcenter.com/wp-content/uploads/2023/02/scuba-diving-couple-jpg.webp"
					name="Scuba diving"
					description="Scuba diving is a great way to explore the underwater world and see the beauty of the ocean."
					price={500}
					amountRaised={400}
					actionText={contributeButtonText}
					actionUrl={contributionUrl}
				/>
				<GiftCard
					imageUrl="https://nemodivingcenter.com/wp-content/uploads/2023/02/scuba-diving-couple-jpg.webp"
					name="Scuba diving"
					description="Scuba diving is a great way to explore the underwater world and see the beauty of the ocean."
					price={500}
					amountRaised={400}
					actionText={contributeButtonText}
					actionUrl={contributionUrl}
				/>
				<GiftCard
					imageUrl="https://nemodivingcenter.com/wp-content/uploads/2023/02/scuba-diving-couple-jpg.webp"
					name="Scuba diving"
					description="Scuba diving is a great way to explore the underwater world and see the beauty of the ocean."
					price={500}
					amountRaised={400}
					actionText={contributeButtonText}
					actionUrl={contributionUrl}
				/>
				<GiftCard
					imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqgsXNFBXzJZpIBidxK0IIIqhhPEdl2knOhg&s"
					name="Coffee machine"
					description="The best coffee machine ever"
					price={100}
					amountRaised={50}
					actionText={contributeButtonText}
					actionUrl={contributionUrl}
				/>
				<GiftCard
					imageUrl="https://nemodivingcenter.com/wp-content/uploads/2023/02/scuba-diving-couple-jpg.webp"
					name="Scuba diving"
					description="Scuba diving is a great way to explore the underwater world and see the beauty of the ocean."
					price={500}
					amountRaised={400}
					actionText={contributeButtonText}
					actionUrl={contributionUrl}
				/>
			</Grid>
		</>
	);
}

export default App;
