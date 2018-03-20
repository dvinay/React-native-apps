import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  AsyncStorage
} from 'react-native';

var createReactClass = require('create-react-class');

module.exports = createReactClass({
  getInitialState() {
    return ({
      tasks: ['To do 1','To do 2'],
      completedTask: [],
      task:''
    })
  },

  componentWillMount() {
    AsyncStorage.getItem('tasks')
      .then((response) => {
        if(response) return this.setState({tasks: JSON.parse(response)})
        return []
      });
    AsyncStorage.getItem('completedTask')
      .then((response) => {
        if(response) this.setState({completedTask:JSON.parse(response)})
        return []
      });
  },

  componentDidUpdate() {
    this.setStorage();
  },

  setStorage() {
    AsyncStorage.setItem('tasks',JSON.stringify(this.state.tasks));
    AsyncStorage.setItem('completedTask',JSON.stringify(this.state.completedTask));
  },

  renderList(tasks) {
    return (
      tasks.map((task, index) => {
        return(
          <View key={task} style = {styles.task}>
            <Text>
              {task}
            </Text>
            <TouchableOpacity
              onPress = {() => this.completeTask(index)}
            >
              <Text>
                &#10003;
              </Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  },

  renderCompleted(tasks) {
    return (
      tasks.map((task,index) => {
        return(
          <View key={task} style = {styles.task}>
            <Text style = {styles.completed}>
              {task}
            </Text>
            <TouchableOpacity
            onPress = {() => this.deleteTask(index)}>
              <Text>
                &#10005;
              </Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  },

  addTask() {
    let tasks = this.state.tasks.concat([this.state.task]);
    this.setState({tasks});
  },

  completeTask(index) {
    let tasks = this.state.tasks;
    tasks = tasks.slice(0, index).concat(tasks.slice(index+1));

    let completedTask = this.state.completedTask;
    completedTask = completedTask.concat(this.state.tasks[index]);

    this.setState({
      tasks,
      completedTask
    });
  },

  deleteTask(index) {
    let completedTask = this.state.completedTask;
    completedTask = completedTask.slice(0, index).concat(completedTask.slice(index+1));
    this.setState({
      completedTask
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.header}>
          To Do Master
        </Text>
        <TextInput
          style = {styles.input}
          placeholder='Add a Task..'
          onChangeText={(text) => {
            this.setState({task: text});
          }}
          onEndEditing={() => this.addTask()}
        />
        <ScrollView>
          {this.renderList(this.state.tasks)}
          {this.renderCompleted(this.state.completedTask)}
        </ScrollView>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    margin: 30,
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18
  },
  task: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF'
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    textAlign: 'center',
    margin: 10,
  },
  completed: {
    color: '#555',
    textDecorationLine: 'line-through'
  }
});
