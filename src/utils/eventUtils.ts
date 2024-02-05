import moment from 'moment';

import {placeHolderImage} from '../constants/placeHolderImage';
import {Event} from '../types/Event';
import {FilterState} from '../redux/slices/filterSlice';

export const formatDate = (date: Date) => {
  return moment(date).format('DD MMM, YYYY HH:MM');
};

export const getPlaceHolderImage = (category: string) => {
  return placeHolderImage[
    (category.toLowerCase() as keyof typeof placeHolderImage) || 'default'
  ];
};

export const getEventList = (
  events: Event[],
  mode: 'Upcoming' | 'Past' = 'Upcoming',
  filter: FilterState = {
    category: '',
    startDate: new Date(),
    endDate: null,
    eventType: null,
    orderBy: 'date',
  },
) => {
  const now = moment();

  const filteredEvents = events.filter(event => {
    const isUpcoming = moment(event.start_date).isAfter(now);
    const isSameCategory =
      !filter.category || filter.category === event.category;
    const isAfterStartDate =
      !filter.startDate || moment(filter.startDate).isBefore(event.start_date);
    const isBeforeEndDate =
      !filter.endDate || moment(filter.endDate).isAfter(event.end_date);
    const isSameEventType =
      filter.eventType === null ||
      (filter.eventType === 'free') === event.is_free;

    return mode === 'Upcoming'
      ? isUpcoming &&
          isSameCategory &&
          isAfterStartDate &&
          isBeforeEndDate &&
          isSameEventType
      : !isUpcoming;
  });

  return filteredEvents.sort((a, b) => {
    if (filter.orderBy === 'date') {
      return moment(a.start_date).diff(moment(b.start_date));
    }
    return a.name.localeCompare(b.name);
  });
};

export const getFeaturedEvents = (events: Event[]) => {
  const now = moment();
  const upcomingEvents = events
    .filter(event => moment(event.start_date).isAfter(now))
    .sort((a, b) => moment(a.start_date).diff(moment(b.start_date)));
  return upcomingEvents.slice(0, 3);
};

export const handleDeepLink = (event: any) => {
  const deepLink = event.url;
  const params = deepLink.split('?')[1];
  const id = params.split('=')[1];
  return {id};
};
