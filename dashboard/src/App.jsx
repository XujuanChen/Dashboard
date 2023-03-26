import React, { useState, useEffect } from "react";
import "./App.css";
import Breweries from "./Components/Breweries";

function App() {
  const mySecret = import.meta.env.VITE_API_KEY;
  const url =
    "https://min-api.cryptocompare.com/data/all/coinlist?&api_key=" + mySecret;

  const [lists, setLists] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {

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

      <div className="main-container">
        <div className="display-container">
        <div className="display-box">
        🌞
          <h2>display  display 1</h2>
        </div>

        <div className="display-box">
        🌞
          <h2>display  display 2</h2>
        </div>

        <div className="display-box">
        🌞
          <h2>display  display 3</h2>
        </div>

        </div>
      <h1>Brewery Company List</h1>
      <h2>Search for breweries by name:</h2>
      <form action="">
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />

      <button type="button">Search</button>

      </form>

      <ul>

        {
          lists && lists.length > 0 ? lists.map((item)=>{
            console.log(item)
            const {id, brewery_type, city, country, name, phone, postal_code, state, street, website_url } = item;
            return (
              <li className="brew-block" key={id}>  
                <h2> {name} </h2>
                <h3> Brewery type: {brewery_type} </h3>
                <p> Address: {street} </p>
                <p> {city}, {state}, {postal_code} </p>
                <p> 📞: {phone} </p>
                <p> 🌐: {website_url }</p>
              </li>
            )

          }) : null
        }

      </ul>
      </div>
    </div>
  );
}

export default App;
