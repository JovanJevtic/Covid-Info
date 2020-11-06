import React, { useState, useEffect } from 'react';
import { getCountryData } from '../api/index';
import {
    IonLabel,
} from '@ionic/react';


interface Props {
    country: string;
}

interface Data {
    active?: number;
    todayCases?: number;
    todayDeaths?: number;
    todayRecovered?: number;
    cases?: number;
    tests?: number;
    recovered?: number;
    deaths?: number;
    affectedCountries?: number;
}

const CountryData: React.FC<Props> = ({ country }) => {
    
    const [ data, setData ] = useState<Data>({});

    //* Daily Data
    const [ activeCasesNumber, setActiveCases ] = useState<number>();
    const [ todayCasesNumber, setTodayCases ] = useState<number>();
    const [ todayDeathsNumber, setTodayDeaths ] = useState<number>();
    const [ todayRecoveredNumber, setTodayRecovered ] = useState<number>();

    //* Alltime Data
    const [ casesNumber, setCases ] = useState<number>();
    const [ testsNumber, setTests ] = useState<number>();
    const [ recoveredNumber, setRecovered ] = useState<number>();
    const [ deathsNumber, setDeaths ] = useState<number>();
    const [ affectedCountriesNumber, setAffectedCountries ] = useState<number>();

    const getData = async () => {

        if (country === 'Globalno') return;

        const response = await getCountryData(country);
        setData(response);
    }

    useEffect(() => {
        getData();
    }, [country])

    useEffect(() => {
        if (Object.keys(data).length != 0) {
          const {  
            affectedCountries,
            cases, 
            deaths, 
            recovered, 
            tests, 
            todayCases, 
            todayDeaths, 
            todayRecovered,
            active,
        } = data;
    
        setActiveCases(active);
        setAffectedCountries(affectedCountries);
        setCases(cases)
        setDeaths(deaths)
        setRecovered(recovered)
        setTests(tests)
        setTodayCases(todayCases)
        setTodayDeaths(todayDeaths)
        setTodayRecovered(todayRecovered)
    
        }
    }, [data]);

    return(
        <>
            <IonLabel>Active cases: {activeCasesNumber} </IonLabel>
            <IonLabel>Cases: {casesNumber} </IonLabel>
            <IonLabel>Deaths: {deathsNumber} </IonLabel>
            <IonLabel>Recovered: {recoveredNumber} </IonLabel>
            <IonLabel>Tests: {testsNumber} </IonLabel>
            <IonLabel>Today cases: {todayCasesNumber} </IonLabel>
            <IonLabel>Today deaths: {todayDeathsNumber} </IonLabel>
            <IonLabel>Today recovered: {todayRecoveredNumber} </IonLabel>
        </>
    );
}

export default CountryData;