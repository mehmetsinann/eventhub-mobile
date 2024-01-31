import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import {RootStackParamList} from '../../types/RootStackParamList';
import {formatDate, getPlaceHolderImage} from '../../utils/eventUtils';

import {styles} from './styles';

type CarouselItemProps = {
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
  imageURI?: string;
  category: string;
};

const CarouselItem = ({
  _id,
  name,
  venue,
  date,
  imageURI,
  category,
}: CarouselItemProps) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'EventDetail'>
    >();

  const handlePress = () => {
    navigation.navigate('EventDetail', {eventId: _id});
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image
        source={{
          uri: imageURI || getPlaceHolderImage(category),
        }}
        style={styles.image}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['rgba(255, 255, 255, 0)', 'rgba(221, 221, 221, 0.9)']}
        style={styles.infoContainer}>
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
          <Text style={styles.infoText}>{formatDate(date)}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default CarouselItem;
