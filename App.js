import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const pic = {
  uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
};
const colors = {
  white: '#fff',
  skyblue: 'skyblue',
  steelblue: 'steelblue'
};

const App = function() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Text style={styles.text}>Another test 2</Text>
      <Image source={pic} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.skyblue,
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
