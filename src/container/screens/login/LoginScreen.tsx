import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
