import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'

import { selectRepoIssues } from '../redux/selectors'
import { IssueType, StatusType } from '../types'
import ItemCard from './ItemCard'

type PropsType = {
  status: StatusType
}

const Board = ({ status }: PropsType) => {
  const issues = useSelector(selectRepoIssues)

  return (
    <Droppable droppableId={status} type="COLUMN">
      {(provided) => (
        <div
          style={{
            height: '100%',
            backgroundColor: 'lightgray',
          }}
          className="board"
          data-board-cy={status}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {issues[status].map((issue: IssueType, index: number) => (
            <Draggable
              draggableId={issue.title + '-' + index}
              key={issue.id}
              index={index}
            >
              {(provided) => {
                if (
                  typeof provided.draggableProps.onTransitionEnd === 'function'
                ) {
                  window?.requestAnimationFrame(() =>
                    //@ts-ignore
                    provided.draggableProps.onTransitionEnd({
                      propertyName: 'transform',
                    })
                  )
                }
                return (
                  <div
                    data-card-cy={issue.id}
                    style={{ display: 'flex', justifyContent: 'center' }}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <ItemCard key={issue.id} issue={issue} />
                  </div>
                )
              }}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Board
