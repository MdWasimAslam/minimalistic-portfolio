import { Avatar, Box, Container } from "@mui/material";
import React from "react";

function Skill() {
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
          <div>
            <h3>Skills</h3>
          </div>

          <div style={{display:"flex" ,gap:"1vw"}}>
          <Avatar alt="skill-tech"   sx={{ width: 56, height: 56 }} src="https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/html5-512.png" />
          <Avatar alt="skill-tech"   sx={{ width: 56, height: 56 }} src="https://cdn1.iconfinder.com/data/icons/social-media-logos-7/64/css-3-512.png" />
          <Avatar alt="skill-tech"   sx={{ width: 56, height: 56 }} src="https://ih1.redbubble.net/image.815350031.4911/st,small,507x507-pad,600x600,f8f8f8.u1.jpg" />
          <Avatar alt="skill-tech"   sx={{ width: 56, height: 56 }} src="http://stickertimes.com/wp-content/uploads/2022/04/Star-1.png" />
          <Avatar alt="skill-tech"   sx={{ width: 56, height: 56 }} src="https://icon-library.com/images/node-js-icon/node-js-icon-8.jpg" />
          <Avatar alt="skill-tech"   sx={{ width: 56, height: 56 }} src="https://redant.com.au/assets/uploads/2019/mysql.png" />
          <Avatar alt="skill-tech"   sx={{ width: 56, height: 56 }} src="https://www.svgviewer.dev/static-svgs/34566/mongodb.svg" />
          <Avatar alt="skill-tech"   sx={{ width: 56, height: 56 }} src="https://img.icons8.com/color/512/java-web-token.png" />
          <Avatar alt="skill-tech"   sx={{ width: 56, height: 56 }} src="https://mui.com/static/logo.png" />
          <Avatar alt="skill-tech"   sx={{ width: 56, height: 56 }} src="https://cdn.icon-icons.com/icons2/2407/PNG/512/azure_icon_146223.png" />


          </div>
        </Box>
      </Container>
    </div>
  );
}

export default Skill;
