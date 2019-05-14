import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native'

export default class AppLoader extends Component {
  render() {
    return (
      <View style={[styles.horizontal]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  horizontal: {
    padding: 10,
    position: "absolute",
    top: "60%"
  }
});