import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './Navigations'
import AuthProvider from './contexts/Auth/AuthContext'
import LoadProvider from './contexts/Loader/loaderContext'
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message';
import store from './Redux/store'


const App = () => {
    return (
        <Provider store={store}>
            <LoadProvider>
                <AuthProvider>
                    <Navigation />
                    <Toast
                        position='bottom'
                        bottomOffset={20}
                    />
                </AuthProvider>
            </LoadProvider>
        </Provider>
    )
}

export default App

const styles = StyleSheet.create({

})