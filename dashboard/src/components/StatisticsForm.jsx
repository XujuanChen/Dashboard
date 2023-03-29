import React, {useState} from 'react'

const StatisticsForm = ({ lists }) => {

  const brewtype = new Set();
  const newyork = [];
  const largeBrew = [];

  lists?lists.map((item)=>{
      brewtype.add(item.brewery_type);
      if (item.state_province === "New York") {
        newyork.push(item);
      }

      if (item.brewery_type === "large") {
        largeBrew.push(item)
      }
  }): null

  // console.log(brewtype.size)
  // console.log(newyork)
  // console.log(largeBrew)

  return (
    <div className="display-container">

      <div className="display-box">
        <h2>{brewtype.size} Brewery types:</h2>
        {
          Array.from(brewtype).map((type, index)=>{
            return <li key={index}>{type}</li>
          })
        }
      </div>

      <div className="display-box">
        <h2>There are {largeBrew.length} Large Brewery:</h2>
        {
          largeBrew.map((c)=>{
            return <li>{c.name}, {c.postal_code}</li>
          })
        }
      </div>

      <div className="display-box">
        <h2>New York</h2>
        <h3>has {newyork.length} Brewery</h3>
        {
          newyork.map((c)=>{
            return <li key={c.id}>{c.name}</li>
          })
        }
      </div>

  </div>
  )
}

export default StatisticsForm 