import { Box, Container, Divider } from "@mui/material";
import React from "react";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
function Timeline() {
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
          id={"experience"}
        >      
{/* <Divider variant="middle" style={{backgroundColor:"white"}} /> */}
          <div>
            <h3>Experience</h3>
          </div>

          <div>
          <VerticalTimeline>

  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="Febraury 2022 - "
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    icon={<WorkIcon />}
    contentStyle={{ background: '#1E1E1E', color: '#fff' }}

  >
    <h3 className="vertical-timeline-element-title">Associate Developer</h3>
    <h4 className="vertical-timeline-element-subtitle">Kolkata</h4>
    <p>
      Cleared Talent
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2020 - 2022"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    icon={<SchoolIcon />}
    contentStyle={{ background: '#1E1E1E', color: '#fff' }}

  >
    <h3 className="vertical-timeline-element-title">Master of Computer Application</h3>
    <h4 className="vertical-timeline-element-subtitle">Post Graduation</h4>
    <p>
      University of Engineering and Management
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="2017 - 2020"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    icon={<SchoolIcon />}
    contentStyle={{ background: '#1E1E1E', color: '#fff' }}

  >
    <h3 className="vertical-timeline-element-title">Bachelor Of Computer Applications </h3>
    <h4 className="vertical-timeline-element-subtitle">Graduation</h4>
    <p>
    Techno India Institute of Technology
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="2015 - 2017"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    icon={<SchoolIcon />}
    contentStyle={{ background: '#1E1E1E', color: '#fff' }}
  >
    <h3 className="vertical-timeline-element-title">Bihar School Examination Board</h3>
    <h4 className="vertical-timeline-element-subtitle">Class XII</h4>
    <p>
          Chandra Shekhar Janta College, Gaya
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="2014 - 2015"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentStyle={{ background: '#1E1E1E', color: '#fff' }}
    icon={<SchoolIcon />}
  >
    <h3 className="vertical-timeline-element-title">Indian Certificate of Secondary Education.</h3>
    <h4 className="vertical-timeline-element-subtitle">Class X</h4>
    <p>
      Saifee Golden Jubliee English Public School, Kolkata
    </p>
  </VerticalTimelineElement>

</VerticalTimeline>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default Timeline;
