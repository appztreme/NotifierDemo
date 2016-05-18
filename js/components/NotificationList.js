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
        paddingTop: 40,
        padding: 10,
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
            <NotificationItem notification={data} />
        )
    }

    render() {
        return (
            <ListView style={styles.container}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={data => this.renderRow(data)}
            />
        );
    }
}

NotificationList.propTypes = {
    onNewNotification: React.PropTypes.func.isRequired,
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
    };
};

const NotificationContainer = connect(mapStateToProps, mapDispatchToProps)(NotificationList);

export default NotificationContainer;
