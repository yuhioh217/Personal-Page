import React from "react";
import { Container, Header, Icon, Grid, Segment } from "semantic-ui-react";

class HomeHeading extends React.Component {
  state = {
    mobile: this.props.mobile ? this.props.mobile : null
  };

  render() {
    const { mobile } = this.state;
    return (
      <Container text className="homeheading">
        <Header
          as="h1"
          inverted
          style={{
            fontSize: mobile ? "2em" : "4em",
            fontWeight: "normal",
            marginBottom: 0,
            marginTop: mobile ? "1.5em" : "3em"
          }}
        >
          <Header.Content>Welcome to KE Resume</Header.Content>
        </Header>
        <Header
          as="h2"
          inverted
          style={{
            fontSize: mobile ? "1.5em" : "1.7em",
            fontWeight: "normal",
            marginTop: mobile ? "0.5em" : "1.5em"
          }}
        >
          <Header.Content>
            <Icon name="code" />
            In here, you can find info about KE
          </Header.Content>
        </Header>

        <Segment
          inverted
          style={{
            marginTop: mobile ? "2.5em" : "8em"
          }}
        >
          <Grid columns={2} stackable textAlign="center" divided inverted>
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header icon inverted>
                  <a href="#aboutme">
                    <Icon name="world" inverted />
                    About Me
                  </a>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon inverted>
                  <a href="#skills">
                    <Icon name="search" inverted />
                    Find My Skills
                  </a>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

export default HomeHeading;
