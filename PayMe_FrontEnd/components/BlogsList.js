import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SectionList,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import {YellowBox} from 'react-native';
import Icon from "react-native-vector-icons/Entypo";
class PostsList extends Component {
  static propTypes = {
    componentId: PropTypes.string
  };
  static navigationOptions = {
    title: "Blog",
    headerStyle: {
      backgroundColor: "skyblue"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      textAlign: "center",
      flex: 1
    }
  };
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      return fetch(
        "https://arcane-brook-03009.herokuapp.com/rest/blog/list_blog/",
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
          }
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              isLoading: false,
              dataSource: responseJson.result.Titles
            },
            function() {}
          );
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  render() {
    console.log("");
    YellowBox.ignoreWarnings(['Warning: Can']);
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 5, padding: 30 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SectionList
          sections={[{ data: this.state.dataSource }]}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.blog}
                onPress={() =>
                  this.props.navigation.navigate("ViewPost", { title: item })
                }
              >
                <Icon name="book" size={20} color="#111" />
                <Text style={styles.blogCard}>{item}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    color: "blue",
    padding: 10,
    fontSize: 18,
    height: 44
  },
  blogCard: {
    fontSize: 17,
    paddingLeft: 3
  },
  blog: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#21212150",
    backgroundColor: "#ffffff",
    marginBottom: 5
  }
});

export default PostsList;
