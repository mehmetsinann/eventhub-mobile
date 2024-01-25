import {View, Text, SafeAreaView, Image, Pressable, Share} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {Event} from '../../types/Event';
import {RootState} from '../../redux/store';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './EventDetail.style';
import {CategoryBadge} from '../../components/CategoryBadge';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

type EventDetailProps = {
  route: {
    params: {
      eventId: string;
    };
  };
};

const EventDetail = ({route}: EventDetailProps) => {
  const navigation = useNavigation();
  const {eventId} = route.params;
  const event = useSelector((state: RootState) =>
    state.events.events.find((_event: Event) => _event._id === eventId),
  );

  const goBack = () => {
    navigation.goBack();
  };

  const handleShare = async () => {
    Share.share({
      message: `Check out this event: ${event?.name}`,
      url: 'https://eventhub.com',
    });
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
        <View style={styles.info}>
          <Icon name="location-outline" size={20} color={'#777'} />
          <Text style={styles.infoText}>{event?.venue.name}</Text>
        </View>
        <View style={styles.info}>
          <Icon name="calendar-clear-outline" size={20} color={'#777'} />
          <Text style={styles.infoText}>
            {event && moment(event.start_date).format('DD MMM, YYYY HH:MM')} -{' '}
            {event && moment(event.end_date).format('DD MMM, YYYY HH:MM')}
          </Text>
        </View>
      </View>
      {/* TODO: add here a carousel for multiple images */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydCUyMGNyb3dkfGVufDB8fDB8fHww',
        }}
        style={styles.image}
      />
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{event?.description}</Text>
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
    </SafeAreaView>
  );
};

export default EventDetail;
