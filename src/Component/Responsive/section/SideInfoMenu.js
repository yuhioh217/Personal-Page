import React from "react";
import firebase from "../../../firebase";
import { Sidebar, Grid, Header, Segment } from "semantic-ui-react";

class VerticalSidebar extends React.Component {
  state = {
    skill: this.props.skill,
    ref: firebase.database().ref("HomePage"),
    skillArr: []
  };

  componentDidMount() {
    const { ref } = this.state;
    let tempArr = [];
    ref.child("codebar").on("child_added", snap => {
      tempArr.push(snap.val());
      this.setState({ skillArr: tempArr });
    });
  }

  getSkillInfo = skill => {
    const { skillArr } = this.state;
    const skillinfo = skillArr.reduce((acc, info) => {
      let a = "";
      if (info.title.toLowerCase() === skill.toLowerCase()) {
        a = a + info.description;
      }
      return acc.concat(a);
    }, "");
    console.log(skillinfo);
    return skillinfo;
  };

  render() {
    const { animation, visible, skill, setVisible } = this.props;
    return (
      <Sidebar
        inverted
        as={Segment}
        animation={animation}
        direction="right"
        icon="labeled"
        visible={visible}
        //width="thin"
        onHide={() => setVisible("", false)}
        style={{ padding: "0.7em", width: "30%" }}
      >
        {skill && (
          <Grid container stackable>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3" inverted>
                  {skill}
                </Header>
                <span style={{ margin: "2em 0" }}>
                  {this.getSkillInfo(skill)
                    .split(". ")
                    .map((line, index) => (
                      <p
                        key={index}
                        style={{
                          fontSize: "1.2em",
                          color: "#FFF",
                          overflow: "hidden",
                          textAlign: "left",
                          lineHeight: "2em"
                        }}
                      >
                        {line}
                      </p>
                    ))}
                </span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </Sidebar>
    );
  }
}

class SideInfoMenu extends React.Component {
  render() {
    const { animation, visible, skill, children, setVisible } = this.props;
    return (
      <Sidebar.Pushable>
        {window.innerWidth > 900 && (
          <VerticalSidebar
            animation={animation}
            visible={visible}
            skill={skill}
            setVisible={setVisible}
          />
        )}
        {children}
      </Sidebar.Pushable>
    );
  }
}

export default SideInfoMenu;
