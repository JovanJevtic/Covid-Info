import axios from 'axios';

export const getWorldData = async () => {
    let url = 'https://disease.sh/v3/covid-19/all'; 
    
    const response = await axios.get(url);
    const data = await response.data;

    return data;
}

export const getCountryData = async (country: string) => {
    let url = `https://disease.sh/v3/covid-19/countries/${country}`;

    const response = await axios.get(url);
    const data = await response.data;
    
    return data;
}

export const getCountryFlag = async (country: string) => {
    let url = `https://disease.sh/v3/covid-19/countries/${country}`;
    
    const response = await axios.get(url);
    const data = await response.data;

    return data;
}