// vendor
import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';

const pic = {
  uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
};
const colors = {
  white: '#fff',
  aliceblue: 'aliceblue',
  steelblue: 'steelblue'
};

const onPressButton = () => {
  Alert.alert('Clicou');
};

const App = function() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Text style={styles.text}>Another text</Text>
      <Image source={pic} style={styles.image} />
      <Button onPress={onPressButton} title="Botão" color="#841584" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.aliceblue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.steelblue
  },
  image: {
    width: 300,
    height: 200
  }
});

export default App;
