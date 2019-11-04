import React from "react";
import { Card, Transition, Grid, Image, Button } from "semantic-ui-react";
import "./Carousel.css";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      elements: []
    };
  }

  componentDidMount() {
    // initial the elements array
    const { info } = this.props;
    let infoArray = [];
    infoArray = info.map((i, index) => {
      return {
        render: () => (
          <Grid className="elemnets_grid" columns="equal" stackable key={index}>
            <Grid.Row textAlign="left">
              <Grid.Column width={8} style={{ paddingTop: "50px" }}>
                <span>
                  {i.text &&
                    i.text
                      .split(". ")
                      .map((text, index) => <p key={index}>{text}</p>)}
                </span>
              </Grid.Column>
              {i.profile &&
                i.profile.map((src, index) => (
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
        )
      };
    });
    this.setState({ elements: infoArray });
  }

  nextClicked() {
    const { elements } = this.state;
    if (elements.length > 1) {
      this.setState({
        currentIndex: (this.state.currentIndex + 1) % elements.length
      });
    }
  }
  prevClicked() {
    const { elements } = this.state;
    if (elements.length > 1) {
      this.setState({
        currentIndex:
          (this.state.currentIndex - 1) % elements.length < 0
            ? elements.length - 1
            : (this.state.currentIndex - 1) % elements.length
      });
    }
  }

  render() {
    const { currentIndex, elements } = this.state;
    return elements.length > 0 ? (
      <div>
        <Card fluid className="carousel-container">
          <Card.Content className="carousel">
            {elements.map((element, index) =>
              currentIndex === index ? (
                <Transition
                  key={`index_${+new Date()}`}
                  animation="scale"
                  duration={500}
                  transitionOnMount={true}
                  visible={true}
                >
                  {element.render()}
                </Transition>
              ) : null
            )}
          </Card.Content>
        </Card>

        {elements.length > 1 ? (
          <div style={{ float: "right" }}>
            <Button
              basic
              inverted
              className="prev"
              onClick={() => this.prevClicked()}
              icon="caret left"
            />
            <Button
              basic
              inverted
              className="next"
              onClick={() => this.nextClicked()}
              icon="caret right"
            />
          </div>
        ) : null}
      </div>
    ) : null;
  }
}

export default Carousel;
