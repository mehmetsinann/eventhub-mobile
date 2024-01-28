import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {screenHeight, screenWidth} from '../../constants/screenDimensions';
import {RootState} from '../../redux/store';
import {fetchEvents} from '../../redux/slices/eventSlice';
import EventListItem from '../../components/EventListItem';
import CarouselItem from '../../components/CarouselItem';

import {styles} from './Home.style';

const Home = () => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const [mode, setMode] = React.useState<'Upcoming' | 'Past'>('Upcoming');
  const filter = useSelector((state: RootState) => state.filter);
  const events = useSelector((state: RootState) => state.events.events);
  const status = useSelector((state: RootState) => state.events.status);
  const error = useSelector((state: RootState) => state.events.error);

  const eventList = () => {
    const upcomingEvents = events.filter(event => {
      return moment(event.start_date).isAfter(moment());
    });

    const pastEvents = events.filter(event => {
      return moment(event.start_date).isBefore(moment());
    });

    return mode === 'Upcoming' ? [...upcomingEvents] : [...pastEvents];
  };

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const navigateTo = (screen: string, params = {}) => {
    navigation.navigate(screen, {...params});
  };

  const handleChangeMode = (_mode: 'Upcoming' | 'Past') => {
    setMode(_mode);
  };

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
      <View style={styles.header}>
        <Text style={styles.title}>EventHub</Text>

        <Pressable
          onPress={() => {
            navigateTo('Search', {searchText: ''});
          }}>
          <Icon name="search-outline" size={28} />
        </Pressable>
      </View>
      <ScrollView>
        {events.length > 0 && (
          <View style={styles.carouselContainer}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            <Carousel
              loop
              width={screenWidth - 40}
              height={screenHeight / 4}
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
                  category={item.category}
                />
              )}
            />
          </View>
        )}

        <View style={styles.eventList}>
          <View style={styles.eventListHeader}>
            <Pressable
              onPress={() => {
                handleChangeMode(mode === 'Upcoming' ? 'Past' : 'Upcoming');
              }}>
              <Text style={styles.sectionTitle}>{mode} Events</Text>
            </Pressable>

            {events.length > 0 && mode === 'Upcoming' && (
              <Pressable
                onPress={() => {
                  navigateTo('Filter');
                }}>
                <Icon name="filter-outline" size={24} />
              </Pressable>
            )}
          </View>
          <FlatList
            data={
              mode === 'Upcoming'
                ? eventList().filter(event => {
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
                  })
                : eventList()
            }
            renderItem={({item}) => (
              <EventListItem
                _id={item._id}
                name={item.name}
                venue={item.venue}
                date={moment(item.start_date).toDate()}
                images={item.images}
                category={item.category}
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
