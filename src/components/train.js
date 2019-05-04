import React from 'react';
import {
  Platform,
  Image,
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import {Camera, Permissions, ImagePicker} from 'expo';

import styles from '../styles/styles' ;


export default class TrainMe extends React.Component {

  constructor(props) {
    super(props);


    let sData = '';

    this.state = {
      photo: null,
      hasCameraPermission: null,
      visible: false,
      data: sData,
      showUploadResp: null,
      showUploadButton: false
    };

    this._pickImage = this._pickImage.bind(this);
    this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
  }


  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    const res = await Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL)
    ]);
  }


  createFormData(photo) {
    let data = new FormData();
    alert('in 22222');

    data.append("image", {
      name: photo.fileName,
      type: photo.type + '.jpg',
      uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", ""),
    });

    return data;
  };

  handleUploadPhoto = () => {
    let _this = this;

    fetch("https://quick-panther-42.localtunnel.me/uploadtraining", {
      method: "POST",
      body: _this.createFormData(_this.state.photo),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log("ggggg", response);
        alert('in 1');
        return response.json();
      })
      .then(response => {
        console.log("upload succes", response);
        // alert('in 2');
        this.setState({
          showUploadResp: response,
          showUploadButton: false
        });
      })
      .catch(error => {
        // alert('in error');

        console.log("upload error", error);
      });

    /*fetch("https://quick-panther-42.localtunnel.me/")
      .then(response => {
        console.log("ggggg", response);
        alert('in 1'+ response);
        return response.json();
      })
      .then(response => {
        console.log("upload succes", response);
        alert('in 333333');
        this.setState({
          showUploadResp: response,
          showUploadButton: false
        });
      })
      .catch(error => {
        // alert('in error');

        console.log("upload error", error);
      });*/
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1
    });
    console.log(result);

    if (!result.cancelled) {
      if (!result.fileName) {
        let aTemp = result.uri.split('/');
        result.fileName = aTemp[aTemp.length - 1];
      }
      this.setState({
        photo: result,
        showUploadButton: true
      });
    }

  };

  _pickImageC = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1
    });
    console.log(result);

    if (!result.cancelled) {
      if (!result.fileName) {
        let aTemp = result.uri.split('/');
        result.fileName = aTemp[aTemp.length - 1];
      }
      this.setState({
        photo: result,
        showUploadButton: true
      });
    }

  };

  GetCards = () => {
    let oRespData = this.state.showUploadResp;

    let aCaptions = [];
    if (Object.keys(oRespData).length) {
      for (let sKey in oRespData) {
        aCaptions.push(
          <View style={styles.captionLineWrapper}>
            <Text style={styles.captionLine}>{oRespData[sKey]}</Text>
          </View>);
      }
    } else {
      aCaptions.push(<Text>Please try again...</Text>);
    }

    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {aCaptions}
      </ScrollView>
    )
  }

  getImageBlockView() {
    let photo = this.state.photo;

    return (
      <View>
        {!!photo ? <Image resizeMode={'cover'} source={{uri: photo.uri}} style={styles.myImage}/> :
          <Image source={require('../../assets/images/icons8-picture-480.png')} style={styles.myImage}/>

        }
      </View>);
  }

  render() {
    const {hasCameraPermission} = this.state;
    if (hasCameraPermission === null) {
      return <View/>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    let oUploadButton = this.state.showUploadButton ? <View style={styles.buttonWrapper}>
        <TouchableHighlight style={styles.resetButton} onPress={this.handleUploadPhoto}>
          <Text style={styles.resetText}>Upload</Text>
        </TouchableHighlight>
      </View>
      : null;


    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Face Recognition</Text>
        <View style={styles.buttonWrapper}>
          <TouchableHighlight style={styles.resetButton} onPress={this._pickImage}>
            <Text style={styles.resetText}>Pick an image from camera roll</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableHighlight style={styles.resetButton} onPress={this._pickImageC}>
            <Text style={styles.resetText}>Click a photo from Camera</Text>
          </TouchableHighlight>
        </View>

        {this.getImageBlockView()}

        {oUploadButton}
      </View>
    );
  }


}

