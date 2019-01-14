// vendor
import React, { Component } from 'react';
import { Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { shape, func } from 'prop-types';

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

  componentDidMount() {
    const {
      navigation: { setParams }
    } = this.props;
    setParams({ logout: this._signOutAsync });
  }

  _signOutAsync = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    await AsyncStorage.clear();
    navigate('Auth');
  };

  render() {
    return <Text>PROFILE SCREEN</Text>;
  }
}
