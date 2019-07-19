import React from "react";

class SkillList extends React.Component {
  state = {
    style: {
      background: "#313131"
    }
  };

  handleMouseEnter = () => this.setState({ style: { background: "#666666" } });
  handleMouseLeave = () => this.setState({ style: { background: "#313131" } });

  render() {
    const { skill, percentage, index, setVisible } = this.props;
    return (
      <li
        key={index}
        onMouseEnter={() => {
          setVisible(skill, true);
          this.handleMouseEnter();
        }}
        onMouseLeave={() => {
          setVisible("", false);
          this.handleMouseLeave();
        }}
      >
        <span
          className={`bar-expand percentage${percentage}`}
          style={this.state.style}
        />
        <em>{skill}</em>
      </li>
    );
  }
}

class SkillBar extends React.Component {
  render() {
    const { skills, setVisible } = this.props;
    return (
      <div className="bars">
        <ul className="skills">
          {skills.map((skill, index) => (
            <SkillList
              key={index}
              skill={skill.split(",")[0]}
              percentage={skill.split(",")[1]}
              index={index}
              setVisible={setVisible}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default SkillBar;
