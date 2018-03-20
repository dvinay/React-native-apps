import React, { Component } from 'react';
import {
  StyleSheet,
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
      email: '',
      password:'',
      confirmPassword:'',
      result: ''
    })
  },
  signUp() {
    if(this.state.password == this.state.confirmPassword) {
      let {email, password} = this.state;
      firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => this.setState({result: error.message}));
    } else {
      this.setState({result:'Password and Confirm Password must match.'})
    }
  },
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.feedback}>
          {this.state.result}
        </Text>
        <TextInput
          placeholder='Email'
          style={styles.input}
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          placeholder='Password'
          style={styles.input}
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry={true}
        />
        <TextInput
          placeholder='Confirm Password'
          style={styles.input}
          onChangeText={(text) => this.setState({confirmPassword: text})}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.buttonContainer}
        onPress={() => { this.signUp() }}
        >
          <Text style={styles.button}>Sing Up</Text>
        </TouchableOpacity>
        <View style={styles.links}>
          <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <Text style={styles.link}>Already a member</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
})
