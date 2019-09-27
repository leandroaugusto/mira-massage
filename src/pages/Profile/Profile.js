// vendor
import React, { Component } from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import { shape, func } from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

// local
import { Avatar, Button, Modal } from 'components';
import { colors } from 'utils';
import styles from './Profile.style';

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    drawerLabel: 'Profile',
    headerRight: (
      <Button
        onPress={navigation.getParam('logout')}
        backgroundColor={colors.blue}
        style={styles.logout}
        title="Sair"
      />
    )
  });

  static propTypes = {
    navigation: shape({
      navigate: func
    }).isRequired
  };

  state = {
    showModal: false,
    isLoading: true,
    imageUri: null,
    error: null
  };

  async componentDidMount() {
    const {
      navigation: { setParams }
    } = this.props;

    await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    await this._getStoredImageUri();
    setParams({ logout: this._signOut });
  }

  get showModal() {
    const { showModal } = this.state;
    return showModal;
  }

  get imageUri() {
    const { imageUri } = this.state;
    return imageUri;
  }

  _getStoredImageUri = async () => {
    try {
      const imageUri = await AsyncStorage.getItem('profile_photo');

      this.setState({ isLoading: false });
      if (imageUri) this.setState({ imageUri });
    } catch (e) {
      this.setState({ error: e.message, isLoading: false });
    }
  };

  _storeImageUri = async imageUri => {
    try {
      await AsyncStorage.setItem('profile_photo', imageUri);
    } catch (e) {
      this.setState({ error: e.message });
    }
  };

  _signOut = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    await AsyncStorage.removeItem('token'); // clear()
    navigate('Auth');
  };

  _deletePhoto = async () => {
    await AsyncStorage.removeItem('profile_photo');
    this.setState({ imageUri: null });
    this.toggleModal();
  };

  toggleModal = () => this.setState({ showModal: !this.showModal });

  async handleChangePhoto(method) {
    let result = await ImagePicker[method]({
      allowsEditing: true,
      aspect: [4, 4]
    });

    if (!result.cancelled) {
      await this._storeImageUri(result.uri);
      this.setState({ imageUri: result.uri });
      this.toggleModal();
    }
  }

  renderModal() {
    const { error } = this.state;
    return (
      <Modal visible={this.showModal}>
        <View style={styles.btnWrapper}>
          <Button
            title="Tirar foto"
            style={styles.btnPhotos}
            onPress={() => this.handleChangePhoto('launchCameraAsync')}
          />
          <Button
            title="Escolher foto"
            style={styles.btnPhotos}
            onPress={() => this.handleChangePhoto('launchImageLibraryAsync')}
          />
        </View>
        {error && (
          <Text>{error}</Text>
        )}
        {this.imageUri && (
          <Button
            title="Excluir foto"
            backgroundColor={colors.red}
            onPress={this._deletePhoto}
          />
        )}
        <Button
          title="Cancelar"
          backgroundColor={colors.lightgray}
          onPress={this.toggleModal}
        />
      </Modal>
    );
  }

  renderAvatar() {
    const { isLoading } = this.state;
    let customProp = {};

    if (this.imageUri) {
      customProp = { source: { uri: this.imageUri } };
    } else {
      customProp = { title: 'LC' };
    }

    return (
      <Avatar
        onPress={this.toggleModal}
        isLoading={isLoading}
        {...customProp}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderAvatar()}

        <Button
          onPress={this.toggleModal}
          backgroundColor={colors.purple}
          title={`${!this.imageUri ? 'Incluir' : 'Alterar'} foto`}
          style={styles.btnChange}
        />

        {this.renderModal()}
      </View>
    );
  }
}
