
import React, { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom"
import MetaData from "../layout/MetaData"
import "./Search.css"
const Search:React.FC = () => {
    let navigate = useNavigate()
    const [keyword,setKeyword] = useState("")
    const searchSubmitHandler = (e:React.SyntheticEvent<EventTarget>) =>{
        e.preventDefault();
        if(keyword.trim()){
           
            navigate(`/products/${keyword}`);
        }
        else{
            navigate(`/products`);
        }
    }
  return (
    <Fragment>
         <MetaData title="Search Product"/>
        <form className="searchBox" onSubmit={searchSubmitHandler}> 
            <input
            type="text"
            placeholder="Search Product ..."
            onChange = {(e) => setKeyword(e.target.value)}
            />

            <input type="submit" value="Search"/>
        </form>
    </Fragment>
  )
}

export default Search
