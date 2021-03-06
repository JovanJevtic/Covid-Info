import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonImg,
  IonSearchbar,
} from '@ionic/react';

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Menu.css';
import { globe, globeOutline } from 'ionicons/icons';
import { getCountryFlag, getCountriesList } from '../api/index';
 
interface AppPage {
  url: string;
  imgSrc: string
  title: string;
  iso: string;
}

interface CountryPage {
  country: string;
  url: string;
  countryInfo: countryInfo;
  shouldHide?: boolean;
}

type countryInfo = {
  flag: string;
}

const appPages: AppPage[] = [
  {
    title: 'Globalno',
    url: '/page/Globalno',
    imgSrc: globe,
    iso: 'Worldwide',
  },
  {
    title: 'Srbija',
    url: '/page/SRB',
    imgSrc: 'https://disease.sh/assets/img/flags/rs.png',
    iso: 'SRB',
  },
  {
    title: 'Hrvatska',
    url: '/page/HRV',
    imgSrc: 'https://disease.sh/assets/img/flags/hr.png',
    iso: 'HRV',
  },
  {
    title: 'Bosna i Hercegovina',
    url: '/page/BIH',
    imgSrc: 'https://disease.sh/assets/img/flags/ba.png',
    iso: 'BIH',                                               
  },
  {
    title: 'Crna Gora',
    url: '/page/MNE',
    imgSrc: 'https://disease.sh/assets/img/flags/me.png',
    iso: 'MNE',
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  const [ countriesList, setCountriesList ] = useState<CountryPage[]>([]);
  const [ sortedCountriesList, setSortedCountriesList ] = useState<CountryPage[]>([]);
  const [ searchedCountriesList, setSearchedCountriesList ] = useState<CountryPage[]>([]);
  const [ searchText, setSearchText ] = useState<string>('');

  const getFlags = async () => {
    appPages.forEach(async page => {

      if (page.iso === 'Worldwide' || page.iso === 'Globalno') return;

      const response = await getCountryFlag(page.iso)
      page.imgSrc = response.countryInfo.flag;
    })
  }

  const getAllCountries = async () => {
    const response = await getCountriesList();
    setCountriesList(response)
  }

  const sortCountries = (a: any, b: any) => {
    if (a.cases < b.cases) {
      return 1;
    }
    
    if (a.cases > b.cases) {
      return -1;
    }

    return 0;
  }

  const handleSearchInput = (e: any) => {
    const query = e.currentTarget.value.toLowerCase();
    requestAnimationFrame(() => {
      sortedCountriesList.forEach(item => {
        const shouldShow = item.country.toLowerCase().indexOf(query) > -1;
        item.shouldHide = !shouldShow;
      });
    });
  }

  useEffect(() => {
    getFlags();
    getAllCountries();
  }, []);

  useEffect(() => {
    setSortedCountriesList(countriesList.sort(sortCountries));
  }, [countriesList])

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader style={{marginBottom: 20, marginTop: -22}}>Covid Info</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  {appPage.title != 'Globalno' && <IonImg style={{maxWidth: 30, maxHeight: 30}} slot="start" src={appPage.imgSrc} />} 
                  {/* appPage.title != 'Globalno' && <IonText style={{width: 50, color: 'white'}} slot="start"> {appPage.iso} </IonText> */}
                  { appPage.title === 'Globalno' && <IonIcon icon={globeOutline} style={{maxWidth: 28, maxHeight: 30, fontSize: 30, color: 'white'}} slot="start" /> }
                  <IonLabel style={{fontWeight: 'bold'}}>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonSearchbar onIonInput={handleSearchInput} value={searchText} onIonChange={e => setSearchText(e.detail.value!)} debounce={1000}></IonSearchbar>
        <IonList id="allCountries-list">
          {
            sortedCountriesList.map((countrie, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem style={{display: countrie.shouldHide ? 'none' : 'block'}} className={location.pathname === `/page/${countrie.country}` ? 'selected' : ''} routerLink={`/page/${countrie.country}`} routerDirection="none" lines="none" detail={false}>
                     <IonImg style={{maxWidth: 30, maxHeight: 30}} slot="start" src={countrie.countryInfo.flag} /> 
                    <IonLabel style={{fontWeight: 'bold'}}>{countrie.country}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })
          }
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
