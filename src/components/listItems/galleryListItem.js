import React, { Component } from 'react';
import { Text, View, Dimensions, Image } from 'react-native';

class ListItem extends Component {
        constructor(props) {
            super(props);
            this.state = { 
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                };

            this.onLayout = this.onLayout.bind(this);

          }

onLayout(e) {
              this.setState({
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              });
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
console.log({url})
    return (
      

            <View  onLayout={this.onLayout} style={styles.galleryLayout} >
                
                  <Image source={{uri: url }} style={styles.Image}/>

              </View>
         

    );
  }
}


export default ListItem