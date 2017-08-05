import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, BackHandler, ToastAndroid, Dimensions, Image, ListView } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { IconButton } from './common';
import { setPin, galleryFetch } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import ListItem from './listItems/galleryListItem';
import { Card, Spinner } from './common'

class Gallery extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      backPress:false,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
                        };
    this.handleBackButton = this.handleBackButton.bind(this)
    this.onLayout = this.onLayout.bind(this);

  }

  componentWillMount() {
            const joinPin = this.props.selectedPin
            this.props.galleryFetch({joinPin});
            this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
            this.createDataSource(nextProps);
  }

  createDataSource({ fetchedImages }) {
            const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
            });

            this.dataSource = ds.cloneWithRows(fetchedImages);
  }            
renderRow(fetchedImages) {
                          return <ListItem fetchedImage={fetchedImages} 
                                            />;
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


  render() {
    const styles = {
                    backgroundImage: {
                      flex:1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: this.state.width, 
                      height: this.state.height,
                      backgroundColor:'#009389'
                    },
                    listPosition: {
                      marginTop: 100,
                    },
                    list: {
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        paddingLeft: 20,
                        paddingRight: 10,
                    },
                    loadingCardStyle: {
                        width: 70,
                        height: 70,
                        borderRadius: 10,
                        backgroundColor: '#fff'
                    },
                    topLeft: {
                      position: 'absolute',
                      top: 40,
                      left: 20,
                      backgroundColor: 'transparent'
                    }
                  };
console.log(this.props.loading)
     const renderList = (this.props.loading) ? 
                                          <Card style={ styles.loadingCardStyle }>
                                              <Spinner size="large" />
                                          </Card>
                                          :
                                          <View style={styles.listPosition}>
                                            <ListView
                                                enableEmptySections
                                                contentContainerStyle={styles.list}
                                                dataSource={this.dataSource}
                                                renderRow={this.renderRow}
                                            /> 
                                           </View> 
                                            ; 

    return (

      <View 
          onLayout={this.onLayout}
          style={ styles.backgroundImage }
          >

          <IconButton  
              buttonStyle={ styles.topLeft }
              onpress={ () => Actions.pop() }
              name="arrow-back" 
              color='#fff'
              size={40}
              /> 

              {renderList} 
            
                
          </View>  
    );
  }
}

const mapStateToProps = state => {
          const loading = state.fetchedImages.loading;
          const selectedPin = state.fetchedImages.selectedPin.joinPin
          const fetchedImages =  _.map(state.fetchedImages.listItems, (val, uid) => { 
            return { ...val, uid };
          });

          return{ fetchedImages, loading, selectedPin };
        };

export default connect(mapStateToProps, { setPin, galleryFetch })(Gallery);