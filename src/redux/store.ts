import { configureStore, isAsyncThunkAction } from '@reduxjs/toolkit'
import { isAnyOf } from '@reduxjs/toolkit'

import { listenerMiddleware } from './middleware'
import { repositorySlice } from './slices/repository'
import { shiftItems } from '../redux/slices/repository'
import { getRepository } from './thunks/getRepository'

 const isARequestAction = isAsyncThunkAction(getRepository)

listenerMiddleware.startListening({
  matcher: isAnyOf(shiftItems, isARequestAction),
  effect: (_action, listenerApi) => {
    //@ts-ignore
    const state: RootState = listenerApi.getState()

    localStorage.setItem(
      state.repository.html_url,
      JSON.stringify(state.repository)
    )
  },
})

export const store = configureStore({
  reducer: {
    repository: repositorySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
