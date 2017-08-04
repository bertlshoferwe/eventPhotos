import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, Image, Dimensions } from 'react-native';
import { Actions} from 'react-native-router-flux';
import { Spinner, Card, CardSection } from './common';

class Splash extends Component {
            constructor(props) {
              super(props);
              this.state = { 

                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                                  };
              this.onLayout = this.onLayout.bind(this);

            }

  componentDidMount() {
                      firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                          Actions.main();
                        } else{
                            Actions.auth();
                        }
                      });
                    };

  onLayout(e) {
                this.setState({
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height,
                });
              }

  render() {

const styles = {
                backgroundImage: {
                      flex:1,
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: this.state.width, 
                      height: this.state.height,
                      backgroundColor:'#009389'
                    },
                cardStyle: {
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: 70,
                      height: 70,
                      backgroundColor:'#ece3a5',
                      borderRadius: 10,
                },
                cardSectionStyle:{
                      backgroundColor:'#ece3a5'
                },
              }

    return (
            <View
                  onLayout={this.onLayout} 
                  style={ styles.backgroundImage } >

                <Card style={ styles.cardStyle }>
                    <CardSection style={ styles.cardSectionStyle }>
                         <Spinner/>
                    </CardSection>
                </Card>   

           </View>
    );
  }
} 
    


  
export default Splash;
