import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    width: '100%',
    height: '100%',
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    flexDirection: 'row-reverse',
    padding: 10,
    backgroundColor: 'black',
  },
  confirmButton: {
    alignSelf: 'flex-end',
  },
  confirmText: {
    alignSelf: 'flex-end',
    color: 'white',
    padding: 20,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default styles;
