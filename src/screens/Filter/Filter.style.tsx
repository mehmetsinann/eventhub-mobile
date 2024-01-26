import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  titleBack: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  category: {
    backgroundColor: '#DDD',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  selectedCategory: {
    backgroundColor: '#BBB',
  },
  categoryText: {
    fontSize: 16,
  },
  dates: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 20,
  },
  datesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startDate: {},
  endDate: {},
  applyButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});
