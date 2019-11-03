import React from "react";
import { Modal, Grid, Image } from "semantic-ui-react";
import firebase from "../../../firebase";
import Carousel from "./Carousel";
class SkillModal extends React.Component {
  state = {
    skillRef: firebase.database().ref("HomePage"),
    skillInfo: [],
    skillLoading: false,
    elements: []
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
        <Carousel info={s.info} />
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
