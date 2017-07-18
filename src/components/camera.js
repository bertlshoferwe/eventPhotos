import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, TouchableHighlight, Image, Text, BackHandler, ToastAndroid } from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';

class CameraRoute extends Component {
  constructor(props) {
    super(props);
    
    this.state = { path:'',
                  camera:'front',
                  backPress:false,
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height,

                  };
    this.uploadImage = this.uploadImage.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this)
    this.onLayout = this.onLayout.bind(this);

  }

componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
        if(!this.state.backPress) {
                  Actions.pop()
                return true;;
          } 
  }
  onLayout(e) {
            this.setState({
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            });
          }

uploadImage = (uri = this.state.path, mime = 'image/pjpeg') => {
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob
      const joinPin = this.props.joinPin

  return new Promise((resolve, reject) => {
        const uploadUri = uri.replace('file://','') 
        const sessionId = new Date().getTime()
        let uploadBlob = null;
        const imageRef = firebase.storage().ref('/Events/'+joinPin).child(`${sessionId}`)
        fs.readFile(uploadUri, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
          })
          .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
          })
          .then((url) => {
            resolve(url)
            firebase.database().ref(`Created_Events/${joinPin}/images/`)
            .push({url})
            console.log(url)
          })
          .then(url => this.setState({ uploadURL: this.state.path }))
          .then(this.setState({path:null}))
          .catch(error => console.log(error))

  })
}


  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log(data);
        this.setState({ path:data.path})
      })
      .catch(err => console.error(err));
  }


  render() {

    const styles = StyleSheet.create({
          container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
          },
          preview: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: this.state.height,
            width: this.state.width
          },
          capture: {
            width: 70,
            height: 70,
            borderRadius: 35,
            borderWidth: 5,
            borderColor: '#FFF',
            marginBottom: 15,
          },
          cancel: {
            position: 'absolute',
            right: 20,
            top: 20,
            backgroundColor: 'transparent',
            color: '#FFF',
            fontWeight: '600',
            fontSize: 17,
          },
          send: {
            position: 'absolute',
            left: 20,
            top: 20,
            backgroundColor: 'transparent',
            color: '#FFF',
            fontWeight: '600',
            fontSize: 17,
          }
    });
          let contents = (!this.state.path) ?
                                                <Camera
                                                  ref={(cam) => { this.camera = cam; }}
                                                  style={styles.preview}
                                                  type={this.state.camera}
                                                  aspect={Camera.constants.Aspect.stretch}
                                                  captureTarget={Camera.constants.CaptureTarget.disk}
                                                  orientation="auto"
                                                >
                                                      <TouchableHighlight
                                                        style={styles.capture}
                                                        onPress={this.takePicture}
                                                        underlayColor="rgba(255, 255, 255, 0.5)"
                                                      >
                                                        <View />
                                                      </TouchableHighlight>
                                                </Camera>
                                    :
                                            <View>
                                                <Image
                                                  source={{ uri: this.state.path }}
                                                  style={styles.preview}
                                                />
                                                <Text
                                                  style={styles.cancel}
                                                  onPress={() => this.setState({ path: '' })}
                                                >Cancel
                                                </Text>
                                                <Text
                                                  style={ styles.send }
                                                  onPress={()=> this.uploadImage()}>
                                                  Save
                                                </Text>  
                                              </View>

                      



    return (
      <View 
          style={styles.container}
          onLayout={this.onLayout}
      >
        { contents }
      </View>
    );
  }
};

export default CameraRoute; 