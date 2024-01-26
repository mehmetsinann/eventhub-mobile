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
import {useNavigation} from '@react-navigation/native';

import {RootState} from '../../redux/store';
import {fetchEvents} from '../../redux/slices/eventSlice';
import EventListItem from '../../components/EventListItem';
import CarouselItem from '../../components/CarouselItem';

import {styles} from './Home.style';

const Home = () => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const filter = useSelector((state: RootState) => state.filter);
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

  const navigateTo = (screen: string, params: object) => {
    navigation.navigate(screen, {...params});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>EventHub</Text>
          <Pressable
            onPress={() => {
              navigateTo('Search', {searchText: ''});
            }}>
            <Icon name="search-outline" size={28} />
          </Pressable>
        </View>
        {events.length > 0 && (
          <View style={styles.carouselContainer}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            <Carousel
              loop
              width={Dimensions.get('screen').width - 40}
              height={Dimensions.get('screen').height / 4}
              autoPlay={true}
              autoPlayInterval={3000}
              data={events.slice(0, 3)}
              scrollAnimationDuration={1000}
              renderItem={({item}) => (
                <CarouselItem
                  _id={item._id}
                  name={item.name}
                  venue={item.venue}
                  date={moment(item.start_date).toDate()}
                  imageURI={item.images[0]}
                />
              )}
            />
          </View>
        )}

        <View style={styles.eventList}>
          <View style={styles.eventListHeader}>
            <Text style={styles.sectionTitle}>Events</Text>
            {events.length > 0 && (
              <Pressable
                onPress={() => {
                  navigateTo('Filter', {});
                }}>
                <Icon name="filter-outline" size={24} />
              </Pressable>
            )}
          </View>
          <FlatList
            data={events.filter(event => {
              if (filter.category && filter.category !== event.category) {
                return false;
              }

              if (
                filter.startDate &&
                moment(filter.startDate).isAfter(event.start_date)
              ) {
                return false;
              }

              if (
                filter.endDate &&
                moment(filter.endDate).isBefore(event.end_date)
              ) {
                return false;
              }

              return true;
            })}
            renderItem={({item}) => (
              <EventListItem
                _id={item._id}
                name={item.name}
                venue={item.venue}
                date={moment(item.start_date).toDate()}
                images={item.images}
              />
            )}
            keyExtractor={item => item._id}
            scrollEnabled={false}
            ListEmptyComponent={<Text>No events found</Text>}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
