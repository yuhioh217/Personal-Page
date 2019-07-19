import React from "react";
import { List, Grid, Popup, Image, Segment, Header } from "semantic-ui-react";
import firebase from "../../../firebase";

class Education extends React.Component {
  state = {
    homeRef: firebase.database().ref("HomePage"),
    education: []
  };

  componentDidMount() {
    const { homeRef } = this.state;
    let loadEducation = [];
    homeRef.child("education").on("child_added", snap => {
      loadEducation.push(snap.val());
      this.setState({
        education: loadEducation
      });
    });
  }

  setEducationList = data =>
    data.length > 0 && (
      <List style={{ fontSize: "1.5em", paddingTop: "1.33em" }}>
        {data.map((info, index) => (
          <List.Item
            key={index}
            style={{
              paddingBottom: "1em"
            }}
          >
            <List.Icon name="marker" />
            <List.Content>
              {/* Set university name to title */}
              <List.Header>
                {`${info.name}`}
                <i
                  style={{
                    paddingLeft: "20px",
                    fontSize: "16px",
                    color: "#AAAAAA"
                  }}
                >
                  {info.identity}
                </i>
              </List.Header>
              <List.Description
                style={{
                  fontSize: "0.8em",
                  padding: "0.5em 0",
                  color: "#AAAAAA"
                }}
              >{`${info.startdate} - ${info.enddate}`}</List.Description>
              <List.Description style={{ fontSize: "0.9em" }}>
                {info.content}
              </List.Description>
              <List.Description>
                <List>
                  {info.detail &&
                    info.detail.map((d, index) => (
                      <List.Item key={index}>
                        <List.Icon name="angle right" />
                        {/* Set university detail information */}
                        <List.Content key={index}>
                          <List.Header
                            style={{
                              fontSize: "0.8em",
                              fontWeight: 100
                            }}
                          >
                            {d.info}
                          </List.Header>
                        </List.Content>
                      </List.Item>
                    ))}
                </List>
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  render() {
    const { education } = this.state;
    return (
      education.length > 0 && (
        <Segment
          id="education"
          basic
          style={{ padding: "13em 0 5em 0" }}
          vertical
        >
          {education.map((info, index) => (
            <Grid container stackable verticalAlign="middle" key={index}>
              <Grid.Row>
                <Grid.Column width={10}>
                  <span>
                    <Header as="h3" style={{ fontSize: "2.33em" }}>
                      {info.title}
                    </Header>
                    {this.setEducationList(info.data)}
                  </span>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <Popup
                    trigger={<Image rounded size="huge" src={info.imageUrl} />}
                  >
                    <Popup.Content>{info.imageInfo}</Popup.Content>
                  </Popup>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ))}
        </Segment>
      )
    );
  }
}

export default Education;
