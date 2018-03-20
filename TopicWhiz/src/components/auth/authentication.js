import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCHfZiZ4uQ8n8-8JgOJhUa6NK59fIfcCJM",
  authDomain: "topicwhiz-3af1f.firebaseapp.com",
  databaseURL: "https://topicwhiz-3af1f.firebaseio.com",
  projectId: "topicwhiz-3af1f",
  storageBucket: "topicwhiz-3af1f.appspot.com",
  messagingSenderId: "264726829355"
};

export const firebaseApp = firebase.initializeApp(config);
export const topicsRef = firebase.database().ref();
