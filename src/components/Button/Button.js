// vendor
import React from 'react';
import { string, number, objectOf, oneOfType } from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Button as DefaultButton } from 'react-native-elements';

// local
import { colors } from 'utils';
import styles from './Button.style';

const Button = ({ style, backgroundColor, ...props }) => {
  return (
    <DefaultButton
      backgroundColor={backgroundColor}
      containerViewStyle={[styles.btn, style]}
      Component={TouchableOpacity}
      borderRadius={5}
      {...props}
    />
  );
};

Button.propTypes = {
  backgroundColor: string,
  style: objectOf(oneOfType([string, number]))
};

Button.defaultProps = {
  backgroundColor: colors.blue,
  style: {}
};

export default Button;
