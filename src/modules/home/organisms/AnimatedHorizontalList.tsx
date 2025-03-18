import { StyleSheet, Text, View,FlatList, Pressable, Image } from 'react-native'
import React, { FC } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { FONTS, screenHeight, screenWidth } from '@utils/Constants'
import { navigate } from '@navigation/NavigationUtil'


const AnimatedHorizontalList:FC<{data:any}> = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        {data?.title}
      </Text>
      <FlatList
      data={data?.data}
      horizontal
      keyExtractor={(item)=>item.id}
      renderItem={({item,index})=>(
        <Pressable key={index} onPress={()=>navigate("Categories")} style={styles.imgContainer}>
            <Image source={{uri:item.image_uri}} style={styles.image} />
        </Pressable>
      )}
      />
    </View>
  )
}

export default AnimatedHorizontalList

const styles = StyleSheet.create({
    container:{
        marginVertical:15
    },
    textStyle:{
        fontSize:RFValue(14),
        fontFamily:FONTS.heading,
        marginHorizontal:15,
        marginBottom:15
    },
    image:{
        width:"100%",
        height:"100%"
    },
    imgContainer:{
        width:screenWidth * 0.45,
        height:screenHeight * 0.6,
        marginRight:15
    }
})