import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Pressable, Button} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {getCategories} from '../../api/events';
import {RootStackParamList} from '../../types/RootStackParamList';
import {
  setFilterCategory,
  setFilterEndDate,
  setFilterStartDate,
} from '../../redux/slices/filterSlice';
import {RootState} from '../../redux/store';

import {styles} from './Filter.style';

const Filter = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const filterState = useSelector((state: RootState) => state.filter);
  const [categories, setCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(
    filterState.startDate || null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    filterState.endDate || null,
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    filterState.category || '',
  );
  const [isDateRange, setIsDateRange] = useState<boolean>(
    filterState.endDate !== null,
  );

  useEffect(() => {
    getCategories().then(_categories => {
      setCategories(_categories);
    });
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const handleApply = () => {
    dispatch(setFilterCategory(selectedCategory));
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
                selectedCategory === category
                  ? setSelectedCategory('')
                  : setSelectedCategory(category);
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
            minimumDate={moment().toDate()}
          />
        </View>
        {isDateRange && (
          <View style={styles.endDate}>
            <Text style={styles.subTitle}>End Date</Text>
            <DatePicker
              date={endDate || new Date()}
              mode="date"
              onDateChange={setEndDate}
              minimumDate={
                (startDate && moment(startDate).toDate()) || moment().toDate()
              }
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
