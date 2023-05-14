import { DragNDropPathType, IssueType } from '../types'

export const reorder = (
  arr: IssueType[],
  startIndex: number,
  endIndex: number
) => {
  const result = [...arr]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const isSamePlace = (DnDData: DragNDropPathType) => {
  return (
    DnDData.source.droppableId === DnDData.destination?.droppableId &&
    DnDData.source.index === DnDData.destination?.index
  )
}
