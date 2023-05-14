import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DragNDropPathType, IssuesStateType, IssueType } from '../../types'
import { reorder } from '../../utils/reorder'
import { getRepository } from '../thunks/getRepository'

type StateType = {
  repoName: string
  profileName: string
  html_url: string
  stargazers_count: number
  issues: IssuesStateType
  loading: boolean
  error: null | boolean
}

const initialState: StateType = {
  repoName: '',
  profileName: '',
  html_url: '',
  stargazers_count: 0,
  issues: {
    open: [],
    progress: [],
    close: [],
  },
  loading: false,
  error: null,
}

export const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    shiftItems(state, action: PayloadAction<DragNDropPathType>) {
      const { source, destination } = action.payload

      if (source.droppableId === destination?.droppableId) {
        state.issues[source.droppableId] = reorder(
          state.issues[source.droppableId],
          source.index,
          destination.index
        )
      } else {
        const [moved] = state.issues[source.droppableId].splice(source.index, 1)

        state.issues[destination.droppableId].splice(
          destination.index,
          0,
          moved
        )
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRepository.fulfilled, (state, action) => {
      const { profileName, repoName, stargazers_count, html_url, issues } =
        action.payload

      state.profileName = profileName
      state.repoName = repoName
      state.stargazers_count = stargazers_count
      state.html_url = html_url
      state.loading = false
      state.error = null

      if (Array.isArray(action.payload.issues)) {
        state.issues = {
          open: [],
          progress: [],
          close: [],
        }
        action.payload.issues.forEach((element: IssueType) => {
          if (element.state === 'open') {
            return state.issues.open.push(element)
          }
          if (element.state === 'close') {
            return state.issues.close.push(element)
          }
          return state.issues.progress.push(element)
        })
      } else {
        //@ts-ignore
        state.issues = issues
      }
    })
    builder.addCase(getRepository.rejected, (state) => {
      state.issues = {
        open: [],
        progress: [],
        close: [],
      }
      state.stargazers_count = 0
      state.html_url = ''
      state.loading = false
      state.error = true
    })
    builder.addCase(getRepository.pending, (state) => {
      state.loading = true
    })
  },
})

export const { shiftItems } = repositorySlice.actions

export default repositorySlice.reducer
