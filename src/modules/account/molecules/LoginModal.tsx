import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@store/reduxHook';
import {loginOrSignup} from '../api/api';
import {setData} from '../api/slice';
import {navigate} from '@navigation/NavigationUtil';
import {clearCart} from '@modules/cart/api/slice';
import {modalStyles} from '@styles/modalStyles';
import Icon from '@components/atoms/Icon';
import { Colors } from '@utils/Constants';

const LoginModal: FC<{visible: boolean; onClose: () => void}> = ({
  visible,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.account.user) as any
    const user = userState?._j || null

  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleLogin = async () => {
    const data = loginOrSignup(number, address);
    if (data) {
      dispatch(setData(data));
      onClose();
    } else {
      Alert.alert('There was an error');
    }
  };

  useEffect(() => {
    if (user?.phone) {
      setNumber(user?.phone);
      setAddress(user?.address);
    }
  }, [user]);

  const handleLogout = async () => {
    onClose();
    navigate('Home');
    setAddress('');
    setNumber('');
    await dispatch(clearCart());
    await dispatch(setData(null));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback>
        <View style={modalStyles.modalContainer}>
          <KeyboardAvoidingView
            style={modalStyles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={modalStyles.scrollViewContent}>
              <View style={modalStyles.modalContent}>
                <TouchableOpacity
                  onPress={onClose}
                  style={modalStyles.closeIcon}>
                  <Icon
                    color="#fff"
                    name="close"
                    size={20}
                    iconFamily="Ionicons"
                  />
                </TouchableOpacity>
                <Text style={modalStyles.title}>
                  Login for the best experience
                </Text>
                <Text style={modalStyles.subTitle}>
                  Enter your phone number to proceed
                </Text>

                <TextInput
                  style={modalStyles.input}
                  placeholder="Enter your number"
                  value={number}
                  maxLength={10}
                  onChangeText={setNumber}
                  keyboardType="number-pad"
                  placeholderTextColor={'#ccc'}
                />

                <TextInput
                  style={modalStyles.textareainput}
                  placeholder="Enter your address here"
                  value={address}
                  textAlignVertical="top"
                  multiline
                  placeholderTextColor={'#ccc'}
                  onChangeText={setAddress}
                />

                <View style={modalStyles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleLogin}
                    style={modalStyles.button}>
                    <Text style={modalStyles.buttonText}>
                      {!user ? 'Login' : 'Save'}
                    </Text>
                  </TouchableOpacity>

                {
                    user && 
                    <TouchableOpacity onPress={handleLogout} style={[modalStyles.button,{backgroundColor:"transparent",borderColor:Colors.active,borderWidth:1}]}>
                        <Text style={[modalStyles.buttonText,{color:Colors.active}]}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                }

                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LoginModal;

const styles = StyleSheet.create({});
