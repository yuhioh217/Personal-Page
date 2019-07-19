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

const data = [
  {
    id: "japan",
    color: "hsl(112, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 52
      },
      {
        x: "helicopter",
        y: 217
      },
      {
        x: "boat",
        y: 157
      },
      {
        x: "train",
        y: 288
      },
      {
        x: "subway",
        y: 238
      },
      {
        x: "bus",
        y: 74
      },
      {
        x: "car",
        y: 242
      },
      {
        x: "moto",
        y: 175
      },
      {
        x: "bicycle",
        y: 50
      },
      {
        x: "horse",
        y: 223
      },
      {
        x: "skateboard",
        y: 73
      },
      {
        x: "others",
        y: 13
      }
    ]
  },
  {
    id: "france",
    color: "hsl(311, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 120
      },
      {
        x: "helicopter",
        y: 0
      },
      {
        x: "boat",
        y: 55
      },
      {
        x: "train",
        y: 132
      },
      {
        x: "subway",
        y: 49
      },
      {
        x: "bus",
        y: 190
      },
      {
        x: "car",
        y: 169
      },
      {
        x: "moto",
        y: 217
      },
      {
        x: "bicycle",
        y: 156
      },
      {
        x: "horse",
        y: 230
      },
      {
        x: "skateboard",
        y: 83
      },
      {
        x: "others",
        y: 10
      }
    ]
  },
  {
    id: "us",
    color: "hsl(144, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 254
      },
      {
        x: "helicopter",
        y: 108
      },
      {
        x: "boat",
        y: 229
      },
      {
        x: "train",
        y: 104
      },
      {
        x: "subway",
        y: 153
      },
      {
        x: "bus",
        y: 122
      },
      {
        x: "car",
        y: 127
      },
      {
        x: "moto",
        y: 289
      },
      {
        x: "bicycle",
        y: 221
      },
      {
        x: "horse",
        y: 186
      },
      {
        x: "skateboard",
        y: 296
      },
      {
        x: "others",
        y: 8
      }
    ]
  },
  {
    id: "germany",
    color: "hsl(128, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 77
      },
      {
        x: "helicopter",
        y: 207
      },
      {
        x: "boat",
        y: 68
      },
      {
        x: "train",
        y: 51
      },
      {
        x: "subway",
        y: 68
      },
      {
        x: "bus",
        y: 269
      },
      {
        x: "car",
        y: 253
      },
      {
        x: "moto",
        y: 286
      },
      {
        x: "bicycle",
        y: 102
      },
      {
        x: "horse",
        y: 25
      },
      {
        x: "skateboard",
        y: 105
      },
      {
        x: "others",
        y: 259
      }
    ]
  },
  {
    id: "norway",
    color: "hsl(282, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 118
      },
      {
        x: "helicopter",
        y: 225
      },
      {
        x: "boat",
        y: 14
      },
      {
        x: "train",
        y: 291
      },
      {
        x: "subway",
        y: 159
      },
      {
        x: "bus",
        y: 183
      },
      {
        x: "car",
        y: 288
      },
      {
        x: "moto",
        y: 124
      },
      {
        x: "bicycle",
        y: 68
      },
      {
        x: "horse",
        y: 125
      },
      {
        x: "skateboard",
        y: 119
      },
      {
        x: "others",
        y: 179
      }
    ]
  }
];

class MobileContainer extends React.Component {
  state = {
    sidebarOpened: false,
    fixed: false,
    window: {
      height: 0,
      width: 0
    },
    data: data
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
