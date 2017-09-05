import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, BackHandler, ToastAndroid, Dimensions, Image, ListView, Text } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { setPin, galleryFetch, SelectedURL, clearImage } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import ListItem from './listItems/galleryListItem';
import { Card, Spinner, Header, IconButton } from './common'

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
    this.clearImage =  this.clearImage.bind(this)

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

clearImage(){
  this.props.clearImage()

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
                      backgroundColor: '#c7c8ca',
                      width: this.state.width, 
                      height: this.state.height,
                      backgroundColor:'#009389'
                    },
                    background: {
                      paddingTop: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    imageSize: {
                      width: this.state.width,
                      height: this.state.height - 60
                    },
                    listPosition: {
                      marginTop: 0,
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
                      zIndex:1,
                      position: 'absolute',
                      top: 40,
                      left: 20,
                      backgroundColor: 'transparent'
                    }
                  };

      const renderView = ( this.props.length ) ?
                                                        <View style={ styles.background }>
                                                            
                                                            <IconButton  
                                                                buttonStyle={ styles.topLeft }
                                                                onpress={ this.clearImage }
                                                                name="close" 
                                                                color='#fff'
                                                                size={40}
                                                                />

                                                            <Image style={styles.imageSize} source={{uri: this.props.imageSelected.selectedImage }}  />

                                                        </View>
                                                        :
                                                          ( this.props.loading ) ? 
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
                                                      ;
                                          
    return (

      <View 
          onLayout={this.onLayout}
          style={ styles.backgroundImage }
          >

        <Header headerText='Gallery'
                onpress={ () => Actions.pop() }
                name="arrow-back" 
                size={35}/>

            { renderView }
              
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
          const imageSelected = state.fetchedImages.imageSelected;
          const length = state.fetchedImages.length;

          return{ fetchedImages, loading, selectedPin, imageSelected, length };
        };

export default connect(mapStateToProps, { setPin, galleryFetch, SelectedURL, clearImage })(Gallery);