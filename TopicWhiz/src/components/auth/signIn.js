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
      email: '',
      password:'',
      result: ''
    })
  },
  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if(user) {
        console.log('user',user);
        this.props.navigator.push({name:'topics'})
      }
    })
  },
  signIn() {
    console.log('method');
    let {email, password} = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
      console.log('error',error.message);
      this.setState({result: error.message});
    })
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
        <TouchableOpacity style={styles.buttonContainer}
        onPress={() => { this.signIn() }}
        >
          <Text style={styles.button}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.links}>
          <TouchableOpacity
            onPress={() => {
            this.props.navigator.push({name:'forgotPassword'})
            }}>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigator.push({name:'signUp'})
            }}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
})
