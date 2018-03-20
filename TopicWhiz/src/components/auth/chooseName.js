import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

var createReactClass = require('create-react-class');

import {firebaseApp} from './authentication';
import styles from '../../styles';

module.exports = createReactClass({
  getInitialState() {
    return ({
     name: '',
    })
  },
  updateDisplayName() {
    let user = firebaseApp.auth().currentUser;
    user.updateProfile({
      displayName: this.state.name
    }).then(() => {
      this.props.navigator.push({name:'topics'})
    })
  },
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>
          Choose a display name
        </Text>
        <TextInput
          placeholder='display name'
          style={styles.input}
          onChangeText={(text) => this.setState({name: text})}
        />
        <TouchableOpacity style={styles.buttonContainer}
          onPress={() => { this.updateDisplayName() }} >
          <Text style={styles.button}>Confirm</Text>
        </TouchableOpacity>
      </View>
    )
  }
})
