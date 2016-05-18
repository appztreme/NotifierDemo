import React, { Component,
    Image,
    ListView,
    View,
    StyleSheet,
    Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from './../actions';

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
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
    },
    subrow: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    icon: {
        marginRight: 10,
        width: 50,
        height: 50,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        fontStyle: 'italic',
    }
});

class AcceptedNotificationList extends Component {
    constructor(props) {
        super(props);
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

    getImagePath(num) {
        switch (num) {
        case 1: return <Image source={require('./../../images/type1.png')} style={styles.icon} />;
        case 2: return <Image source={require('./../../images/type2.png')} style={styles.icon} />;
        case 3: return <Image source={require('./../../images/type3.png')} style={styles.icon} />;
        case 4: return <Image source={require('./../../images/type4.png')} style={styles.icon} />;
        default: return <Image source={require('./../../images/type1.png')} style={styles.icon} />;
        }
    }

    renderRow(data) {
        return (
            <View style={styles.row}>
                {this.getImagePath(data.type)}
                <View style={styles.subrow}>
                    <Text style={styles.title}>{data.title}-{data.id}</Text>
                    <Text style={styles.subtitle}>{new Date(data.date).toDateString()}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.header}>Accepted Notifications</Text>
                <ListView style={styles.container}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={data => this.renderRow(data)}
                    />
            </View>
        );
    }
}

AcceptedNotificationList.propTypes = {
    notifications: React.PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    console.log("STATE", state);
    return {
        notifications: state.notification.acceptedNotifications,
    };
};

const AcceptedNotificationContainer = connect(mapStateToProps)(AcceptedNotificationList);

export default AcceptedNotificationContainer;
