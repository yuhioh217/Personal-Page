import React from "react";
import { List, Grid, Popup, Image, Segment, Header } from "semantic-ui-react";
import firebase from "../../../firebase";

class AboutMe extends React.Component {
  state = {
    homeRef: firebase.database().ref("HomePage"),
    aboutMe: []
  };

  componentDidMount() {
    const { homeRef } = this.state;
    let loadAboutMe = [];
    homeRef.child("aboutme").on("child_added", snap => {
      loadAboutMe.push(snap.val());
      console.log(snap.val());
      this.setState({
        aboutMe: loadAboutMe
      });
    });
  }

  render() {
    const { aboutMe } = this.state;
    return (
      aboutMe.length > 0 && (
        <Segment
          id="aboutme"
          basic
          style={{ padding: "13em 0 5em 0" }}
          vertical
        >
          {aboutMe.map((info, index) => (
            <Grid container stackable verticalAlign="middle" key={index}>
              <Grid.Row>
                <Grid.Column floated="left" width={4}>
                  <Popup
                    trigger={
                      <Image
                        bordered
                        rounded
                        size="medium"
                        src={info.imageUrl}
                      />
                    }
                  >
                    <Popup.Content>{info.imageInfo}</Popup.Content>
                  </Popup>
                </Grid.Column>
                <Grid.Column width={10}>
                  <span>
                    <Header as="h3" style={{ fontSize: "2em" }}>
                      {info.title}
                    </Header>
                    <List style={{ fontSize: "1.33em" }}>
                      <List.Item>
                        <List.Content>
                          <List.Description
                            style={{
                              fontSize: "16px",
                              fontFamily: `"librebaskerville-regular", sans-serif`,
                              color: "#6E7881"
                            }}
                          >
                            {info.description.split(". ").map((line, index) => (
                              <p key={index}>{`${line}.`}</p>
                            ))}
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    </List>
                    <Header as="h3" style={{ fontSize: "1.7em" }}>
                      Contact me
                    </Header>
                    <List style={{ fontSize: "1.33em" }}>
                      <List.Item>
                        <List.Content>
                          <List.Description
                            style={{
                              fontSize: "16px",
                              fontFamily: `"librebaskerville-regular", sans-serif`,
                              color: "#6E7881"
                            }}
                          >
                            <p>Email: yuhioh217@gmail.com</p>
                            <p>Phone: +886-912312896</p>
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    </List>
                  </span>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ))}
        </Segment>
      )
    );
  }
}

export default AboutMe;
