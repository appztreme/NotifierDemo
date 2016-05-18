import React, { Component,
    ListView,
    View,
    StyleSheet,
    Text } from 'react-native';
import { connect } from 'react-redux';
import NotificationSvc from './../api/notification';
import * as actions from './../actions';
import NotificationItem from './NotificationItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        padding: 10,
    },
    main: {
        flex: 1,
        paddingTop: 30,
    },
    header: {
        paddingLeft: 40,
        fontWeight: 'bold',
        fontSize: 24,
        color: '#48BBEC',
    },
});

class NotificationList extends Component {
    constructor(props) {
        super(props);
        const notificationsSvc = new NotificationSvc(this.props.onNewNotification);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.notifications),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notifications !== this.props.notifications) {
            this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.notifications) });
        }
    }

    renderRow(data) {
        return (
            <NotificationItem notification={data}
                onAccept={this.props.onAccept}
                onDecline={this.props.onDecline} />
        )
    }

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.header}>Notifications</Text>
                <ListView style={styles.container}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={data => this.renderRow(data)}
                    />
            </View>
        );
    }
}

NotificationList.propTypes = {
    onNewNotification: React.PropTypes.func.isRequired,
    onAccept: React.PropTypes.func.isRequired,
    onDecline: React.PropTypes.func.isRequired,
    notifications: React.PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    console.log("STATE", state);
    return {
        notifications: state.notification.notifications,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNewNotification: (message) => {
            console.log("NEW Notification", message);
            dispatch(actions.newNotification(message));
        },
        onAccept: (id) => {
            console.log("Accept Notificiation", id);
            dispatch(actions.acceptNotification(id));
        },
        onDecline: (id) => {
            console.log("Decline Notification", id);
            dispatch(actions.declineNotification(id));
        }
    };
};

const NotificationContainer = connect(mapStateToProps, mapDispatchToProps)(NotificationList);

export default NotificationContainer;
