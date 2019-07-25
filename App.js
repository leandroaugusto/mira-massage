// vendor
import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
  // createDrawerNavigator
} from 'react-navigation';
import { ActivityIndicator } from 'react-native';

// local
import { Login, Profile } from 'pages';

const AuthStack = createStackNavigator({ Login: Login });
const AppStack = createStackNavigator({ Profile: Profile });
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
);
const App = () => (
  <AppContainer
    persistenceKey="NavigationState"
    renderLoadingExperimental={() => <ActivityIndicator />}
  />
);

export default App;
