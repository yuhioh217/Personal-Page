import React from "react";
import { withRouter } from "react-router-dom";

const withRouterInnerRef = WrappedComponent => {
  class InnerComponentWithRef extends React.Component {
    render() {
      const { forwardRef, ...rest } = this.props;
      return <WrappedComponent {...rest} ref={forwardRef} />;
    }
  }

  const InnerComponentWithRefHTMLTag = withRouter(InnerComponentWithRef, {
    withRef: true
  });

  return React.forwardRef((props, ref) => (
    <InnerComponentWithRefHTMLTag {...props} forwardRef={ref} />
  ));
};

export default withRouterInnerRef;
