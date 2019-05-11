import React from 'react';
import {
  Platform,
  Image,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  ImageEditor,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {Camera, Permissions, ImagePicker} from 'expo';

import styles from '../styles/styles' ;


export default class TrainMe extends React.Component {

  constructor(props) {
    super(props);


    let sData = '';

    this.state = {
      photo: null,
      name: "",
      hasCameraPermission: null,
      showUploadButton: false
    };

    this._pickImage = this._pickImage.bind(this);
    this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
    this.handleNameInputChanged = this.handleNameInputChanged.bind(this);
    this.handleBackButtonClicked = this.handleBackButtonClicked.bind(this);
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
    // alert('in 22222');

    let _this = this;
    data.append("file", {
      name: /*photo.fileName*/_this.state.name,
      type: photo.type + '.jpg',
      uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", ""),
    });

    return data;
  };

  handleUploadPhoto = () => {
    let _this = this;

    fetch("https://hot-octopus-46.localtunnel.me/uploadtraining", {
      method: "POST",
      body: _this.createFormData(_this.state.photo),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log("ggggg", response);
        if (response.status == 200) {
          alert(response["_bodyText"]);
          this.setState({
            name: "",
            photo: null,
            showUploadButton: false
          });
        } else {
          return response.json();
        }
      })
      .catch(error => {
        console.log("upload error", error);
      });

  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1
    });
    console.log(result);

    if (!result.cancelled) {
        let resizedUri = await new Promise((resolve, reject) => {
            ImageEditor.cropImage(result.uri,
                {
                    offset: { x: 0, y: 0 },
                    size: { width: result.width, height: result.height },
                    displaySize: { width: 50, height: 50 },
                    resizeMode: 'contain',
                },
                (uri) => resolve(uri),
                () => reject(),
            );
        })
            .catch(error => {
                console.log("resize error", error);
            });

        if (!result.fileName) {
        let aTemp = result.uri.split('/');
        result.fileName = aTemp[aTemp.length - 1];
      }
      console.log('dfshgdf');
      this.setState({
        photo: result,
        showUploadButton: !!this.state.name
      });
    }

  };

  _pickImageC = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1
    });
    console.log(result);

    if (!result.cancelled) {

      let resizedUri = await new Promise((resolve, reject) => {
        ImageEditor.cropImage(result.uri,
          {
            offset: {x: 0, y: 0},
            size: {width: result.width, height: result.height},
            displaySize: {width: 50, height: 50},
            resizeMode: 'contain',
          },
          (uri) => resolve(uri),
          () => reject(),
        );
      }).catch(error => {
          console.log("resize error", error);
        });

      if (!result.fileName) {
        let aTemp = result.uri.split('/');
        result.fileName = aTemp[aTemp.length - 1];
      }

      this.setState({
        photo: result,
        showUploadButton: !!this.state.name
      });
    }

  };

  handleNameInputChanged(name){
    if(!!name){
      let bShowUploadButton = !!this.state.photo;
      this.setState({
        name: name,
        showUploadButton: bShowUploadButton
      });
    }else {
      this.setState({
        name: name
      });
    }
  }

  handleBackButtonClicked(){
    this.props.fBackButtonClick();
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

        <Text style={styles.nameLabelText}>Enter Name of student: </Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.handleNameInputChanged}
          value={this.state.name}
        />

        {oUploadButton}


        <TouchableOpacity activeOpacity={.5} style={styles.backButtonImage} onPress={this.handleBackButtonClicked}>
          <Image source={require('../../assets/images/go-back-64.png')}/>
        </TouchableOpacity>

      </View>
    );
  }


}

