// vendor
import React from 'react';
import { Modal as DefaultModal, View } from 'react-native';

// local
import styles from './Modal.style';

const Modal = ({ children, ...props }) => {
  return (
    <DefaultModal
      animationType="slide"
      transparent
      onRequestClose={() => {
        console.log('Fechando modal...');
      }}
      {...props}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContainer}>{children}</View>
      </View>
    </DefaultModal>
  );
};

export default Modal;
