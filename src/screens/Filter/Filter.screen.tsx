import {View, Text, SafeAreaView, Pressable, Button} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './Filter.style';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {useDispatch, useSelector} from 'react-redux';
import {
  setFilterCategory,
  setFilterEndDate,
  setFilterStartDate,
} from '../../redux/slices/filterSlice';
import {RootState} from '../../redux/store';
import moment from 'moment';

const Filter = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const filterState = useSelector((state: RootState) => state.filter);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [startDate, setStartDate] = React.useState<Date | null>(
    filterState.startDate || null,
  );
  const [endDate, setEndDate] = React.useState<Date | null>(
    filterState.endDate || null,
  );
  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    filterState.category || '',
  );
  const [isDateRange, setIsDateRange] = React.useState<boolean>(
    filterState.endDate !== null,
  );

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const response = await axios.get('http://localhost:3000/events/categories');
    setCategories(response.data);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleApply = () => {
    selectedCategory && dispatch(setFilterCategory(selectedCategory));
    startDate && dispatch(setFilterStartDate(moment(startDate).toDate()));
    endDate && dispatch(setFilterEndDate(moment(endDate).toDate()));
    navigation.goBack();
  };

  const resetFilter = () => {
    dispatch(setFilterCategory(''));
    dispatch(setFilterStartDate(null));
    dispatch(setFilterEndDate(null));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleBack}>
          <Pressable onPress={goBack}>
            <Icon name="chevron-back-outline" size={32} />
          </Pressable>
          <Text style={styles.title}>Filter</Text>
        </View>
        <Button title="Reset filter" onPress={resetFilter} />
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.subTitle}>Categories</Text>
        <View style={styles.categories}>
          {categories.map(category => (
            <Pressable
              style={[
                styles.category,
                selectedCategory === category && styles.selectedCategory,
              ]}
              key={category}
              onPress={() => {
                setSelectedCategory(category);
              }}>
              <Text style={styles.categoryText}>{category}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.dates}>
        <View style={styles.datesHeader}>
          <Text style={styles.subTitle}>Date</Text>
          <Button
            title={!isDateRange ? 'Date Range' : 'Single Date'}
            onPress={() => {
              setIsDateRange(!isDateRange);
            }}
          />
        </View>
        <View style={styles.startDate}>
          <Text style={styles.subTitle}>Start Date</Text>
          <DatePicker
            date={startDate || new Date()}
            mode="date"
            onDateChange={setStartDate}
          />
        </View>
        {isDateRange && (
          <View style={styles.endDate}>
            <Text style={styles.subTitle}>End Date</Text>
            <DatePicker
              date={endDate || new Date()}
              mode="date"
              onDateChange={setEndDate}
            />
          </View>
        )}
      </View>
      <Pressable style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Filter;
