import { StyleSheet } from 'react-native';

const blue = '#90caf9';
const navy = '#1a237e';
const white = '#fff';
const black = '#000';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: blue
  },
  input: {
    height: 50,
    backgroundColor: white,
    borderColor: black,
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
    textAlign: 'center'
  },
  buttonContainer: {
    height: 50,
    backgroundColor: white,
    justifyContent: 'center',
    borderColor: black,
    borderWidth: 1,
    borderRadius: 5,
    margin: 2,
  },
  button: {
    backgroundColor: white,
    textAlign: 'center'
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  link: {
    color: navy,
  },
  feedback: {
    textAlign: 'center'
  },

  flexContainer: {
    flex: 1,
    backgroundColor: blue
  },
  header:{
    marginTop: 20,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    flex: 24,
    paddingRight: 20,
    paddingLeft: 20,
  },
  title:{
    textAlign: 'center'
  },

  list:{
    flex: 1,
  },
  row: {
    alignItems: 'center',
    backgroundColor: white,
    borderColor:black,
    borderWidth:1,
    borderRadius:5,
    margin:2,
    padding:10
  },
  rowTitle: {
    fontWeight: 'bold'
  },

  detailtitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  detailsubtitle: {
    textAlign: 'center',
    fontSize: 14
  }
})
