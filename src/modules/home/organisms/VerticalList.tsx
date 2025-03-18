import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {FONTS, screenWidth} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from '@components/atoms/Icon';
import {navigate} from '@navigation/NavigationUtil';

const VerticalList: FC<{data: any}> = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.absoluteView, {backgroundColor: data?.bgColor}]} />
      <Text style={styles.headingText}>{data?.title}</Text>
      <Pressable style={[styles.button, {backgroundColor: data?.btnColor}]}>
        <Text style={styles.buttonText}>Explore More</Text>
        <Icon
          color="#fff"
          iconFamily="Ionicons"
          name="arrow-forward-sharp"
          size={16}
        />
      </Pressable>
      <FlatList
        data={data?.data}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigate('Container')}
            style={styles.itemContainer}>
            <Image style={styles.image} source={{uri: item.image_uri}} />
            <Text style={styles.productText}>{item?.title}</Text>
            <Text style={styles.subTitle}>{item?.subTitle}</Text>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default VerticalList;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 10,
    marginVertical: 15,
  },
  buttonText: {
    fontWeight: '400',
    color: '#fff',
    fontSize: RFValue(12),
  },
  container: {
    padding: 10,
    marginTop: 10,
  },
  absoluteView: {
    width: screenWidth,
    height: 100,
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  headingText: {
    fontSize: RFValue(16),
    fontFamily: FONTS.heading,
    color: '#222',
  },
  itemContainer: {
    width: '100%',
    margin: 5,
    height: 220,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  productText: {
    fontSize:RFValue(14),
    fontFamily:FONTS.heading,
    color:"#222",
    marginTop:4
  },
  subTitle: {
    fontSize:RFValue(10),
    color:"#222",
    marginTop:4
  },
  contentContainer:{
    paddingBottom:10
  }
});
