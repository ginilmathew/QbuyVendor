import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './Navigations'
import AuthProvider from './contexts/Auth/AuthContext'
import LoadProvider from './contexts/Loader/loaderContext'
import { Provider } from 'react-redux'
import store from './Redux/store'


const App = () => {
    return (
        <Provider store={store}>
            <LoadProvider>
                <AuthProvider>
                    <Navigation />
                </AuthProvider>
            </LoadProvider>
        </Provider>
    )
}

export default App

const styles = StyleSheet.create({

})