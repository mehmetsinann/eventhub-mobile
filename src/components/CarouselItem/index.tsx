import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/RootStackParamList';

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
};

const CarouselItem = ({
  _id,
  name,
  venue,
  date,
  imageURI,
}: CarouselItemProps) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'EventDetail'>
    >();

  const handlePress = () => {
    navigation.navigate('EventDetail', {eventId: _id});
  };

  const replaceImage =
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydCUyMGNyb3dkfGVufDB8fDB8fHww';
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image
        source={{
          uri: imageURI || replaceImage,
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
          <Text style={styles.infoText}>
            {moment(date).format('DD MMM, YYYY HH:MM')}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default CarouselItem;
