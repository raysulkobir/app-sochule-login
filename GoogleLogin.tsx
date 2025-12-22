import React, { useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next';
import { Button } from 'react-native';

export default function GoogleLogin() {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '293986053377-l5bjdp2ifq682mo3a4pf12ruv47qe5vp.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, []);
    

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();
            console.log('userInfo', userInfo);
            Alert.alert('Success', `Welcome ${userInfo}`);
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
    const loginWithFacebook = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                console.log('Facebook login cancelled');
                return;
            }

            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                console.log('Something went wrong obtaining Facebook access token');
                return;
            }

            const profile = await Profile.getCurrentProfile();
            console.log('Facebook profile:', profile);


            const userData = {
                id: profile?.userID,
                firstName: profile?.firstName,
                lastName: profile?.lastName,
                email: profile?.email,
                token: data.accessToken.toString(),
                provider: 'facebook',
                photo: profile?.imageURL
            };
console.log('userData', userData);
           
        } catch (error) {
            console.error('Facebook Login Error', error);
            
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={signInWithGoogle} style={styles.button}>
                <Text style={styles.text}>Sign in with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={loginWithFacebook} style={[styles.button,{marginTop: 16}]}>
                <Text style={styles.text}>Sign in with facebook</Text>
            </TouchableOpacity>
 
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    button: { padding: 16, backgroundColor: '#4285F4', borderRadius: 8 },
    text: { fontSize: 18, fontWeight: 'bold', color: 'white' },
});