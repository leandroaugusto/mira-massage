import { StyleSheet } from 'react-native';
import { colors } from 'utils';

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
    textAlign: 'center',
    borderColor: colors.red,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    marginVertical: 8
  },
  btn: {
    marginTop: 40,
    marginBottom: 5
  }
});

export default styles;
