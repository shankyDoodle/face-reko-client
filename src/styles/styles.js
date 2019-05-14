import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 200,
    position: "relative",
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
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 20
  },
  myImagePresent:{
    width: 250,
    height: 250,
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
  },
  nameLabelText:{
    color: 'gray',
    fontSize: 10,
  },
  nameInput: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  backButtonImage:{
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 100,
    // left: 25
  }
});

