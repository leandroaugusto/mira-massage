// vendor
import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  CameraRoll,
  PermissionsAndroid
} from 'react-native';
import { shape, func } from 'prop-types';
import { Avatar } from 'react-native-elements';

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
    photos: null
  };

  async componentDidMount() {
    const {
      navigation: { setParams }
    } = this.props;
    await this.requestCameraPermission();
    setParams({ logout: this._signOutAsync });
  }

  _signOutAsync = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    await AsyncStorage.clear();
    navigate('Auth');
  };

  _handleChangePhoto = () => {
    CameraRoll.getPhotos({
      first: 4,
      assetType: 'Photos'
    })
      .then(r => this.setState({ photos: r.edge }))
      .catch(e => console.log('Error loading images', e));
  };

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permissão para acesso às suas fotos',
          message:
            'O aplicativo precisa de sua permissão ' +
            'para acesso às suas fotos.'
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access the camera roll');
      } else {
        console.log('Camera roll permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    console.log('PHOTOS', this.state.photos);
    return (
      <View style={styles.container}>
        <Avatar
          xlarge
          rounded
          title="LC"
          activeOpacity={0.8}
          onPress={this._handleChangePhoto}
        />

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
