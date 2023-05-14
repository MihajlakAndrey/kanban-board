import { useSelector } from 'react-redux'

import {
  selectError,
  selectProfileName,
  selectRepoName,
  selectRepoStars,
} from '../redux/selectors'

const RepoInfo = () => {
  const err = useSelector(selectError)
  const profileName = useSelector(selectProfileName)
  const repoName = useSelector(selectRepoName)
  const stars = useSelector(selectRepoStars)
  return (
    <>
      {!err && repoName && profileName && (
        <div className="info" style={{ textAlign: 'left' }}>
          <a href={`https://github.com/${profileName}`}>{profileName}</a>
          {' > '}
          <a href={`https://github.com/${profileName}/${repoName}`}>
            {repoName}
          </a>
          &nbsp; &#9733;
          {(stars / 1000).toFixed() + 'k' + ' ' + 'stars'}
        </div>
      )}
      <br />
    </>
  )
}

export default RepoInfo
