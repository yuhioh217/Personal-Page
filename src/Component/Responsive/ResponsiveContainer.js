import React from "react";
import { Responsive } from "semantic-ui-react";

import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const ResponsiveContainer = ({ children, currentUser }) => (
  <div>
    <DesktopContainer getWidth={getWidth} currentUser={currentUser}>
      {children}
    </DesktopContainer>
    <MobileContainer getWidth={getWidth} currentUser={currentUser}>
      {children}
    </MobileContainer>
  </div>
);

export default ResponsiveContainer;
