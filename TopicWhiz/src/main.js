import React from 'react';
import {
  Navigator,
} from 'react-native';

var createReactClass = require('create-react-class');

import signIn from './components/auth/signIn';
import signUp from './components/auth/signUp';
import forgotPassword from './components/auth/forgotPassword';
import chooseName from './components/auth/chooseName';

import topics from './components/topics';
import topicDetail from './components/topic-detail';

import NavigationExperimental from 'react-native-deprecated-custom-components';

const routes = {
  signIn,
  signUp,
  forgotPassword,
  topics,
  chooseName,
  topicDetail
}
module.exports = createReactClass({
  render() {
    return (
      <NavigationExperimental.Navigator
        initialRoute={{name: 'signIn'}}
        renderScene={this.renderScene}
        configureScene={ () => { return NavigationExperimental.Navigator.SceneConfigs.FloatFromRight; } }
      />
    )
  },

  renderScene(route, navigator) {
    let Component = routes[route.name];

    let {displayName,title,author,row_uid} = route;
    return(
      <Component
        navigator={navigator}
        displayName={displayName}
        title={title}
        author={author}
        row_uid={row_uid}
      />
    )
  }
})
