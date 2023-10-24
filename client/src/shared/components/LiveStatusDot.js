import { Box, styled } from "@mui/material";

const useStyles = styled((theme) => ({
  blink_me: {
    animation: "$blinker 2s linear infinite",
    width: "10px",
    height: "10px",
    display: "inline-block",
    border: "1px solid green",
    backgroundColor: "green",
    borderRadius: "100%",
  },
  "@keyframes blinker": {
    "50%": {
      opacity: 0.6,
    },
  },
}));

const LiveStatusDot = () => {
  const classes = useStyles();

  return <span className={classes.blink_me}> </span>;
};

export default LiveStatusDot;
