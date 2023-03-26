import React, { useState, useEffect } from "react";
import "./App.css";
import SideNav from "./Components/sideNav";
import Breweries from "./Components/Breweries";

function App() {
  const mySecret = import.meta.env.VITE_API_KEY;
  const url =
    "https://min-api.cryptocompare.com/data/all/coinlist?&api_key=" + mySecret;

  const [lists, setLists] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(lists.Data).filter((item) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      
      setFilteredResults(filteredData);
      console.log(filteredResults);

    } else {
      
      setFilteredResults(Object.keys(lists.Data));
      console.log(filteredResults);
      
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await fetch('https://api.openbrewerydb.org/breweries');
      const json = await response.json();
      // console.log(json);
      if (json && json.length > 0) {
        setLists(json);
      } else {
        alert("Something went wrong!")
      }
    };
    fetchAllData().catch(console.error);
  }, []);

  return (
    <div className="whole-page">
      <Breweries />

      <div>
      <h1>My List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
      <ul>

        {
          lists && lists.length > 0 ? lists.map((item)=>{
            // console.log(item.city)
            return <li key={item.id}> {item.city}, {item.state} </li>
          }) : null
        }

      </ul>
      </div>
    </div>
  );
}

export default App;
