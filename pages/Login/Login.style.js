import { StyleSheet } from 'react-native';
import { colors } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.aliceblue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 10,
    width: 320
  },
  error: {
    color: colors.red,
    textAlign: 'center'
  },
  btn: {
    padding: 10,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: colors.blue
  }
});

export default styles;
