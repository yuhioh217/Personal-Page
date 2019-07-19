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

  futureSegment = () => {
    return (
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Breaking The Grid, Grabs Your Attention
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Instead of focusing on content creation and hard work, we have
            learned how to master the art of doing nothing by providing massive
            amounts of whitespace and generic content that can seem massive,
            monolithic and worth your attention.
          </p>
          <Button as="a" size="large">
            Read More
          </Button>
          <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: "3em 0em", textTransform: "uppercase" }}
          >
            <a href="">Case Studies</a>
          </Divider>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Did We Tell You About Our Bananas?
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Yes I know you probably disregarded the earlier boasts as
            non-sequitur filler content, but it's really true. It took years of
            gene splicing and combinatory DNA research, but our bananas can
            really dance.
          </p>
          <Button as="a" size="large">
            I'm Still Quite Interested
          </Button>
        </Container>
      </Segment>
    );
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
                  <p>Page are all made by ReactJS</p>
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
