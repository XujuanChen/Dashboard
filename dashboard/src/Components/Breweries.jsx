import React, {useState, useEffect} from 'react'

const Breweries = () => {
  const [brews, setBrews] = useState("");

  useEffect(()=>{
    const fetchBrew = async() => {
      const res = await fetch("https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=3");
      const brewdata = await res.json();
      
      if (brewdata && brewdata.length >0) {
        setBrews(brewdata);
        console.log(brews);
      }
    }
    fetchBrew().catch(console.error);
  }, [])

  return (
    <div className="sidenav">
      <h1>Brew list</h1>
     <ul>
      {
        brews && brews.length >0 ? brews.map((item)=>{
          return <li key={item.id}> {item.city} </li>
        }) : null
      }

     </ul>
    </div>
  )
}

export default Breweries