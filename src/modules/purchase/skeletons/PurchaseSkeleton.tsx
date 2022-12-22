import React from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Skeleton } from 'moti/skeleton';

export const PurchaseSkeleton = () => {
  return (
    <View style={{ marginHorizontal: RFValue(16) }}>
      {[1, 2].map((item) => (
        <View key={item} style={{ marginBottom: RFValue(16) }}>
          <Skeleton colorMode="light" show height={100} width={'100%'} />
        </View>
      ))}
    </View>
  );
};
