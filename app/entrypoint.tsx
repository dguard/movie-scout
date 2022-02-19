/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import { NavigationStack as Navigator } from 'navigation'

import { configureStore } from 'store'

const { persistor, store } = configureStore()

function RootNavigation() {
  return <Navigator />
}

export function Entrypoint() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <RootNavigation />
        </PersistGate>
      </Provider>
    </PaperProvider>
  )
}
