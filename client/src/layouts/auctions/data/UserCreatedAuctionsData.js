/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// @mui material components
import Icon from "@mui/material/Icon";

// Code Pulse React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import MDBadge from "components/MDBadge";
import { Button, IconButton } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import { useMaterialUIController } from "context";
import { useNavigate } from "react-router-dom";

export default function UserCreatedAuctionsData(myAuctions) {
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, darkMode } = controller;
  const navigate = useNavigate();
  const Project = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" variant="rounded" /> */}
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const LiveStatus = () => (
    <MDBox ml={-1}>
      <MDBadge badgeContent="Live" color="success" variant="gradient" size="sm" />
    </MDBox>
  );

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = darkMode ? white.main : dark.main;

      if (transparentNavbar) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return {
    columns: [
      { Header: "Auction Title", accessor: "project", width: "70%", align: "left" },
      { Header: "Start Time", accessor: "budget", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        project: <Project name="Asana" />,
        budget: <LiveStatus />,
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            working
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        action: (
          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={() => {
              navigate(`/liveAuction`, {
                // state: { data: { deal: deal, sender: "creator" } },
              });
            }}
          >
            Enter
          </Button>
        ),
      },
      {
        project: <Project name="Asana" />,
        budget: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            working
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        action: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <IconButton
              sx={navbarIconButton}
              size="small"
              onClick={() => {
                navigate(`/auctionDetail`, {
                  // state: { data: { deal: deal, sender: "creator" } },
                });
              }}
            >
              <Icon sx={iconsStyle}>info</Icon>
            </IconButton>
            <IconButton sx={navbarIconButton} size="small">
              <Icon sx={iconsStyle}>delete</Icon>
            </IconButton>
          </MDBox>
        ),
      },
      // {
      //   project: <Project image={logoGithub} name="Github" />,
      //   budget: (
      //     <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
      //       $5,000
      //     </MDTypography>
      //   ),
      //   status: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       done
      //     </MDTypography>
      //   ),
      //   completion: <Progress color="success" value={100} />,
      //   action: (
      //     <MDTypography component="a" href="#" color="text">
      //       <Icon>more_vert</Icon>
      //     </MDTypography>
      //   ),
      // },
      // {
      //   project: <Project image={logoAtlassian} name="Atlassian" />,
      //   budget: (
      //     <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
      //       $3,400
      //     </MDTypography>
      //   ),
      //   status: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       canceled
      //     </MDTypography>
      //   ),
      //   completion: <Progress color="error" value={30} />,
      //   action: (
      //     <MDTypography component="a" href="#" color="text">
      //       <Icon>more_vert</Icon>
      //     </MDTypography>
      //   ),
      // },
      // {
      //   project: <Project image={logoSpotify} name="Spotify" />,
      //   budget: (
      //     <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
      //       $14,000
      //     </MDTypography>
      //   ),
      //   status: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       working
      //     </MDTypography>
      //   ),
      //   completion: <Progress color="info" value={80} />,
      //   action: (
      //     <MDTypography component="a" href="#" color="text">
      //       <Icon>more_vert</Icon>
      //     </MDTypography>
      //   ),
      // },
      // {
      //   project: <Project image={logoSlack} name="Slack" />,
      //   budget: (
      //     <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
      //       $1,000
      //     </MDTypography>
      //   ),
      //   status: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       canceled
      //     </MDTypography>
      //   ),
      //   completion: <Progress color="error" value={0} />,
      //   action: (
      //     <MDTypography component="a" href="#" color="text">
      //       <Icon>more_vert</Icon>
      //     </MDTypography>
      //   ),
      // },
      // {
      //   project: <Project image={logoInvesion} name="Invesion" />,
      //   budget: (
      //     <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
      //       $2,300
      //     </MDTypography>
      //   ),
      //   status: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       done
      //     </MDTypography>
      //   ),
      //   completion: <Progress color="success" value={100} />,
      //   action: (
      //     <MDTypography component="a" href="#" color="text">
      //       <Icon>more_vert</Icon>
      //     </MDTypography>
      //   ),
      // },
    ],
  };
}
