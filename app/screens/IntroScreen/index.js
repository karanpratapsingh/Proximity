import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Logo from '../../../assets/images/react-logo.png';
import { MaterialColors, Typography } from '../../theme';

const IntroScreen = () => {

    const { status } = useSelector(state => state.appData);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Image source={Logo} style={styles.logo} />
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>React Native Boilerplate</Text>
                    <Text style={styles.body}>Robust boilerplate to kickstart your next app</Text>
                </View>
            </View>
            <Text style={styles.item}>Redux <Text style={{ color: MaterialColors.green[400] }}>{status}</Text></Text>
            <Text style={styles.item}>TypeScript <Text style={{ color: MaterialColors.blue[800] }}>Added</Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainer: {
        marginLeft: 10
    },
    logo: {
        height: 64,
        width: 64
    },
    heading: {
        ...Typography.Body.light,
        fontSize: 24
    },
    body: {
        ...Typography.Body.light,
        color: MaterialColors.grey[500],
        fontSize: 16
    },
    item: {
        ...Typography.Body.light,
        marginTop: 10,
        fontSize: 16
    }
});

export default IntroScreen;