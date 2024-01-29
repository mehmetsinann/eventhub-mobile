import moment from 'moment';

import {placeHolderImage} from '../constants/placeHolderImage';
import {Event} from '../types/Event';

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
  filter: any = {
    category: '',
    startDate: new Date(),
    endDate: null,
  },
) => {
  const upcomingEvents = events.filter(event => {
    return moment(event.start_date).isAfter(moment());
  });

  const pastEvents = events.filter(event => {
    return moment(event.start_date).isBefore(moment());
  });

  if (mode === 'Upcoming') {
    return upcomingEvents.filter(event => {
      if (filter.category && filter.category !== event.category) {
        return false;
      }

      if (
        filter.startDate &&
        moment(filter.startDate).isAfter(event.start_date)
      ) {
        return false;
      }

      if (filter.endDate && moment(filter.endDate).isBefore(event.end_date)) {
        return false;
      }

      return true;
    });
  }
  return pastEvents;
};
