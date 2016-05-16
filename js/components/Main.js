import React, { Component,
    TabBarIOS,
    Text,
    View,
    StyleSheet } from 'react-native';
import NotificationList from './NotificationList'

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
    renderContent(tab) {
        if (tab === 'news') {
            return (
                <NotificationList />
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
                barTintColor="powderblue"
                style={styles.container}
                tintColor="white"
            >
                <TabBarIOS.Item
                    onPress={() => this.setState({ selectedTab: 'news' })}
                    selected={this.state.selectedTab === 'news'}
                    systemIcon="top-rated"
                    title="News">
                    {this.renderContent('news')}
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

export default Main;
