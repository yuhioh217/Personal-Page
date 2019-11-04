import React from "react";
import { Segment, Grid, Header, Container, List } from "semantic-ui-react";
import firebase from "../../../firebase";

class Experience extends React.Component {
  state = {
    ref: firebase.database().ref("HomePage"),
    experience: []
  };

  componentDidMount() {
    const { ref } = this.state;
    let tempExp = [];
    ref.child("experience").on("child_added", snap => {
      tempExp.push(snap.val());
      this.setState({ experience: tempExp });
    });
  }

  setWorkContent = content =>
    content.map((c, index) => (
      <List.Item key={index} style={{ padding: "0.5em 0" }}>
        <List.Icon name="angle right" />
        <List.Content>
          <List.Description>{c.info}</List.Description>
        </List.Content>
      </List.Item>
    ));

  setWorkExperience = () => {
    const { experience } = this.state;

    return (
      experience.length > 0 &&
      experience.map((exp, index) => (
        <Container key={index} style={{ marginBottom: "30px" }}>
          <Header
            style={{ fontSize: "1.5em" }}
          >{`${exp.company},  ${exp.country}`}</Header>
          {exp.title !== "" ? (
            <p>
              <i
                style={{
                  fontSize: "1em",
                  fontFamily: `"librebaskerville-regular", sans-serif`,
                  color: "#AAAAAA"
                }}
              >
                {`${exp.title},  ${exp.startdate} - ${exp.enddate} (${exp.identity})`}
              </i>
            </p>
          ) : null}
          {exp.content.length > 0 && (
            <List>{this.setWorkContent(exp.content)}</List>
          )}
        </Container>
      ))
    );
  };

  render() {
    return (
      <Segment
        id="experience"
        basic
        style={{ padding: "7em 5em 5em 5em" }}
        vertical
      >
        <Grid
          celled="internally"
          columns="equal"
          stackable
          style={{ fontSize: "1.33em" }}
        >
          <Grid.Row>
            <Grid.Column width={4} textAlign="center">
              <div className="experience__title">
                <h1>
                  <span>Experiences</span>
                </h1>
              </div>
            </Grid.Column>
            <Grid.Column width={12} textAlign="left">
              {this.setWorkExperience()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default Experience;
