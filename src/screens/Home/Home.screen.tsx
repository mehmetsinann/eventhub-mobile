import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/Ionicons';

import {RootState} from '../../redux/store';
import {fetchEvents} from '../../redux/slices/eventSlice';
import EventListItem from '../../components/EventListItem';
import CarouselItem from '../../components/CarouselItem';

import {styles} from './Home.style';

const Home = () => {
  const dispatch: any = useDispatch();

  const events = useSelector((state: RootState) => state.events.events);
  const status = useSelector((state: RootState) => state.events.status);
  const error = useSelector((state: RootState) => state.events.error);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (status === 'failed') {
    console.log(error);
    return (
      <SafeAreaView>
        <Text>Something went wrong!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>EventHub</Text>
          <Pressable>
            <Icon name="search-outline" size={28} />
          </Pressable>
        </View>
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={Dimensions.get('screen').width - 40}
            height={Dimensions.get('screen').height / 4}
            autoPlay={true}
            autoPlayInterval={3000}
            data={events}
            scrollAnimationDuration={1000}
            renderItem={({item}) => (
              <CarouselItem
                _id={item._id}
                name={item.name}
                venue={item.venue}
                date={moment(item.start_date).toDate()}
              />
            )}
          />
        </View>
        <View style={styles.eventList}>
          <View style={styles.eventListHeader}>
            <Text style={styles.sectionTitle}>Events</Text>
            <Pressable>
              <Icon name="filter-outline" size={24} />
            </Pressable>
          </View>
          <FlatList
            data={events}
            renderItem={({item}) => (
              <EventListItem
                _id={item._id}
                name={item.name}
                venue={item.venue}
                date={moment(item.start_date).toDate()}
              />
            )}
            keyExtractor={item => item._id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
