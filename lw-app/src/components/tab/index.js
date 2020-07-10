import React from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo';
import { BottomTabBar } from 'react-navigation-tabs';

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomTabBar: {
    backgroundColor: 'transparent',
  },
});

export default function TabBar(props) {
  return (
    <BlurView tint="light" intensity={90} style={styles.blurView}>
      <BottomTabBar {...props} style={styles.bottomTabBar} />
    </BlurView>
  );
}