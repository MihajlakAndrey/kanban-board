import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../redux/store'
import { getRepository } from '../redux/thunks/getRepository'

const Search = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [inputVal, setInputVal] = useState('')

  const onBtnClick = () => {
    if (!inputVal) {
      return alert('Enter repo URL')
    }
    dispatch(getRepository(inputVal))
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          style={{ flex: '1' }}
          placeholder="Enter repo URL"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <Button disabled={!inputVal} onClick={onBtnClick} variant="primary">
          Load Issues
        </Button>
      </div>
    </>
  )
}

export default Search
