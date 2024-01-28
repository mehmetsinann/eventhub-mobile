import {View, SafeAreaView, TextInput, Pressable, FlatList} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';

import moment from 'moment';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

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
  const [events, setEvents] = React.useState<Event[]>([]);
  const [search, setSearch] = React.useState<string>('');
  const navigation: any = useNavigation();

  useEffect(() => {
    inputRef && inputRef.current?.focus();
  }, []);

  const getSearchedEvents = useCallback(async () => {
    const response =
      search || searchText
        ? await axios.get(
            'http://localhost:3000/events/search?query=' +
              (search || searchText),
          )
        : null;
    const data = await response?.data;
    setEvents(data);
  }, [search, searchText]);

  React.useEffect(() => {
    getSearchedEvents();
  }, [getSearchedEvents]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
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
      <FlatList
        data={events}
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
        style={styles.eventList}
      />
    </SafeAreaView>
  );
};

export default Search;
