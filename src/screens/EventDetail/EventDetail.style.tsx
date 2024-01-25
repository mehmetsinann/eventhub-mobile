import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  titleContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#777',
  },
  image: {
    marginHorizontal: 20,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  descriptionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontWeight: '600',
    color: 'black',
  },
});
