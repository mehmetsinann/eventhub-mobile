import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
  },
  infoContainer: {
    justifyContent: 'space-between',
    flex: 3,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    height: '100%',
    borderRadius: 10,
    marginLeft: 10,
    flex: 1,
  },
});
