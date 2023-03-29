import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import myImage from "../Images/my-logo.png";
import { Container } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";
import Stack from "@mui/material/Stack";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
function Hero() {
  return (
    <div>
      <Container width="100%">
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "10vh" }}
        >
          <Card
            sx={{ display: "flex", backgroundColor: "#0C0F11" }}
            elevation={0}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                sx={{ width: "20vh", borderRadius: "100px" }}
                image={myImage}
                alt="Live from space album cover"
              />
            </Box>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                <span style={{ color: "white", fontFamily: "Fira Code" }}>
                  {" "}
                  Hey, I'm Wasim.
                </span>
                <span style={{ color: "lightgray", fontFamily: "Fira Code" }}>
                  I'm a full stack developer.
                </span>
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="h5"
              >
                <span style={{ color: "lightgray", fontFamily: "Fira Code" }}>
                  {" "}
                  I am a highly motivated with a passion for building innovative
                  web applications.
                </span>

                {/* Social Handles Section */}

                <div style={{ color: "lightgrey", marginTop: "3vh" }}>
                  <Stack direction="row" spacing={2}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <GitHubIcon />{" "}
                      <a
                        href="https://github.com/mdwasimaslam"
                        style={{ textDecoration: "none", color: "lightgrey" }}
                      >
                        <span>Github</span>
                      </a>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <LinkedInIcon sx={{ color: "#2966BC" }} />{" "}
                      <span>LinkedIn</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <YouTubeIcon sx={{ color: "#ff433d" }} />{" "}
                      <span>Youtube</span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 7 }}
                    >
                      <EmailIcon sx={{ color: "#26A1D6" }} />{" "}
                      <span>Contact</span>
                    </div>
                  </Stack>
                </div>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
}

export default Hero;
