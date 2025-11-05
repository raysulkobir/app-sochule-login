import React, { useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default function GoogleLogin() {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '193579992169-l9ojs877dnkovn2stu9262pi9bgts7bk.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, []);

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();
            console.log('userInfo', userInfo);
            Alert.alert('Success', `Welcome ${userInfo.user.name}`);
        } catch (error: any) {
            console.error(error);

            // Better error handling
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Cancelled', 'Sign-in was cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('In Progress', 'Sign-in is already in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('Error', 'Play Services not available');
            } else {
                Alert.alert('Sign-in failed', error?.message ?? String(error));
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={signInWithGoogle} style={styles.button}>
                <Text style={styles.text}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    button: { padding: 16, backgroundColor: '#4285F4', borderRadius: 8 },
    text: { fontSize: 18, fontWeight: 'bold', color: 'white' },
});