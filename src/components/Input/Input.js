// vendor
import React from 'react';
import { string, func, objectOf, oneOfType, number } from 'prop-types';
import { TextInput } from 'react-native';

// local
import { colors } from 'utils';
import styles from './Input.style';

const Input = ({ onChange, style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      onChangeText={onChange}
      {...props}
    />
  );
};

Input.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
  underlineColorAndroid: string,
  selectionColor: string,
  style: objectOf(oneOfType([string, number]))
};

Input.defaultProps = {
  selectionColor: colors.lightgray,
  underlineColorAndroid: colors.blue,
  style: {}
};

export default Input;
