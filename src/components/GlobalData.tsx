import React, { useState, useEffect } from 'react';
import { getWorldData } from '../api/index';
import {
    IonLabel,
} from '@ionic/react';

import InfoCard from './InfoCard';

import './InfoCard.css';

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

const GlobalData: React.FC = () => {

    const [ data, setData] = useState<Data>({});

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

    const getGloabalData = async () => {
        const response = await getWorldData();
        setData(response);
    }
    
    useEffect(() => {
        getGloabalData();
    }, [])

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
            <div className="infoCard-row">
                <InfoCard title='Aktivnih slucajeva:' value={activeCasesNumber} color={'blue'} /> 
                <InfoCard title='Ukupnih slucajeva:' value={casesNumber} color={'blue'} />
            </div>
            <div className="infoCard-row">
                <InfoCard title='Ukupno smrti:' value={deathsNumber} color={'red'} /> 
                <InfoCard title='Smrti danas:' value={todayDeathsNumber} color={'red'} />
            </div>
            <div className="infoCard-row">
                <InfoCard title='Oporavljenih danas:' value={todayRecoveredNumber} color={'green'} /> 
                <InfoCard title='Ukupno oporavljenih:' value={recoveredNumber} color={'green'} />
            </div>
            <div className="infoCard-row">
                <InfoCard title='Testiranih:' value={testsNumber} color={'blue'} /> 
                <InfoCard title='Slucajeva danas:' value={todayCasesNumber} color={'blue'} />
            </div>
        </>
    );
}

export default GlobalData;