import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonImg,
  IonTitle,
  IonText
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

  useEffect(() => {
    getFlags();
    getAllCountries();
  }, [])

  useEffect(() => {
    console.log(countriesList);
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
                  { appPage.title === 'Globalno' && <IonIcon icon={globe} style={{maxWidth: 28, maxHeight: 30, fontSize: 30, color: 'white'}} slot="start" /> }
                  <IonLabel style={{fontWeight: 'bold'}}>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonList id="allCountries-list">
          {
            countriesList.map((countrie, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === `/page/${countrie.country}` ? 'selected' : ''} routerLink={`/page/${countrie.country}`} routerDirection="none" lines="none" detail={false}>
                   
                    <IonLabel style={{fontWeight: 'bold'}}>{countrie.country}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })
          }
        </IonList>
        <div className="menu-footer">
          <a target="_blank" rel="noopener" href="https://jevtic.netlify.app/">Created by: Jovan Jevtic;</a>
          <p className="footer-copyright">Copyright© 2020, all rights reserved;</p>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
