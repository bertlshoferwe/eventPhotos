import React, { Component } from 'react';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ListView, Image,Dimensions, BackHandler, ToastAndroid, View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { eventsFetch } from '../actions';
import { Card, CardSection, Button, Spinner, IconButton, Header } from './common';
import ListItem from './listItems/currentListItem';

class CurrentEvent extends Component {
        constructor(props) {
          super(props);
          
              this.state = { 
                            backPress:false,
                            isOptionsVisible: false,
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                            floatingButtombottom: 40,
                            floatingOptionbottom: 170
                          };

              this.setOptionsVisible = this.setOptionsVisible.bind(this);
              this.handleBackButton = this.handleBackButton.bind(this);
              this.onLayout = this.onLayout.bind(this);
        }



        componentWillMount() {
                          const joinPin = this.props.joinedEvent
                          this.props.eventsFetch();
                          this.createDataSource(this.props);
                          
                          
                        }


        componentDidMount() {
                        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
                    }

        handleBackButton() {
                            if(!this.state.backPress) {
                                      ToastAndroid.show('Back again to exit', ToastAndroid.SHORT);
                                      this.setState({backPress:true});
                                        setTimeout(() => {
                                        this.setState({backPress:false});
                                      },2500)
                                    return true;;
                              } else {
                                    BackHandler.exitApp()
                                      return false;
                          };
                      };

        componentWillReceiveProps(nextProps) {
                                  this.createDataSource(nextProps);
                                }



        createDataSource({ joinedEvent }) {
                          const ds = new ListView.DataSource({
                            rowHasChanged: (r1, r2) => r1 !== r2
                          });

                          this.dataSource = ds.cloneWithRows(joinedEvent);
                        }


        renderRow(joinedEvent) {
                          return <ListItem joinedEvents={joinedEvent} />;
                        }


        setOptionsVisible( isOptionsVisible ){
                          this.setState({ isOptionsVisible: !this.state.isOptionsVisible });
                      }               
        onLayout(e) {
                    this.setState({
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height,
                    });
                  }

render() {  
        const styles = {
                        cardStyle:{
                            height:this.state.height-100,
                            width: this.state.width-20,
                            zIndex: -1,
                          },
                          imageSection:{
                            flex: 1,
                            alignItems: "stretch"
                          },
                          Image:{
                            flex: 1,
                          },
                          backgroundImage: {
                            flex:1,
                            backgroundColor: '#c7c8ca',
                            width: this.state.width, 
                            height: this.state.height,
                            backgroundColor:'#009389'
                          },
                          background: {
                            paddingTop: 0,
                            alignItems: 'center',
                          },
                          loadingCardStyle: {
                            width: 70,
                            height: 70,
                            borderRadius: 10,
                            backgroundColor: '#fff'
                          },
                          floatingButtonStyle:{
                            right: 20,
                            bottom: this.state.floatingButtombottom,
                            position: 'absolute',
                          },
                          optionStyle:{
                            zIndex:1,
                            right: 20,
                            bottom: this.state.floatingOptionbottom,
                            width: 200,
                            height:150,
                            position: 'absolute',
                            flexDirection: 'column',
                            borderColor: 'rgba(52, 52, 52, 0.0)',
                            backgroundColor: 'rgba(52, 52, 52, 0.0)'
                          },
                          floatingoption:{
                            paddingTop:10,
                            borderRadius: 30,
                          },
                          floatingText:{
                            fontSize: 16,
                            color: '#000',
                            textAlign:'right',
                            fontWeight: '900',
                          }, 
                        }

        const renderListItems = (this.props.joinedEvent.length > 0)?
                                                  <ListView
                                                      enableEmptySections
                                                      dataSource={this.dataSource}
                                                      renderRow={this.renderRow}
                                                    /> 
                                                  
                                             :    
                                                  
                                                  <Card  style={styles.cardStyle} >
                                                      <CardSection style={styles.imageSection}>
                                                        <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={styles.Image}/>
                                                      </CardSection>
                                                  </Card>  
                                              ;                                         


          const renderList = (this.props.loading) ? 
                                          <Card style={ styles.loadingCardStyle }>
                                              <Spinner size="large" />
                                          </Card>
                                          :
                                            
                                            <View>
                                                {renderListItems}

                                              </View>  
                                            ;   
          
          const floatingIconButton   =  <IconButton  
                                                buttonStyle={styles.floatingButtonStyle}
                                                onpress={ this.setOptionsVisible }
                                                name="blur-on" 
                                                size={40}
                                                />                 

          const floatingButtonOptions = (!this.state.isOptionsVisible) ? 
                                              <View/>
                                              :
                                                  <Card style={styles.optionStyle}>

                                                        <Button onPress={ () => Actions.CreateEvent( this.setOptionsVisible() ) } 
                                                          buttonStyle={styles.floatingoption}
                                                          textStyle={styles.floatingText}
                                                          >Create Event</Button>

                                                        <Button onPress={ () => Actions.JoinEvent( this.setOptionsVisible() ) } 
                                                          buttonStyle={styles.floatingoption}
                                                          textStyle={styles.floatingText}
                                                          >Join Event</Button>

                                                        <Button onPress={ () => firebase.auth().signOut() } 
                                                          buttonStyle={styles.floatingoption}
                                                          textStyle={styles.floatingText}
                                                          >Logout</Button>

                                                  </Card>
                                                      
                                                ;                                
                                                                                                                               
return (

          <View 
              onLayout={this.onLayout}
              style={ styles.backgroundImage }
            >
            <Header headerText='Your Events' />
            
           <View style={ styles.background }> 

                      {floatingButtonOptions}
                
                      {renderList}
          </View>            
            {floatingIconButton}
        </View>    
          );
        }
      }
        
        

        const mapStateToProps = state => {
          const loading = state.joinedEvent.loading;
          const joinedEvent = _.map(state.joinedEvent.listItems, (val, uid) => { 
            return { ...val, uid };
          });          

          return{ joinedEvent, loading };
        };

export default connect(mapStateToProps, { eventsFetch })(CurrentEvent);