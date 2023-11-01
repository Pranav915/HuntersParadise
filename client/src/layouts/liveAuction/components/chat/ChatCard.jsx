/* eslint-disable react/prop-types */
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
import Message from "./Message";
import { useChannel } from "ably/react";
import { realtime } from "../../../../ably.js";

const ChatCard = ({ userDetails, liveAuctionDetails }) => {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const [text, setText] = useState("Type something...");
  const [messages, setMessages] = useState([]);

  const { channel } = useChannel(
    "auction:" + liveAuctionDetails?.auctionId,
    "chatMessage",
    (msg) => {
      console.log("msg", msg);
      const message = {
        username: msg.clientId,
        msg: msg.data.msg,
      };
      setMessages([message, ...messages]);
    }
  );

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    console.log("channel", channel);
    channel.publish("chatMessage", { msg: text });
    setText("");
  };

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
          overflowY: "auto",
          maxHeight: "540px",
          mt: 1,
          "::-webkit-scrollbar": {
            width: 0,
            background: "transparent",
          },
          "::-webkit-scrollbar-thumb": {
            background: "transparent",
          },
          scrollbarWidth: "none",
        }}
      >
        {messages?.map((message, key) => (
          <Message username={message.username} msg={message.msg} key={key} />
        ))}
      </MDBox>

      <MDBox>
        <Grid container p={1}>
          <Grid item xs={12} mt={1}>
            <MDBox sx={{ display: "flex" }}>
              <MDInput
                required
                multiline
                type="text"
                variant="standard"
                name="chatText"
                value={text}
                onFocus={() => {
                  if (text === "Type something...") setText("");
                }}
                onChange={(e) => setText(e.target.value)}
                autoComplete="chatText"
                onKeyDown={handleKeyPressed}
                fullWidth
              />
              <IconButton sx={navbarIconButton} size="small" onClick={handleSendMessage}>
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
