import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import {firebaseApp} from './authentication';
import styles from '../../styles';

var createReactClass = require('create-react-class');

module.exports = createReactClass({
  getInitialState() {
    return ({
      email: ''
    })
  },
  changePassword() {
    firebaseApp.auth().sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({result: 'Password reset sent successfully.'})
      }, (error) => {
        this.setState({result: error.message})
      })
  },
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.feedback}>{this.state.result}</Text>
        <TextInput
          placeholder='Email'
          style={styles.input}
          onChangeText={(text) => this.setState({email: text})}
        />
        <View style={styles.links}>
          <TouchableOpacity
            onPress={() => this.props.navigator.pop()}
          >
            <Text style={styles.link}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.changePassword()}
          >
            <Text style={styles.link}>Send Reset Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
})
