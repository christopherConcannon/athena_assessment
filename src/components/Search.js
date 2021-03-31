import React from 'react'

const Search = ({ query, setQuery }) => {

  return (
    <div className='Search'>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search names...'/>
    </div>
  )
}

export default Search
