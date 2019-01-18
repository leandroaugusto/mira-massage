import { StyleSheet } from 'react-native';
import { colors } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnChange: {
    backgroundColor: colors.purple,
    borderRadius: 5,
    padding: 10,
    marginTop: 15
  },
  logout: {
    backgroundColor: colors.blue,
    padding: 10,
    width: 60,
    marginRight: 10,
    alignItems: 'center'
  },
  btnText: {
    color: colors.white
  },
  btnSize: {
    fontSize: 18
  }
});

export default styles;
