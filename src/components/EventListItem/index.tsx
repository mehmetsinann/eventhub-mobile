import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

import {placeHolderImage} from '../../constants/placeHolderImage';
import {RootStackParamList} from '../../types/RootStackParamList';

import {styles} from './styles';

type EventListItemProps = {
  _id: string;
  name: string;
  venue: {
    name: string;
    latitude: number;
    longitude: number;
    street_number: string;
    street: string;
    city: string;
    state: string;
    country: string;
    timezone: string;
  };
  date: Date;
  images?: string[];
  category: string;
};

const EventListItem = ({
  _id,
  name,
  venue,
  date,
  images,
  category,
}: EventListItemProps) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'EventDetail'>
    >();

  const handlePress = () => {
    navigation.navigate('EventDetail', {eventId: _id});
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Icon name="person-outline" size={24} />
          <Text style={styles.infoText}>{name}</Text>
        </View>
        <View style={styles.info}>
          <Icon name="location-outline" size={24} />
          <Text style={styles.infoText}>{venue.name}</Text>
        </View>
        <View style={styles.info}>
          <Icon name="calendar-clear-outline" size={24} />
          <Text style={styles.infoText}>
            {moment(date).format('DD MMM, YYYY HH:MM')}
          </Text>
        </View>
      </View>
      <Image
        source={{
          uri:
            images && images.length > 0
              ? images[0]
              : placeHolderImage[
                  (category.toLowerCase() as keyof typeof placeHolderImage) ||
                    'default'
                ],
        }}
        style={styles.image}
      />
    </Pressable>
  );
};

export default EventListItem;
