import React, { useState, useEffect } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import StatisticsForm from "./components/StatisticsForm";

function App() {
  const [lists, setLists] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await fetch("https://api.openbrewerydb.org/breweries");
      const json = await response.json();
      //console.log(json);
      if (json && json.length > 0) {
        setLists(json);
      } else {
        alert("Something went wrong!");
      }
    };
    fetchAllData().catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    let fdata = lists.filter((item) => {
      return (
      item.city.toLowerCase().includes(searchValue.toLowerCase()) || 
      item.state.toLowerCase().includes(searchValue.toLowerCase())
      )});
    //console.log("fdata", fdata);
    setFilteredResults(fdata);

  };

  const handleSelect = (e) => {
    let value = e.target.value;
    if(value === "all") {
      const newList = [...lists];
      setFilteredResults(newList);
    } else {
      const newList = [...lists];
      let selectItems = newList.filter((item)=>{
        return item.brewery_type.toLowerCase() === value
      })
      console.log(selectItems)
      setFilteredResults(selectItems);
    }
  }

  
  //console.log("filteredresults", filteredResults);

  // 1234567890 => (123) 456-7890
  const formatNumber = (phoneStr) => {
    let cleaned = ("", phoneStr).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };

  return (
    <div className="whole-page">
      <SideNav setSearchInput={setSearchInput} />

      <div className="main-container">
        <StatisticsForm lists = {lists} />
        <h1>Brewery Company List</h1>

        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => searchItems(e.target.value)}
        />
        <select className="brewselect" id="brewId" onChange={handleSelect} >
          <option value="all">All</option>
          <option value="micro">Micro</option>
          <option value="large">Large</option>
          <option value="brewpub">Brewpub</option>
        </select>
        <button type="button" className="button-3">
          Search
        </button>
        <ul>
          {searchInput.length > 0 || filteredResults.length > 0
            ? filteredResults.map((item) => {
                const {
                  id,
                  brewery_type,
                  city,
                  country,
                  name,
                  phone,
                  postal_code,
                  state,
                  street,
                  website_url,
                } = item;
                return (
                  <li key={id} className="brew-list">
                    <h2> {name} </h2>
                    <h3> Brewery type: {brewery_type} </h3>
                    <p> Address: {street} </p>
                    <p>
                      {city}, {state}, {postal_code}, {country}
                    </p>
                    {phone ? <p>📞: {formatNumber(phone)}</p> : null}
                    {website_url ? <p> 🌐: {website_url}</p> : null}
                  </li>
                );
              })
            : lists ? lists.map((item) => {
                const {
                  id,
                  brewery_type,
                  city,
                  country,
                  name,
                  phone,
                  postal_code,
                  state,
                  street,
                  website_url,
                } = item;
                return (
                  <li key={id} className="brew-list alignleft">
                    <span className="spn-bold">Title: </span> 
                    {name}&emsp;
                    <span className="spn-bold">Address: </span> 
                    {street}, {city}, {state}, {postal_code}
                  </li>
                ) 
              }): <p>loading</p>}
        </ul>
      </div>
    </div>
  );
}

export default App;
