import * as React from "react";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

interface ProgressBarProps {
	target: string;
	progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ target, progress }) => {
	return (
		<Grid container spacing={4} sx={{ alignItems: "center" }}>
			<Grid item xs>
				<LinearProgress
					variant="buffer"
					value={progress}
					sx={{
						"& .MuiLinearProgress-bar2": {
							backgroundColor: "secondary.main",
						},
					}}
				/>
			</Grid>
			<Grid item>{target}</Grid>
		</Grid>
	);
};

export default ProgressBar;
