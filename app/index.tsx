import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Slider from './Slider'
import Onboarding from './Onboarding'

const index = () => {
  return (
   <GestureHandlerRootView style={{flex:1}}>
    {/* <Slider/> */}
    <Onboarding/>
   </GestureHandlerRootView>
  )
}

export default index

const styles = StyleSheet.create({})