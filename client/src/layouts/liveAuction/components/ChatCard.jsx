import React from "react";
import { Card, Grid, Icon, IconButton } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import { useState } from "react";

const ChatCard = () => {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const [text, setText] = useState("Type something...");

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = darkMode ? white.main : dark.main;

      if (transparentNavbar) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <MDBox sx={{ display: "flex", flexDirection: "column", flex: 1, p: 2 }}>
      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <MDTypography variant="h4" color="text">
          Chats
        </MDTypography>
      </MDBox>
      <MDBox
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column-reverse",
          maxHeight: "572px",
          overflowY: "auto",
          mt: 1,
        }}
      >
        <MDBox sx={{ display: "flex" }}>
          <MDTypography variant="h6" color="text" sx={{ textAlign: "justify" }}>
            Harshit:
          </MDTypography>
          <MDTypography variant="button" color="text" pl={1} pt={0.5} sx={{ textAlign: "justify" }}>
            Hello Boys!
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox mt={2}>
        <Grid container p={1}>
          <Grid item xs={12} mt={1}>
            <MDBox sx={{ display: "flex" }}>
              <MDInput
                required
                type="text"
                variant="standard"
                name="chatText"
                value={text}
                onFocus={() => {
                  if (text === "Type something...") setText("");
                }}
                onChange={(e) => setText(e.target.value)}
                autoComplete="chatText"
                fullWidth
              />
              <IconButton sx={navbarIconButton} size="small" disableRipple>
                <Icon sx={iconsStyle}>send</Icon>
              </IconButton>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
};

export default ChatCard;
