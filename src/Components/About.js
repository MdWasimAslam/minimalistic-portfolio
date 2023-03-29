import { Box, Container, Divider } from "@mui/material";
import React from "react";

function About() {
  return (
    <div>

      <Container width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: "10vh",
            color: "lightgrey",
          }}
        >      
{/* <Divider variant="middle" style={{backgroundColor:"white"}} /> */}
          <div>
            <h3>About Me</h3>
          </div>

          <div>
            <p>
              Throughout my programming journey, I have worked on numerous projects, both
              independently and as part of a team. My
              portfolio showcases a selection of my work, demonstrating my
              ability to design and develop visually appealing, user-friendly,
              and functional web applications. I am excited to continue learning
              and exploring new technologies in the field of web development,
              and I am always eager to collaborate on challenging and exciting
              projects. Thank you for taking the time to explore my portfolio.
            </p>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default About;
