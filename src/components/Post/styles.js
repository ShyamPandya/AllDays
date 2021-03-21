import {StyleSheet, Dimensions} from 'react-native';

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
    height: Dimensions.get('window').height - 20,
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    padding: 10,
  },
  handle: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: '100',
    marginBottom: 10,
  },
  rightContainer: {
    alignSelf: 'flex-end',
    height: 300,
    justifyContent: 'space-between',
    marginRight: 5,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  iconContainer: {
    alignSelf: 'center',
  },
  counter: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
  },
});

export default styles;
