import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, TouchableHighlight, Image, Text } from 'react-native';
import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';

class CameraRoute extends Component {
  constructor(props) {
    super(props);
    
    this.state = { path:'' };

    this.uploadImage = this.uploadImage.bind(this);
    this.takePicture = this.takePicture.bind(this);

  }


uploadImage = (uri, mime = 'image/pjpeg') => {

  const fs = RNFetchBlob.fs;


  return new Promise((resolve, reject) => {
        let uploadBlob = null;

    const uploadUri = uri.replace('file://', '') 
    const sessionId = new Date().getTime()
    const imageRef = firebase.storage().ref('/Events/12345').child(`${sessionId}`)

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
        firebase.database().ref(`Created_Events/12345/images/`)
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
        this.setState({ path:data.path })
      })
      .catch(err => console.error(err));
  }


  render() {
        console.log(joinedEvent.joinPin)
        let contents;

        if(this.state.path) {
                                  contents = <Camera
                                                  ref={(cam) => { this.camera = cam; }}
                                                  style={styles.preview}
                                                  aspect={Camera.constants.Aspect.fill}
                                                  captureTarget={Camera.constants.CaptureTarget.disk}
                                                >
                                                      <TouchableHighlight
                                                        style={styles.capture}
                                                        onPress={this.takePicture }
                                                        underlayColor="rgba(255, 255, 255, 0.5)"
                                                      >
                                                        <View />
                                                      </TouchableHighlight>
                                                </Camera>
                              } else {
                                            <View>
                                                <Image
                                                  source={{ uri: this.state.path }}
                                                  style={styles.preview}
                                                />
                                                <Text
                                                  style={styles.cancel}
                                                  onPress={() => this.setState({ path:null })}
                                                >Cancel
                                                </Text>
                                                <Text
                                                  style={ styles.send }
                                                  onPress={()=> this.uploadImage()}>
                                                  Save
                                                </Text>  
                                              </View>

                                       }



    return (
      <View style={styles.container}>
        { contents }
      </View>
    );
  }
};

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
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
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

export default CameraRoute; 
