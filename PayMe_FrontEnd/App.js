import React, { Component } from "react";
import {
  TouchableOpacity,
  FlatList,
  View,
  ActivityIndicator,
  SectionList,
  Linking,
  StyleSheet,
  Text,
  Alert
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import PostsList from "./components/BlogsList";
import ViewPost from "./components/ViewBlog";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator(
  {
    PostsList: {
      screen: PostsList
    },
    ViewPost: {
      screen: ViewPost
    }
  },
  {
    initialRouteName: "PostsList"
  }
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
