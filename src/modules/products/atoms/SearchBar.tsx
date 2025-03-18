import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {FC} from 'react';
import Icon from '@components/atoms/Icon';
import {goBack, navigate} from '@navigation/NavigationUtil';

interface SearchBarProps {
  cartLength: number;
}

const SearchBar: FC<SearchBarProps> = ({cartLength}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => goBack()}>
        <Icon iconFamily="MaterialCommunityIcons" size={24} name="arrow-left" />
      </Pressable>
      <View style={styles.searchContainer}>
        <Icon name="search" iconFamily="MaterialIcons" size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Products"
          placeholderTextColor={'#666'}
        />
      </View>
      <Pressable onPress={() => navigate('Wishlist')}>
        <Icon size={24} iconFamily="Ionicons" name="heart-outline" />
      </Pressable>
      <Pressable onPress={() => navigate('Cart')} style={styles.cartContainer}>
        <Icon name="cart-sharp" iconFamily="Ionicons" size={24} />
        {cartLength > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartLength}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
    paddingVertical: 8,
  },
  cartContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
