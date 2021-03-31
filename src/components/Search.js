import React, { useState } from 'react'

const Search = ({ data }) => {
  const [ query, setQuery] = useState('')

  return (
    <div className='Search'>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search names...'/>
    </div>
  )
}

export default Search
