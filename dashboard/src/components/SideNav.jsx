import React, {useState} from 'react'

const SideNav = ({ setSearchInput }) => {

  return (
    <div className="sidenav">
     <h1>🧋BreweryDash</h1>

      <button type="button" className='btn button-3' onClick={()=>setSearchInput("")}>🏠 Dashboard </button>
      <br />
      <br />
      <button type="button" className='btn button-3'> 🔎 Search </button>
      <br />
      <br />
      <button type="button" className='btn button-3' > 🧐 About </button>

    </div>
  )
}

export default SideNav