import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Pressable,
  RefreshControl,
  Image,
  Linking,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {getEventList, handleDeepLink} from '../../utils/eventUtils';
import {screenHeight, screenWidth} from '../../constants/screenDimensions';
import {RootState} from '../../redux/store';
import {fetchEvents} from '../../redux/slices/eventSlice';
import EventListItem from '../../components/EventListItem';
import CarouselItem from '../../components/FeaeturedItem';

import {styles} from './Home.style';

const Home = () => {
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const [mode, setMode] = useState<'Upcoming' | 'Past'>('Upcoming');
  const filter = useSelector((state: RootState) => state.filter);
  const events = useSelector((state: RootState) => state.events.events);
  const status = useSelector((state: RootState) => state.events.status);
  const error = useSelector((state: RootState) => state.events.error);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    Linking.addListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) {
        console.log('Initial URL:', url);
        const {id} = handleDeepLink({url});
        if (id) {
          navigation.navigate('EventDetail', {eventId: id});
        }
      }
    });

    return () => {
      Linking.removeAllListeners('url');
    };
  }, [navigation]);

  const handleChangeMode = (_mode: 'Upcoming' | 'Past') => {
    setMode(_mode);
  };

  const onRefresh = async () => {
    await dispatch(fetchEvents());
  };

  const renderCarouselItem = ({item}: any) => {
    return (
      <CarouselItem
        _id={item._id}
        name={item.name}
        venue={item.venue}
        date={moment(item.start_date).toDate()}
        imageURI={item.images[0]}
        category={item.category}
      />
    );
  };

  const renderListItem = ({item}: any) => {
    return (
      <EventListItem
        _id={item._id}
        name={item.name}
        venue={item.venue}
        date={moment(item.start_date).toDate()}
        images={item.images}
        category={item.category}
      />
    );
  };

  if (status === 'loading' && !events.length) {
    return (
      <SafeAreaView style={styles.status}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (status === 'failed') {
    console.error('Error fetching events: ', error);
    return (
      <SafeAreaView style={styles.status}>
        <Text>Something went wrong!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.appLogo}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.appIcon}
          />
          <Text style={styles.title}>EventHub</Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('Search', {searchText: ''});
          }}>
          <Icon name="search-outline" size={28} />
        </Pressable>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={status === 'loading'}
            onRefresh={onRefresh}
          />
        }>
        {events.length > 0 && (
          <>
            <View style={styles.carouselContainer}>
              <Text style={styles.sectionTitle}>Featured Events</Text>
            </View>
            <Carousel
              loop
              width={screenWidth}
              height={screenHeight / 4}
              autoPlay={true}
              autoPlayInterval={3000}
              data={events.slice(0, 3)}
              scrollAnimationDuration={1000}
              renderItem={renderCarouselItem}
            />
          </>
        )}

        <View style={styles.eventList}>
          <View style={styles.eventListHeader}>
            <Pressable
              onPress={() => {
                handleChangeMode(mode === 'Upcoming' ? 'Past' : 'Upcoming');
              }}>
              <Text style={styles.sectionTitle}>
                {mode}{' '}
                {((mode === 'Upcoming' && filter.category) || 'Event') + 's'}
              </Text>
            </Pressable>

            {events.length > 0 && mode === 'Upcoming' && (
              <Pressable
                onPress={() => {
                  navigation.navigate('Filter');
                }}>
                <Icon name="filter-outline" size={24} />
              </Pressable>
            )}
          </View>
          <FlatList
            data={getEventList(events, mode, filter)}
            renderItem={renderListItem}
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
