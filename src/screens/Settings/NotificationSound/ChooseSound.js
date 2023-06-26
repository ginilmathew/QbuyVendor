import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Sound from 'react-native-sound'

const ChooseSound = ({ onPress, selected, item }) => {

    const [play, setPlay] = useState(false)

    const action = () => {
        setPlay(true)
        let whoosh = new Sound(item?.uri, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            whoosh.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                    setPlay(false)
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        });
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}
        >
            <Ionicons name={selected === item?._id ? 'ios-radio-button-on' : 'ios-radio-button-off'} color={'#58D36E'} size={20} />
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text
                    style={{
                        color: '#23233C',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 12,
                        marginLeft: 5
                    }}
                >{item?.name}</Text>
            </View>
            <TouchableOpacity
                onPress={() => action(item)}
            >
                <Ionicons name={play ? 'md-stop-circle' : 'md-play-circle'} color={'#D122CB'} size={30} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default ChooseSound

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        borderColor: '#00000029'
    },


})