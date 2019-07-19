import React from "react";
import { Modal, Grid, Image } from "semantic-ui-react";
import firebase from "../../../firebase";

class SkillModal extends React.Component {
  state = {
    skillRef: firebase.database().ref("HomePage"),
    skillInfo: [],
    skillLoading: false
  };

  componentDidMount() {
    const { skillRef } = this.state;
    this.setListeners(skillRef);
  }

  setListeners = ref => {
    let loadskill = [];
    ref.child("skill").on("child_added", snap => {
      loadskill.push(snap.val());
      this.setState({
        skillInfo: loadskill,
        skillLoading: false
      });
    });
  };

  setModalContent = skill =>
    skill &&
    this.state.skillInfo.map((s, index) =>
      s.title.toLowerCase() === skill.toLowerCase() ? (
        <Grid
          columns="equal"
          stackable
          style={{ fontSize: "1.33em" }}
          key={index}
        >
          <Grid.Row textAlign="left">
            <Grid.Column width={8}>
              <span>
                {s.info &&
                  s.info
                    .split(". ")
                    .map((text, index) => <p key={index}>{text}</p>)}
              </span>
            </Grid.Column>
            {s.profile &&
              s.profile.map((src, index) => (
                <Grid.Column key={index}>
                  <Image
                    src={src.image}
                    floated="right"
                    bordered
                    rounded
                    size="massive"
                  />
                </Grid.Column>
              ))}
          </Grid.Row>
        </Grid>
      ) : null
    );

  render() {
    const { modal, closeModal, skillSelect } = this.props;
    return (
      <Modal
        basic
        open={modal}
        onClose={closeModal}
        closeIcon
        style={{ padding: "2em" }}
      >
        <Modal.Header>{skillSelect}</Modal.Header>
        <Modal.Content>{this.setModalContent(skillSelect)}</Modal.Content>
      </Modal>
    );
  }
}

export default SkillModal;
