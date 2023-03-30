import { Box, Chip, Container, Divider } from "@mui/material";
import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Unstable_Grid2";

const projectList = require("../Components/ProjectList.js")

function Projects() {
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
          id={"projects"}
        >      
{/* <Divider variant="middle" style={{backgroundColor:"white"}} /> */}
          <div>
            <h3>Projects</h3>
          </div>

          <Box sx={{ flexGrow: 1,marginTop:"3vh" }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{gap:3.5}}
            >
          {projectList.map((value,index)=>{
            // console.log(value);
           return (
            <Card sx={{ maxWidth: 345 ,background:"#1E1E1E",color:"white"}} key={index}>
            <CardMedia
              sx={{ height: 140 }}
              image={value.img}
            />
            <CardContent >
              <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: 'Fira Code'}}>
              {value.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'Fira Code',color:"lightgrey"}}>
              {value.desc}
              </Typography>
                {
                    value?.tags?.map((value,index)=>{
                        return (
                            <Chip sx={{backgroundColor:"grey",marginTop:"3vh",marginRight:"5px"}} label={value} />
                        )
                    })
                }
            </CardContent>
            <CardActions>
              <Button size="small"><a href={value.link} target="_blank" style={{textDecoration:"none",color:"cyan"}}>See Live</a></Button>
              <Button size="small"><a href={value.github} style={{textDecoration:"none",color:"cyan"}}>Github Repo</a></Button>
            </CardActions>
          </Card>
           )
          })}
            </Grid>
            </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Projects;
