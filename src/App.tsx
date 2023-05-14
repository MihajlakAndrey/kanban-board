import './App.css'
import Search from './components/Search'
import Container from 'react-bootstrap/Container'
import { DragDropContext } from 'react-beautiful-dnd'
import { Row, Col, Alert, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { shiftItems } from './redux/slices/repository'
import { AppDispatch } from './redux/store'
import Board from './components/Board'
import { selectError, selectIsLoading, selectRepoUrl } from './redux/selectors'
import RepoInfo from './components/RepoInfo'
import { isSamePlace } from './utils/reorder'
import { DragNDropPathType } from './types'

export enum IssuesStatuses {
  open = 'ToDo',
  progress = 'In Progress',
  close = 'Done',
}

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const err = useSelector(selectError)
  const repoUrl = useSelector(selectRepoUrl)
  const loading = useSelector(selectIsLoading)

  const handleDragDrop = (results: DragNDropPathType) => {
    if (!results.destination) return
    if (isSamePlace(results)) return
    dispatch(shiftItems(results))
  }

  return (
    <Container className="App">
      <Container fluid>
        <Search />
        <RepoInfo />
        {/* @ts-ignore */}
        <DragDropContext onDragEnd={handleDragDrop}>
          {err ? (
            <Alert variant={'danger'}>
              <h3>Some error</h3>
            </Alert>
          ) : loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            repoUrl && (
              <Row style={{textAlign:'center'}}>
                {(
                  Object.keys(IssuesStatuses) as Array<
                    keyof typeof IssuesStatuses
                  >
                ).map((key) => (
                  <Col key={key} xs={4}>
                    <h4>{IssuesStatuses[key]}</h4>
                    <Board status={key} />
                  </Col>
                ))}
              </Row>
            )
          )}
        </DragDropContext>
      </Container>
    </Container>
  )
}

export default App
