// src/lib/store/index.tsx
'use client'
import React, { ReactNode } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import uiReducer from './uiSlice'

const store = configureStore({
  reducer: {
    ui: uiReducer
  }
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}