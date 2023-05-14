import { issue, profile } from '../mocks'


export type StatusType = 'open' | 'close' | 'progress'

export type DragNDropPathType = {
  draggableId: string
  type: string
  source: {
    index: number
    droppableId: StatusType
  }
  reason: string
  mode: string
  destination: {
    index: number
    droppableId: StatusType
  }
  combine: any
}

export type IssueType = typeof issue

export type ProfileType = typeof profile

export type IssuesStateType = {
  open: IssueType[]
  progress: IssueType[]
  close: IssueType[]
}
