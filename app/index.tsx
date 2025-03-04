import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Slider from './Slider'

const index = () => {
  return (
   <GestureHandlerRootView style={{flex:1}}>
    <Slider/>
   </GestureHandlerRootView>
  )
}

export default index

const styles = StyleSheet.create({})