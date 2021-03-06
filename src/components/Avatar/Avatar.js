// vendor
import React from 'react';
import { Avatar as ProfileAvatar } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { bool } from 'prop-types';

const Avatar = ({ isLoading, ...props }) => {
  return isLoading ? (
    <ActivityIndicator size="small" />
  ) : (
    <ProfileAvatar xlarge rounded activeOpacity={0.8} {...props} />
  );
};

Avatar.propTypes = {
  isLoading: bool
};

Avatar.defaultProps = {
  isLoading: false
};

export default Avatar;
