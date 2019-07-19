import React from "react";
import { connect } from "react-redux";
import ResponsiveContainer from "./Responsive/ResponsiveContainer";
import "./App.css";

const App = ({ currentUser }) => (
  <ResponsiveContainer currentUser={currentUser} />
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(App);
