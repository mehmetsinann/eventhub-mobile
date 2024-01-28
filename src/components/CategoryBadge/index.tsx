import {View, Text} from 'react-native';
import React from 'react';

import {styles} from './styles';

type CategoryBadgeProps = {
  category: string;
};

const BADGE_COLORS: {[key: string]: string} = {
  concert: '#ea7c6e',
  opera: '#77add1',
  theater: '#97e37a',
};

export const CategoryBadge = ({category}: CategoryBadgeProps) => {
  return (
    <View
      style={[
        styles.box,
        {
          backgroundColor: BADGE_COLORS[category.toLowerCase()] || '#BBB',
        },
      ]}>
      <Text style={styles.text}>{category}</Text>
    </View>
  );
};
