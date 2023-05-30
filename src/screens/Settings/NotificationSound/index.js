import { StyleSheet, Text, Image, ScrollView, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import HeaderWithTitle from '../../../Components/HeaderWithTitle'
import ChooseSound from './ChooseSound'
import CustomButton from '../../../Components/CustomButton'



const NotificationSound = ({ navigation }) => {

    const {width} = useWindowDimensions()
    const [selected, setSelected] = useState('1')

    const [music, setMusic] = useState(null)




    datas = [
        {
            _id: '1',
            name: 'Sound 1',
            uri : require('../../../Sounds/sound1.mp3')
        },
        {
            _id: '2',
            name: 'Sound 2',
            uri : require('../../../Sounds/sound2.mp3')
        },
        {
            _id: '3',
            name: 'Sound 3',
            uri : require('../../../Sounds/sound3.mp3')
        },

    ]



    return (
        <>
            <HeaderWithTitle title={'Notification Sound'} backAction />
            <View style={{flex:1, backgroundColor:'#fff', paddingHorizontal:15, paddingTop:5}}>
                {datas.map((item) =>
                    <ChooseSound
                        item={item}
                        key={item?._id}
                        selected={selected}
                        onPress={() => setSelected(item?._id)}
                    />
                )}
                <CustomButton 

                    label={'Apply'} bg='#58D36E' mt={50} width={width/2} alignSelf='center'
                />
            </View>
            
        </>
    )
}

export default NotificationSound

const styles = StyleSheet.create({
    border: {  
        height: 4,
        backgroundColor: '#0D4E810D', 
        marginVertical:10 
    }
})