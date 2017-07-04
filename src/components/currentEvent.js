import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import { eventsFetch } from '../actions';
import {Card, CardSection, Button, Spinner} from './common';
import ListItem from './ListItem';

class CurrentEvent extends Component {
  Constructor(props){
    Super(props);

      const joinedEvent = _.map(this.props.joinedEvent, (val, uid) => {
          return { ...val, uid };

       });
       this.state={joinedEvent}
       this.onRowPress=this.onRowPress.bind(this)
  };

  componentWillMount() {
    this.props.eventsFetch();
å
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
   
    this.createDataSource(nextProps);
  }

onRowPress(joinedEvent){
      Actions.ShowCamera(joinedEvent.joinPin)
}

  createDataSource({ joinedEvent }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(joinedEvent);
  }

  renderRow(joinedEvents) {
    return <ListItem joinedEvents={this.state.joinedEvents}
                      onRowPress={this.onRowPresss}
                       />;
  }

  render() {
    console.log(this.props)
    return (
      <Card>

        <CardSection>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </CardSection>
        
      </Card>
    );
  }
}


const mapStateToProps = state => {
  return{joinedEvent: state.joinEvent}
  };


export default connect(mapStateToProps, { eventsFetch })(CurrentEvent);