import React, { Component } from 'react';
import {View, StyleSheet, Dimensions, TouchableHighlight, Image, Text, BackHandler } from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { setPin } from '../actions';
import { IconButton } from './common'

class CameraRoute extends Component {
  constructor(props) {
    super(props);
    
    this.state = { path:'',
                  cameraView:'front',
                  cameraViewIcon: 'camera-rear',
                  cameraFlash: 'Camera.constants.FlashMode.auto',
                  cameraFlashIcon: 'flash-auto',
                  currentFlashValue: 0,
                  backPress:false,
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height,
                  };
    this.uploadImage = this.uploadImage.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.switchFlash = this.switchFlash.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
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

switchCamera(){
            if(this.state.cameraView === 'front') {
                  this.setState({cameraViewIcon: 'camera-front', cameraView: 'back'})
          } else{
            this.setState({cameraViewIcon: 'camera-rear', cameraView: 'front'})
          }
}

switchFlash(){
            flash=[ 'Camera.constants.FlashMode.on', 
                    'Camera.constants.FlashMode.off', 
                    'Camera.constants.FlashMode.auto' 
                  ];
            flashIcon=[ 'flash-on', 'flash-off', 'flash-auto' ];

        switch(this.state.currentFlashValue){
            case 0:
                this.setState({
                  cameraFlash: flash[0],
                  cameraFlashIcon: flashIcon[0],
                  currentFlashValue: 1
                });
              break;
            case 1:
                this.setState({
                  cameraFlash: flash[1],
                  cameraFlashIcon: flashIcon[1],
                  currentFlashValue: 2
                });
              break;
            case 2:
                this.setState({
                  cameraFlash: flash[2],
                  cameraFlashIcon: flashIcon[2],
                  currentFlashValue: 0
                });
              break;

        }
}

uploadImage = (uri = this.state.path, mime = 'image/pjpeg') => {
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob
      const joinPin = this.props.selectedPin

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
    
    const styles = {
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
                    bottomCenter: {
                      position: 'absolute',
                      bottom: 40,
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                      borderWidth: 5,
                      borderColor: '#FFF',
                      backgroundColor: 'transparent'
                    },
                    cameraOptions: {
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      alignSelf: 'flex-end',
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      backgroundColor: 'transparent'
                    },
                    cameraOptionSpacing: {
                      paddingTop: 20,
                      backgroundColor: 'transparent'
                    },
                    topLeft: {
                      position: 'absolute',
                      top: 40,
                      left: 20,
                      backgroundColor: 'transparent'
                    },
                    topRight: {
                      position: 'absolute',
                      top: 40,
                      right: 20,
                      backgroundColor: 'transparent'
                    },
                    bottomLeft: {
                      position: 'absolute',
                      bottom: 40,
                      left: 50,
                      backgroundColor: 'transparent'
                    }
                };

          let contents = (!this.state.path) ?
                                                <Camera
                                                  ref={(cam) => { this.camera = cam; }}
                                                  style={styles.preview}
                                                  type={this.state.cameraView}
                                                  captureMode={Camera.constants.CaptureMode.still}
                                                  aspect={Camera.constants.Aspect.fill}
                                                  captureTarget={Camera.constants.CaptureTarget.temp}
                                                  orientation="auto"
                                                  flashMode={ this.state.cameraFlash }   
                                                >
                                              
                                                      <IconButton  
                                                              buttonStyle={styles.topLeft}
                                                              onpress={ () => Actions.pop() }
                                                              name="arrow-back" 
                                                              size={40}
                                                              color="#fff"
                                                              />

                                                  <View style={ styles.cameraOptions }>

                                                    <IconButton  
                                                              buttonStyle={ styles.cameraOptionSpacing }
                                                              onpress={ this.switchCamera }
                                                              name= { this.state.cameraViewIcon }
                                                              size={40}
                                                              color="#fff"
                                                              />

                                                        <IconButton  
                                                              buttonStyle={ styles.cameraOptionSpacing }
                                                              onpress={ this.switchFlash }
                                                              name= { this.state.cameraFlashIcon }
                                                              size={40}
                                                              color="#fff"
                                                              />

                                                  </View>

                                                      <IconButton  
                                                              buttonStyle={ styles.bottomLeft }
                                                              onpress={ () => Actions.Gallery() }
                                                              name= 'photo-library'
                                                              size={40}
                                                              color="#fff"
                                                              />

                                                      <TouchableHighlight
                                                              style={styles.bottomCenter}
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
                                                <IconButton  
                                                        buttonStyle={ styles.topLeft }
                                                        onpress={ () => this.setState({ path: '' }) }
                                                        name= 'clear'
                                                        size={40}
                                                        color="#fff"
                                                        />
                                                <IconButton  
                                                        buttonStyle={ styles.topRight }
                                                        onpress={ ()=> this.uploadImage() }
                                                        name= 'save'
                                                        size={40}
                                                        color="#fff"
                                                        />

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
const mapStateToProps = state => {
          
        const selectedPin = state.fetchedImages.selectedPin.joinPin

          return{ selectedPin };
        };

export default connect(mapStateToProps, { setPin }) (CameraRoute)
