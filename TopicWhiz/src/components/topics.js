import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ListView
} from 'react-native';

var createReactClass = require('create-react-class');
import styles from '../styles';
import {firebaseApp, topicsRef} from './auth/authentication';

const ds = new ListView.DataSource({rowHasChanged : (r1,r2) => r1 != r2});

module.exports = createReactClass({
  getInitialState() {
    return ({
     displayName: '',
     title: '',
     dataSource: ds.cloneWithRows([{
       title: 'Why sky is blue?',
       author: 'Test'
     }])
    })
  },
  details(data){
    this.props.navigator.push({
      name: 'topicDetail',
      displayName: this.state.displayName,
      title: data.title,
      author: data.author,
      row_uid: data.key
    })
  },
  renderRow(rowData){
    return(
      <TouchableOpacity style={styles.row}
       onPress= {() => this.details(rowData)} >
        <Text style={styles.rowTitle}>
          {rowData.title}
        </Text>
        <Text>
          {rowData.author}
        </Text>
      </TouchableOpacity>
    )
  },

  componentDidMount() {
    let user = firebaseApp.auth().currentUser;
    if(!user.displayName) {
      this.props.navigator.push({
        name: 'chooseName'
      })
    } else {
      this.setState({
        displayName: user.displayName
      })
    }
    this.listenForItems(topicsRef);
  },

  listenForItems(ref) {
    ref.on('value', (snap) => {
      let topics = [];
      snap.forEach(topic => {
        topics.push({
          title: topic.val().title,
          author: topic.val().author,
          key: topic.key
        })
      })
      this.setState({dataSource: ds.cloneWithRows(topics)})
    })
  },

  signOut() {
    firebaseApp.auth().signOut()
    .then(() => {
      this.props.navigator.popToTop();
    }, (error) => {
      console.log(error);
    })
  },
  addTopic() {
    topicsRef.push({
      title: this.state.title,
      author: this.state.displayName
    })
  },
  render() {
    return(
      <View style={styles.flexContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.links}
            onPress={() => { this.signOut() }}
          >
            <Text style={styles.links}> Sign out </Text>
          </TouchableOpacity>
          <Text style={styles.tite}> {this.state.displayName} </Text>
        </View>
        <View style={styles.body}>
        <TextInput
          placeholder='Something on your mind?'
          style={styles.input}
          onChangeText={(text) => this.setState({title: text})}
          onEndEditing={() => this.addTopic()}/>
        <ListView style={styles.list}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}>
        </ListView>
        <Text> Topic </Text>
        </View>
      </View>
    )
  }
})
