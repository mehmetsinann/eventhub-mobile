import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-reanimated-carousel';

import {RootState} from '../../redux/store';
import {fetchEvents} from '../../redux/slices/eventSlice';
import EventListItem from '../../components/EventListItem';
import CarouselItem from '../../components/CarouselItem';

import {styles} from './Home.styles';

const Home = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.events);
  const status = useSelector((state: RootState) => state.events.status);
  const error = useSelector((state: RootState) => state.events.error);

  useEffect(() => {
    dispatch(fetchEvents() as any);
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
          <View style={styles.search}>
            <TextInput style={styles.input} placeholder="search" />
            <Icon name="search" size={20} />
          </View>
        </View>
        <View style={styles.carouselContainer}>
          <Text style={styles.sectionTitle}>Highlights</Text>
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
                name={item.name}
                venue={item.venue}
                date={moment(item.start_date).toDate()}
              />
            )}
          />
        </View>
        <View style={styles.eventList}>
          <Text style={styles.sectionTitle}>Events</Text>
          <FlatList
            data={events}
            renderItem={({item}) => (
              <EventListItem
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
