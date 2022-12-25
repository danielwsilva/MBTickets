import React from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Skeleton as SkeletonDefault } from 'moti/skeleton';

export const Skeleton = () => {
  return (
    <View style={{ marginHorizontal: RFValue(16) }}>
      {[1, 2].map((item) => (
        <View key={item} style={{ marginBottom: RFValue(16) }}>
          <SkeletonDefault colorMode="light" show height={100} width={'100%'} />
        </View>
      ))}
    </View>
  );
};
