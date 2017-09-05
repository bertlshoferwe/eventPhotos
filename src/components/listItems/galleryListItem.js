import React, { Component } from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { SelectedURL } from '../../actions';

class ListItem extends Component {
        constructor(props) {
            super(props);
            this.state = { 
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    selectedImage: this.props.fetchedImage.url
                };

            this.onLayout = this.onLayout.bind(this);
            this.onButtonPress = this.onButtonPress.bind(this)


          }

onLayout(e) {
              this.setState({
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              });
            }
onButtonPress() {
        const { selectedImage } = this.state
         this.props.SelectedURL({selectedImage})
         
}

  render() {
const styles = {
                  galleryLayout:{
                        marginTop: 5,
                        marginLeft: 2.5,
                        marginRight: 2.5,
                          height: this.state.height / 4,
                          width: this.state.width / 3 - 20,
                  },
                  Image:{
                          height: this.state.height / 4,
                          width: this.state.width / 3- 20,
                  },
                };
    
const { url } = this.props.fetchedImage;

    return (
      

            <View  onLayout={this.onLayout} style={styles.galleryLayout} >
                
                <TouchableOpacity onPress={ this.onButtonPress }>
                  <Image source={{uri: url }} 
                          style={styles.Image}
                          />
                </TouchableOpacity>
              </View>
         

    );
  }
}

const mapStateToProps = state => {
          
        const imageSelected = state.fetchedImages.imageSelected.url

          return{ imageSelected };
        };

export default connect(mapStateToProps, { SelectedURL }) (ListItem)