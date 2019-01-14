// vendor
import React from 'react';
import { string, func } from 'prop-types';
import { TextInput } from 'react-native';

// local
import { colors } from '../../utils';
import styles from './Input.style';

const Input = ({
  value,
  onChange,
  selectionColor,
  underlineColorAndroid,
  ...props
}) => {
  return (
    <TextInput
      style={styles.input}
      selectionColor={selectionColor}
      underlineColorAndroid={underlineColorAndroid}
      onChangeText={onChange}
      value={value}
      {...props}
    />
  );
};

Input.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
  underlineColorAndroid: string,
  selectionColor: string
};

Input.defaultProps = {
  selectionColor: colors.lightgray,
  underlineColorAndroid: colors.blue
};

export default Input;
