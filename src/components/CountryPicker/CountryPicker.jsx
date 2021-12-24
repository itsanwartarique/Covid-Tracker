import React,{ useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../Api";

const  CountryPicker = ( {handleCountryChange}) => {
    const [fetchedCountries, setFetchedCoutries] = useState([]);
    useEffect (() => {
       
        const fetchApi = async () => {
            setFetchedCoutries( await fetchCountries());
        }
        fetchApi();

    },[setFetchedCoutries])

    return (
        <FormControl className = {styles.formControl}>
            <NativeSelect defaultValue= "" onChange= {(e) => handleCountryChange(e.target.value)}>
                <option value = "" className= {styles.option}>Global</option>
                {fetchedCountries.map((country, i) => <option key= {i} value= {country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}
export default CountryPicker;