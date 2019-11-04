import React from "react";
import {
  Segment,
  Grid,
  Header,
  Container,
  Button,
  Divider
} from "semantic-ui-react";
import AboutMe from "./section/AboutMe";
import Skills from "./section/Skills";
import Experience from "./section/Experience";
import Education from "./section/Education";

class HomeContent extends React.Component {
  state = {
    isLoding: false
  };

  render() {
    return (
      <span>
        <div style={{ height: "1px" }} />
        <AboutMe />
        <Divider style={{ margin: "0 5em" }} />
        <Skills />
        <Divider style={{ margin: "0 5em" }} />
        <Experience />
        <Divider style={{ margin: "0 5em" }} />
        <Education />
        <Segment inverted vertical style={{ padding: "5em 0em" }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h4" inverted>
                    Copyright ©2019 by KE Jiang
                  </Header>
                  <p>Page are all made by ReactJS with firebase and AWS</p>
                  <p>you can easily contact with me by phone: +886-912312896</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </span>
    );
  }
}

export default HomeContent;

// export default HomeContent;
