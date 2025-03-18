import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAppSelector } from '@store/reduxHook';

import ProductItem from '@modules/products/atoms/ProductItem';
import { screenHeight } from '@utils/Constants';

const Wishlist = () => {
  const wishlist = useAppSelector(state => state.wishlist.items);
  
  const renderItem = ({ item, index }:any) => {
    const isOdd = index % 2 !== 0;
    return <ProductItem isOdd={isOdd} item={item} />;
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Wishlist</Text>
      <FlatList
        bounces={false}
        data={wishlist}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        numColumns={2}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Oops! No items in the Wishlist</Text>
          </View>
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 10,
  },
  headingText: {
    fontSize: RFValue(22),
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
    backgroundColor: 'transparent',
    minHeight: '100%',
  },
  emptyContainer: {
    height: screenHeight * 0.7,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: RFValue(16),
    color: '#888',
    textAlign: 'center',
    fontWeight: '500',
  },
});