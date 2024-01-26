import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/RootStackParamList';

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
};

const EventListItem = ({
  _id,
  name,
  venue,
  date,
  images,
}: EventListItemProps) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'EventDetail'>
    >();

  const handlePress = () => {
    navigation.navigate('EventDetail', {eventId: _id});
  };

  const replaceImage =
    'https://static.vecteezy.com/system/resources/previews/024/232/464/original/theater-concert-stage-with-curtain-cartoon-scene-free-vector.jpg';
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
          uri: images && images.length > 0 ? images[0] : replaceImage,
        }}
        style={styles.image}
      />
    </Pressable>
  );
};

export default EventListItem;
