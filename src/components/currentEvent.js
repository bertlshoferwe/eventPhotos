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

  componentWillMount() {
    this.props.eventsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
   
    this.createDataSource(nextProps);
  }



  createDataSource({ joinedEvent }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(joinedEvent);
  }

  renderRow(joinedEvents) {
    return <ListItem joinedEvents={joinedEvents} />;
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
  const joinedEvent = _.map(state.joinedEvent, (val, uid) => {
    return { ...val, uid };
  });

  return { joinedEvent };
};

export default connect(mapStateToProps, { eventsFetch })(CurrentEvent);