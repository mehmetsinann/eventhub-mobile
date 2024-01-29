import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 0,
    borderRadius: 12,
  },
  infoContainer: {
    flex: 1,
    zIndex: 100,
    justifyContent: 'flex-end',
    padding: 12,
    borderRadius: 12,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
});
