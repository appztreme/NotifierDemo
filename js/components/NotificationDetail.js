import React, {
    Component,
    Image,
    View,
    Text,
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

const getImagePath = (num) => {
    switch (num) {
    case 1: return <Image source={require('./../../images/type1.png')} style={styles.icon} />;
    case 2: return <Image source={require('./../../images/type2.png')} style={styles.icon} />;
    case 3: return <Image source={require('./../../images/type3.png')} style={styles.icon} />;
    case 4: return <Image source={require('./../../images/type4.png')} style={styles.icon} />;
    default: return <Image source={require('./../../images/type1.png')} style={styles.icon} />;
    }
}

const NotificationDetail = ({notification}) => (
    <View style={styles.container}>
        <View style={styles.row}>
            {this.getImagePath(notification.type)}
        </View>
        <View style={styles.row}>
            <Text style={styles.title}>{notification.title}-{notification.id}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.subtitle}>{new Date(notification.date).toDateString()}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.subtitle}>{notification.message}</Text>
        </View>
    </View>
)

NotificationDetail.propTypes = {
    notification: React.PropTypes.object.isRequired,
}

export default NotificationDetail;
