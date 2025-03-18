import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import React, {FC, useState} from 'react';
import {screenWidth} from '@utils/Constants';
import FlimSlip from '../molecules/FlimSlip';
import Carousel from 'react-native-reanimated-carousel';
import Dots from '../atoms/Dots';

const AdCarousal: FC<{data: any}> = ({data}) => {
  const [active, setActive] = useState(0);
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 0.8,
  };
  return (
    <View>
      <FlimSlip />
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        autoPlay
        autoPlayInterval={3500}
        onSnapToItem={(index: any) => setActive(index)}
        data={data.data}
        renderItem={({item}: any) => (
          <Pressable style={styles.imageContainer}>
            <Image source={item?.image_uri} style={styles.img} />
          </Pressable>
        )}
      />
      {active != null && (
        <View style={styles.dots}>
          {data?.data?.map((item: any, index: any) => {
            return (
              <Dots
              active={active}
              index={index}
              key={index}
              />
            )
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  dots: {
    flexDirection: 'row',
    width: 100,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
});

export default AdCarousal;
