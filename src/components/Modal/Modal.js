// vendor
import React from 'react';
import { Modal as DefaultModal, View } from 'react-native';
import { number, element, arrayOf, oneOfType, func } from 'prop-types';

// local
import styles from './Modal.style';

const Modal = ({ width, height, children, ...props }) => {
  return (
    <DefaultModal animationType="fade" transparent {...props}>
      <View style={styles.modalWrapper}>
        <View style={{ ...styles.modalContainer, width, height }}>
          {children}
        </View>
      </View>
    </DefaultModal>
  );
};

Modal.propTypes = {
  width: number,
  height: number,
  children: oneOfType([element, arrayOf(element)]).isRequired,
  onRequestClose: func
};

Modal.defaultProps = {
  width: 320,
  height: 250,
  onRequestClose: () => {}
};

export default Modal;
