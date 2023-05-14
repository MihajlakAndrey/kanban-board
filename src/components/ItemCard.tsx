import Card from 'react-bootstrap/Card'
import moment from 'moment'

import { IssueType } from '../types'

type PropsType = {
  issue: IssueType
}

const ItemCard = ({ issue }: PropsType) => {
  return (
    <Card >
      <Card.Body>
        <Card.Title>{issue.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          #{issue.id} opened{' '}
          {moment.utc(issue.created_at).local().startOf('days').fromNow()}
        </Card.Subtitle>

        <Card.Text>
          {issue.user.login} | Comments : {issue.comments}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ItemCard
