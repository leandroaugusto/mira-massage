import { StyleSheet } from 'react-native';
import { colors } from 'utils';

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blackAlpha
  },
  modalContainer: {
    padding: 20,
    borderRadius: 5,
    justifyContent: 'space-between',
    backgroundColor: colors.white
  }
});

export default styles;
