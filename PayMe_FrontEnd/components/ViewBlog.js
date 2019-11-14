import React, { PureComponent } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  ToastAndroid
} from "react-native";
import PropTypes from "prop-types";

class ViewPost extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  static propTypes = {
    componentId: PropTypes.string
  };
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "skyblue"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  getBody(title) {
    return fetch(
      "https://arcane-brook-03009.herokuapp.com/rest/blog/blog_body/",
      {
        method: "POST",
        headers: {
          "User-Agent": "PostmanRuntime/7.19.0",
          "Accept": "*/*",
          "Cache-Control": "no-cache",
          "Postman-Token":
            "fe58428a-2f41-4c23-94f3-da7be5f4dd77,144b2860-25ed-4db5-81fb-3aee82e13e14",
          "Host": "arcane-brook-03009.herokuapp.com",
          "Accept-Encoding": "gzip, deflate",
          "Content-Length": "0",
          "Connection": "keep-alive",
          "cache-control": "no-cache"
        },
        body: JSON.stringify({
          title: title
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.result.Body
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  deleteBlog(title) {
    return fetch("https://arcane-brook-03009.herokuapp.com/rest/blog/delete/", {
      method: "POST",

      headers: {
        "User-Agent": "PostmanRuntime/7.19.0",
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Postman-Token":
          "fe58428a-2f41-4c23-94f3-da7be5f4dd77,144b2860-25ed-4db5-81fb-3aee82e13e14",
        "Host": "arcane-brook-03009.herokuapp.com",
        "Accept-Encoding": "gzip, deflate",
        "Content-Length": "0",
        "Connection": "keep-alive",
        "cache-control": "no-cache"
      },

      body: JSON.stringify({
        title: title
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.result.Body
          },
          function() {
            ToastAndroid.showWithGravityAndOffset(
              "Deleted Blog Successfully",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    const title = this.props.navigation.getParam("title", "NO-ID");
    this.getBody(title);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.blogBody}>{this.state.dataSource}</Text>
        <View style={styles.deleteBlog}>
          <Button
            title="Delete Blog"
            color="#d11a2a"
            onPress={() => {
              this.deleteBlog(title);

              this.props.navigation.goBack();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    color: "blue",
    padding: 10,
    fontSize: 18,
    height: 44
  },
  blogCard: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 8,
    fontSize: 17,
    borderBottomWidth: 0.5,
    borderBottomColor: "#21212150",
    backgroundColor: "#ffffff",
    marginBottom: 5
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    paddingLeft: 5
  },
  blogBody: {
    fontSize: 18,
    paddingLeft: 5
  },
  deleteBlog: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});
export default ViewPost;
