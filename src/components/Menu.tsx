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
  IonImg
} from '@ionic/react';

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Menu.css';
import { globe, globeOutline } from 'ionicons/icons';
import { getCountryFlag } from '../api/index';
 
interface AppPage {
  url: string;
  imgSrc: string
  title: string;
  iso: string;
}

const appPages: AppPage[] = [
  {
    title: 'Globalno',
    url: '/page/Globalno',
    imgSrc: globe,
    iso: 'Worldwide',
  },
  {
    title: 'Bosna i Hercegovina',
    url: '/page/BIH',
    imgSrc: 'https://disease.sh/assets/img/flags/ba.png',
    iso: 'BIH',                                               
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
    title: 'Crna Gora',
    url: '/page/MNE',
    imgSrc: 'https://disease.sh/assets/img/flags/me.png',
    iso: 'MNE',
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  const getFlags = async () => {
    appPages.forEach(async page => {

      if (page.iso === 'Worldwide' || page.iso === 'Globalno') return;

      const response = await getCountryFlag(page.iso)
      page.imgSrc = response.countryInfo.flag;
    })
  }

  useEffect(() => {
    getFlags();
  }, [])

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader style={{marginBottom: 20, marginTop: -22}}>Covid Info</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  { appPage.title != 'Globalno' && <IonImg style={{maxWidth: 30, maxHeight: 40}} slot="start" src={appPage.imgSrc} /> }
                  { appPage.title === 'Globalno' && <IonIcon icon={globe} style={{maxWidth: 30, maxHeight: 40, fontSize: 30, color: 'white'}} slot="start" /> }
                  <IonLabel style={{fontWeight: 'bold'}}>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
