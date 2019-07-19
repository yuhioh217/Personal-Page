import React from "react";
import {
  Responsive,
  Sidebar,
  Menu,
  Segment,
  Icon,
  Container,
  Visibility
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import HomeHeading from "./HomeHeading";
import HomeContent from "./HomeContent";
import _ from "lodash";

class MobileContainer extends React.Component {
  state = {
    sidebarOpened: false,
    fixed: false,
    window: {
      height: 0,
      width: 0
    }
  };

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  setAuthMenuItem = user =>
    user
      ? _.map(["Edit", "Test"], (src, index) => (
          <Menu.Item name={src.toLowerCase()} as="a" key={index}>
            {src}
          </Menu.Item>
        ))
      : null;

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
    console.log("update dimension");
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
    const { sidebarOpened, fixed, window } = this.state;
    const { currentUser } = this.props;
    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={this.props.getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" href="#home">
            Home
          </Menu.Item>
          <Menu.Item as="a" href="#aboutme">
            About me
          </Menu.Item>
          <Menu.Item as="a" href="#skills">
            Skills
          </Menu.Item>
          <Menu.Item as="a" href="#experience">
            Experience
          </Menu.Item>
          <Menu.Item as="a" href="#education">
            Education
          </Menu.Item>

          {this.setAuthMenuItem(currentUser)}
          {!currentUser ? (
            <Menu.Item as={Link} to="/Login">
              Login
            </Menu.Item>
          ) : (
            <Menu.Item as="a" onClick={this.handleSignout}>
              Logout
            </Menu.Item>
          )}
        </Sidebar>
        <Sidebar.Pusher dimmed={sidebarOpened}>
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
              <Container>
                <Menu
                  fixed={fixed ? "top" : null}
                  inverted={!fixed}
                  pointing={!fixed}
                  secondary={!fixed}
                  size="large"
                >
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                </Menu>
              </Container>
              <HomeHeading mobile />
            </Segment>
          </Visibility>
          <HomeContent />
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

export default MobileContainer;
