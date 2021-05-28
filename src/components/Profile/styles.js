import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainComponent: {
    backgroundColor: '#F5CEAF',
    height: '100%',
  },
  userContainer: {
    paddingBottom: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  userComponent: {
    flexDirection: 'row',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: 10,
    marginLeft: 20,
  },
  verticalLine: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    height: '90%',
    width: 1,
    backgroundColor: '#909090',
  },
  horizontalLine: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    width: '90%',
    height: 1,
    backgroundColor: '#909090',
  },
  userHandle: {
    marginTop: 20,
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userAbout: {
    color: 'black',
    fontSize: 15,
  },
  statsComponent: {
    flexDirection: 'row',
  },
  heading: {
    alignSelf: 'center',
    marginLeft: 20,
    color: 'grey',
    fontSize: 20,
  },
  values: {
    alignSelf: 'center',
    marginLeft: 20,
    fontSize: 20,
  },
});

export default styles;
