import { Text, View } from 'react-native'
import React, { Component } from 'react'
import SpeechRecognisation from './src/components/SpeechRecognisation'
import { Provider } from 'react-redux'
import store from './src/redux/SpeechStore'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SpeechData from './src/components/SpeechData'

const Stack = createStackNavigator()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown:false
          }}>
            <Stack.Screen name="SpeechData" component={SpeechData}/>
            <Stack.Screen name="SpeechRecognisation" component={SpeechRecognisation}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}