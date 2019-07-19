import React from "react";
import { Link } from "react-router-dom";
import {
  Responsive,
  Segment,
  Visibility,
  Menu,
  Container,
  Button
} from "semantic-ui-react";
import _ from "lodash";
import firebase from "../../firebase";
import HomeHeading from "./HomeHeading";
import HomeContent from "./HomeContent";

class DesktopContainer extends React.Component {
  state = {
    fixed: false,
    activeItem: "home",
    window: {
      height: 0,
      width: 0
    }
  };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  setAuthMenuItem = (user, activeItem) =>
    user
      ? _.map(["Edit", "Test"], (src, index) => (
          <Menu.Item
            name={src.toLowerCase()}
            as="a"
            key={index}
            active={activeItem === src.toLowerCase()}
            onClick={this.handleItemClick}
          >
            {src}
          </Menu.Item>
        ))
      : null;

  handleItemClick = (event, { name }) => this.setState({ activeItem: name });

  handleSignout = () => {
    // this.props.setLoading(true);
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out");
        window.location.reload();
      });
  };

  updateDimension = () => {
    this.setState({
      window: {
        height: window.innerHeight,
        width: window.innerWidth
      }
    });
  };

  componentWillMount = () => {
    this.updateDimension();
  };

  componentDidMount = () => {
    return window.addEventListener("resize", this.updateDimension);
  };

  render() {
    const { fixed, activeItem, window } = this.state;
    const { currentUser } = this.props;
    return (
      <div>
        <Responsive
          getWidth={this.props.getWidth}
          minWidth={Responsive.onlyTablet.minWidth}
        >
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              id="home"
              inverted
              textAlign="center"
              style={{ minHeight: window.height, padding: "1em 0em" }}
              vertical
            >
              <Menu
                fixed={fixed ? "top" : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size="large"
              >
                <Container>
                  <Menu.Item
                    name="home"
                    as="a"
                    href="#home"
                    //active={activeItem === "home"}
                    onClick={this.handleItemClick}
                  >
                    Home
                  </Menu.Item>
                  <Menu.Item
                    name="aboutme"
                    as="a"
                    href="#aboutme"
                    //active={activeItem === "aboutme"}
                    onClick={this.handleItemClick}
                  >
                    AboutMe
                  </Menu.Item>
                  <Menu.Item
                    name="skills"
                    as="a"
                    href="#skills"
                    //active={activeItem === "skills"}
                    onClick={this.handleItemClick}
                  >
                    Skills
                  </Menu.Item>
                  <Menu.Item
                    name="experience"
                    as="a"
                    href="#experience"
                    //active={activeItem === "education"}
                    onClick={this.handleItemClick}
                  >
                    Experience
                  </Menu.Item>
                  <Menu.Item
                    name="education"
                    as="a"
                    href="#education"
                    //active={activeItem === "education"}
                    onClick={this.handleItemClick}
                  >
                    Education
                  </Menu.Item>
                  {this.setAuthMenuItem(currentUser, activeItem)}
                  {!currentUser ? (
                    <Menu.Item position="right">
                      <Button as={Link} inverted={!fixed} to="/Login">
                        Login
                      </Button>
                    </Menu.Item>
                  ) : (
                    <Menu.Item position="right">
                      <Button
                        as="a"
                        inverted={!fixed}
                        onClick={this.handleSignout}
                      >
                        Logout
                      </Button>
                    </Menu.Item>
                  )}
                </Container>
              </Menu>
              <HomeHeading />
            </Segment>
          </Visibility>
          {/* Page */}
          <HomeContent />
        </Responsive>
      </div>
    );
  }
}

export default DesktopContainer;
