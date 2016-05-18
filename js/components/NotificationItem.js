import React, {
    Component,
    Image,
    View,
    Text,
    TouchableHighlight,
    StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';

const styles = StyleSheet.create({
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

class NotificationItem extends Component {
    getImagePath(num) {
        switch (num) {
        case 1: return <Image source={require('./../../images/type1.png')} style={styles.icon} />;
        case 2: return <Image source={require('./../../images/type2.png')} style={styles.icon} />;
        case 3: return <Image source={require('./../../images/type3.png')} style={styles.icon} />;
        case 4: return <Image source={require('./../../images/type4.png')} style={styles.icon} />;
        default: return <Image source={require('./../../images/type1.png')} style={styles.icon} />;
        }
    }

    onAccept() {
        this.props.onAccept(this.props.notification.id);
    }

    onDecline() {
        this.props.onDecline(this.props.notification.id);
    }

    pressRow(notification) {
        console.log("ROW PRESSED", notification);
    }

    render() {
        const buttons = [{
            text: 'Accept',
            backgroundColor: 'darkseagreen',
            underlayColor: '#273539',
            onPress: this.onAccept.bind(this),
        }, {
            text: 'Decline',
            backgroundColor: 'lightcoral',
            underlayColor: '#273539',
            onPress: this.onDecline.bind(this),
        }];

        return (
            <Swipeout backgroundColor='#fff'
                right={buttons}
            >
                <View style={styles.row}>
                    <TouchableHighlight
                        onPress={() => this.pressRow(this.props.notification)}
                        underlayColor='#ddd'
                    >
                        {this.getImagePath(this.props.notification.type)}
                    </TouchableHighlight>
                    <View style={styles.subrow}>
                        <Text style={styles.title}>{this.props.notification.title}-{this.props.notification.id}</Text>
                        <Text style={styles.subtitle}>{new Date(this.props.notification.date).toDateString()}</Text>
                    </View>
                </View>
            </Swipeout>
        );
    }

}

NotificationItem.propTypes = {
    notification: React.PropTypes.object.isRequired,
    onAccept: React.PropTypes.func.isRequired,
    onDecline: React.PropTypes.func.isRequired,
};

export default NotificationItem;
