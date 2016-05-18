import React, { Component,
    TabBarIOS,
    Text,
    View,
    StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import NotificationList from './NotificationList';
import NotificationDetail from './NotificationDetail';
import AcceptedNotificationList from './AcceptedNotificationList';
import * as actions from './../actions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 667,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'auto',
    },
    item: {
        flex: 1,
        paddingTop: 160,
    },
    heading: {
        fontSize: 30,
        marginTop: 10,
    },
});


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'news',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newCount % 10 === 0) {
            this.props.onCountMod10();
        }
    }

    renderContent(tab) {
        if (tab === 'news') {
            return (
                <NotificationList />
            );
        }
        else if (tab === 'accept') {
            return (
                <AcceptedNotificationList />
            );
        }
        else if (tab === 'user') {
            return (
                <View style={styles.item}><Text style={styles.heading}>USER</Text></View>
            );
        }
        else return ( <View /> );
    }

    render() {
        return (
            <TabBarIOS
                barTintColor="#48BBEC"
                style={styles.container}
                tintColor="white"
            >
                <TabBarIOS.Item
                    badge={this.props.newCount}
                    onPress={() => this.setState({ selectedTab: 'news' })}
                    selected={this.state.selectedTab === 'news'}
                    systemIcon="history"
                    title="News">
                    {this.renderContent('news')}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    onPress={() => this.setState({ selectedTab: 'accept' })}
                    selected={this.state.selectedTab === 'accept'}
                    systemIcon="top-rated">
                    {this.renderContent('accept')}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    onPress={() => this.setState({ selectedTab: 'user' })}
                    selected={this.state.selectedTab === 'user'}
                    systemIcon="contacts"
                    title="User">
                    {this.renderContent('user')}
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

Main.propTypes = {
    newCount: React.PropTypes.number.isRequired,
    onCountMod10: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        newCount: state.notification.newCount,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCountMod10: () => {
            const now = new Date();
            const before = now.setSeconds(now.getSeconds() - 45);
            console.log('CLEAN Notification', before);
            dispatch(actions.cleanNotifications(before));
        },
    };
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;
