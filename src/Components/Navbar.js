import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Navbar() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#0C0F11" }} elevation={0}>
          <Toolbar sx={{ margin: "2% 20%" }}>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, fontFamily: "Fira Code" }}
            >
              Md Wasim Aslam
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontFamily: "Fira Code", marginRight: "1.5vw" }}
            >
              <a href="#skills" style={{color:"white",textDecoration:"none"}}>Skills</a>
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontFamily: "Fira Code", marginRight: "1.5vw" }}
            >
                            <a href="#projects" style={{color:"white",textDecoration:"none"}}>Projects</a>

            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontFamily: "Fira Code", marginRight: "1.5vw" }}
            >
                                          <a href="#experience" style={{color:"white",textDecoration:"none"}}>Experience</a>

            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
