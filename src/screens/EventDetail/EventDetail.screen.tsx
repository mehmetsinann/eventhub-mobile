import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  Share,
  ScrollView,
} from 'react-native';

import {useSelector} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootState} from '../../redux/store';
import {CategoryBadge} from '../../components/CategoryBadge';
import {Event} from '../../types/Event';
import {RootStackParamList} from '../../types/RootStackParamList';
import {screenHeight, screenWidth} from '../../constants/screenDimensions';
import {formatDate, getPlaceHolderImage} from '../../utils/eventUtils';

import {styles} from './EventDetail.style';

export type EventDetailProps = {
  route: {
    params: {
      eventId: string;
    };
  };
};

const EventDetail = ({route}: EventDetailProps) => {
  const {eventId} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const event = useSelector((state: RootState) =>
    state.events.events.find((_event: Event) => _event._id === eventId),
  );

  const goBack = () => {
    navigation.goBack();
  };

  const handleShare = async () => {
    Share.share({
      message: `Check out this event: ${event?.name}`,
      url: 'https://eventhub.com/event?id=' + event?._id,
    });
  };

  const handleAddressClick = () => {
    const URL = `https://www.google.com/maps/search/?api=1&query=${event?.venue.latitude},${event?.venue.longitude}`;
    navigation.navigate('WebView', {uri: URL});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={goBack}>
          <Icon name="chevron-back-outline" size={32} />
        </Pressable>
        <Pressable onPress={handleShare}>
          <Icon name="share-outline" size={32} />
        </Pressable>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{event?.name}</Text>
        {event?.category && <CategoryBadge category={event?.category} />}
      </View>
      <View style={styles.infoContainer}>
        <Pressable
          onPress={() => {
            navigation.push('Search', {searchText: event?.venue.name || ''});
          }}>
          <View style={styles.info}>
            <Icon name="location-outline" size={20} color={'#777'} />
            <Text style={styles.infoText}>{event?.venue.name}</Text>
          </View>
        </Pressable>
        <View style={styles.info}>
          <Icon name="calendar-clear-outline" size={20} color={'#777'} />
          <Text style={styles.infoText}>
            {event && formatDate(event.start_date)} -{' '}
            {event && formatDate(event.end_date)}
          </Text>
        </View>
      </View>
      <ScrollView>
        {event?.images && event?.images.length < 2 ? (
          <Image
            source={{
              uri: event?.images[0] || getPlaceHolderImage(event.category),
            }}
            style={styles.image}
          />
        ) : (
          <Carousel
            loop
            width={screenWidth}
            height={screenHeight / 4}
            autoPlay={true}
            autoPlayInterval={3000}
            data={event?.images || []}
            scrollAnimationDuration={1000}
            renderItem={({item}) => (
              <Image
                source={{
                  uri: item,
                }}
                style={styles.image}
              />
            )}
          />
        )}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{event?.description}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Artists</Text>
          {event?.artists.map(artist => (
            <Text key={artist.name} style={styles.description}>
              {artist.name}
            </Text>
          ))}
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Tickets</Text>
          {event?.is_free && <Text>This event is free!</Text>}
          {event?.ticket_info &&
            !event.is_free &&
            Object.entries(event.ticket_info).map(([category, price]) => (
              <Text key={category} style={styles.description}>
                {(category.charAt(0).toUpperCase() + category.slice(1))
                  .split('_')
                  .join(' ')}{' '}
                - <Text style={styles.price}>{price}</Text>
              </Text>
            ))}
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Rules</Text>
          <Text style={styles.description}>
            Age limit: {event?.rules.age_limit}
          </Text>
          <Text style={styles.description}>
            Alcohol: {event?.rules.alcohol ? 'Allowed' : 'Not allowed'}
          </Text>
          <Text style={styles.description}>
            Dress code: {event?.rules.dress_code}
          </Text>
          <Text style={styles.description}>
            Camera allowed: {event?.rules.camera_allowed ? 'Yes' : 'No'}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Address</Text>
          <Pressable onPress={handleAddressClick}>
            <Text style={styles.description}>
              {event?.venue.name} - {event?.venue.street_number}{' '}
              {event?.venue.street}, {event?.venue.city}, {event?.venue.state},{' '}
              {event?.venue.country}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetail;
