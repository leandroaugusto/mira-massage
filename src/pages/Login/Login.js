// vendor
import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { isEmpty } from 'lodash';
import { shape, func } from 'prop-types';

// local
import { login } from 'services';
import { Input, Button } from 'components';
import styles from './Login.style';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  static propTypes = {
    navigation: shape({
      navigate: func
    }).isRequired
  };

  state = {
    email: '',
    password: '',
    error: '',
    isLoading: false
  };

  _storeData = async token => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (e) {
      console.log('not stored', e);
    }
  };

  _onSubmit = async () => {
    const { email, password } = this.state;
    const {
      navigation: { navigate }
    } = this.props;

    this.setState({ isLoading: true });

    await login({ email, password })
      .then(async ({ data }) => {
        await this._storeData(data.token);
        navigate('App');
      })
      .catch(err => this.setState({ error: err.message, isLoading: false }));
  };

  render() {
    const { email, password, error, isLoading } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          {!isEmpty(error) && <Text style={styles.error}>{error}</Text>}

          <Input
            placeholder="Email"
            onChange={email => this.setState({ email, error: '' })}
            value={email}
          />
          <Input
            placeholder="Senha"
            onChange={password => this.setState({ password, error: '' })}
            value={password}
            secureTextEntry
          />

          <Button
            loading={isLoading}
            title="Entrar"
            onPress={this._onSubmit}
            style={styles.btn}
          />
        </View>
      </View>
    );
  }
}
