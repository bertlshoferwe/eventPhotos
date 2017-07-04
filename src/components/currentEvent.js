import React, { Component }                     from 'react';
import _                                        from 'lodash';
import { connect }                              from 'react-redux';
import { ListView }                             from 'react-native';
import firebase                                 from 'firebase';
import { Actions }                              from 'react-native-router-flux';
import { eventsFetch }                          from '../actions';
import { Card, CardSection, Button, Spinner }   from './common';
import ListItem                                 from './ListItem';

class CurrentEvent extends Component {
    Constructor(props){
        Super(props);

        let joinedEvents = _.map(this.props.getJoinedEvents(), (val, uid) => {
            return {val, uid };
        });

        this.state = {joinedEvents, dataSource: ''};

        this.onRowPress=this.onRowPress.bind(this);
        this.createDataSource=this.createDataSource.bind(this);
    }

    componentWillMount() {
        this.props.eventsFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    onRowPress(joinedEvent){
        Actions.ShowCamera(joinedEvent.joinPin);
    }

    createDataSource(joinedEvent) {
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.setState({dataSource: ds.cloneWithRows(joinedEvent)});
    }

    renderRow(joinedEvents) {
        return (
            <ListItem
                joinedEvents={this.state.joinedEvents}
                onRowPress={this.onRowPresss} />

        );
    }

    render() {
        console.log(this.props)
        return (
            <Card>
                <CardSection>
                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow} />
                </CardSection>

            </Card>
        );
    }
}


const mapStateToProps = state => {
    return{
        getJoinedEvents: state.event.getJoinedEvents // TODO: this is an action call object keys here need to come from the state in the reducer.  Any action needs to be access in the 2nd parameter of the connect method.
    }

};


export default connect(mapStateToProps, { eventsFetch })(CurrentEvent);