import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 200
  },
  button: {
    padding: 5
  },
  buttonWrapper:{
    width: 300,
    height: 40,
    marginTop: 10,
    marginLeft: -100

  },
  headerText: {
    fontSize: 40,
    marginTop: -100,
    marginBottom: 50
  },
  myImage:{
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20
  },
  scrollContainer:{
    padding: 20,
    height: 300
  },
  captionLineWrapper:{
    borderBottomColor: '#80808066',
    borderBottomWidth: 1,
  },
  captionLine:{
    fontSize:18,
    margin: 5,
    fontFamily: 'Times New Roman'
  },
  resetButton: {
    width: 300,
    height: 40,
    backgroundColor: '#3d2963',
    borderRadius: 5,
    marginLeft: 50,
    marginRight: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  resetText:{
    color: '#ffffff',
    fontSize: 15,
    fontWeight: "bold"
  }
});

