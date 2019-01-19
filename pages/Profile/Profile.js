// vendor
import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { shape, func } from 'prop-types';
import { Avatar } from 'react-native-elements';
import { Permissions, ImagePicker } from 'expo';

// local
import styles from './Profile.style';

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerRight: (
        <TouchableOpacity
          onPress={navigation.getParam('logout')}
          style={styles.logout}
        >
          <Text style={styles.btnText}>Sair</Text>
        </TouchableOpacity>
      )
    };
  };

  static propTypes = {
    navigation: shape({
      navigate: func
    }).isRequired
  };

  state = {
    hasCameraPermission: null,
    isLoading: true,
    imageUri: null,
    error: null
  };

  async componentDidMount() {
    const {
      navigation: { setParams }
    } = this.props;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    await this._getStoredData();
    this.setState({ hasCameraPermission: status === 'granted' });
    setParams({ logout: this._signOutAsync });
  }

  _getStoredData = async () => {
    try {
      const imageUri = await AsyncStorage.getItem('profile_photo');
      this.setState({ isLoading: false });
      if (imageUri) this.setState({ imageUri });
    } catch (e) {
      this.setState({ error: e.message, isLoading: false });
    }
  };

  _storeData = async imageUri => {
    try {
      await AsyncStorage.setItem('profile_photo', imageUri);
    } catch (e) {
      this.setState({ error: e.message });
    }
  };

  _signOutAsync = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    await AsyncStorage.clear(); // removeItem('token')
    navigate('Auth');
  };

  _handleChangePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4]
    });

    if (!result.cancelled) {
      await this._storeData(result.uri);
      this.setState({ imageUri: result.uri });
    }
  };

  renderAvatar() {
    const { imageUri, isLoading } = this.state;
    let customProp = {};

    if (isLoading) {
      customProp = { component: () => <ActivityIndicator size="small" /> };
    } else if (imageUri) {
      customProp = { source: { uri: imageUri } };
    } else {
      customProp = { title: 'LC' };
    }

    console.log('AVATAR', customProp);

    return (
      <Avatar
        xlarge
        rounded
        activeOpacity={0.8}
        onPress={this._handleChangePhoto}
        {...customProp}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderAvatar()}

        <TouchableOpacity
          onPress={this._handleChangePhoto}
          style={styles.btnChange}
        >
          <Text style={{ ...styles.btnText, ...styles.btnSize }}>
            Alterar foto
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
