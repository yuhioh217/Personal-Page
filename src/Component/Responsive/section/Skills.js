import React from "react";
import { Segment, Grid, Header, Icon } from "semantic-ui-react";
import _ from "lodash";
import SkillModal from "./SkillModal";
import SkillBar from "./SkillBar";
import SideInfoMenu from "./SideInfoMenu";

class Skills extends React.Component {
  state = {
    skillSelect: "",
    skillModal: false,
    //SideInfoMenu
    animation: "overlay",
    direction: "right",
    dimmed: false,
    visible: false
  };

  openSkillModal = skill => {
    this.setState({
      skillSelect: skill,
      skillModal: true
    });
  };

  closeSkillModal = () => {
    this.setState({
      skillModal: false
    });
  };

  setSideMenuVisible = (skill, visible) =>
    this.setState({ skillSelect: skill, visible: visible });

  render() {
    const { skillModal, skillSelect, animation, visible } = this.state;
    return (
      <Segment
        id="skills"
        basic
        style={{ padding: "7em 5em 5em 5em" }}
        vertical
      >
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header
                as="h3"
                style={{ fontSize: "2.33em", paddingBottom: "1em" }}
              >
                Main Skills
              </Header>
              <Grid
                celled="internally"
                columns="equal"
                stackable
                style={{ fontSize: "1.33em" }}
              >
                <Grid.Row textAlign="center">
                  {_.map(
                    ["Node.js", "Python", "React.js", "Android", "AWS"],
                    (src, index) => (
                      <Grid.Column
                        key={index}
                        className="home__skill"
                        onClick={() => this.openSkillModal(src)}
                      >
                        <Icon
                          className="home__skillicon"
                          name={src.split(".")[0].toLowerCase()}
                        />{" "}
                        {src}
                      </Grid.Column>
                    )
                  )}
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row textAlign="center" className="skills__bar">
            <Grid.Column width={4}>
              <div className="program_skill">
                <h1>
                  <span>Program Skills</span>
                </h1>
              </div>
            </Grid.Column>
            <Grid.Column width={12}>
              <SideInfoMenu
                animation={animation}
                visible={visible}
                skill={skillSelect}
                setVisible={this.setSideMenuVisible}
              >
                <SkillBar
                  skills={[
                    "JavaScript,80",
                    "Python,75",
                    "Java,65",
                    "C,60",
                    "C++,60"
                  ]}
                  setVisible={this.setSideMenuVisible}
                />
              </SideInfoMenu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <SkillModal
          skillSelect={skillSelect}
          modal={skillModal}
          closeModal={this.closeSkillModal}
        />
      </Segment>
    );
  }
}

export default Skills;
