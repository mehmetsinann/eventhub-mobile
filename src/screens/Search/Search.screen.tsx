import {
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  FlatList,
  Text,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {getEventList} from '../../utils/eventUtils';
import {searchEvents} from '../../services/eventsDataManager';
import EventListItem from '../../components/EventListItem';
import {Event} from '../../types/Event';

import {styles} from './Search.style';

export type SearchProps = {
  route: {
    params: {
      searchText: string;
    };
  };
};

const Search = ({route}: SearchProps) => {
  const {searchText} = route.params;
  const inputRef = useRef<TextInput>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState<string>('');
  const navigation: any = useNavigation();

  useEffect(() => {
    inputRef && inputRef.current?.focus();
  }, []);

  const getSearchedEvents = useCallback(async () => {
    (search || searchText) &&
      searchEvents(search || searchText).then(data => {
        setEvents(data);
      });
  }, [search, searchText]);

  useEffect(() => {
    getSearchedEvents();
  }, [getSearchedEvents]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Pressable onPress={goBack}>
          <Icon name="chevron-back-outline" size={32} />
        </Pressable>
        <TextInput
          placeholder="Search"
          style={styles.input}
          value={search || searchText}
          onChangeText={setSearch}
          editable={!searchText}
          ref={inputRef}
        />
      </View>
      {(search || searchText) && !events.length && (
        <Text style={styles.noEventText}>No events found</Text>
      )}
      <FlatList
        data={getEventList(events)}
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
        style={styles.eventList}
      />
    </SafeAreaView>
  );
};

export default Search;
