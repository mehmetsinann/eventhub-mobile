import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 10,
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    marginLeft: 8,
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  eventList: {marginHorizontal: 20, alignSelf: 'center'},
});
