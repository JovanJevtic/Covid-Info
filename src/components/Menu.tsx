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

import React from 'react';
import { useLocation } from 'react-router-dom';
import './Menu.css';

interface AppPage {
  url: string;
  imgSrc: string
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Globalno',
    url: '/page/Globalno',
    imgSrc: '',
  },
  {
    title: 'Bosna i Hercegovina',
    url: '/page/Bosna i Hercegovina',
    imgSrc: '',
  },
  {
    title: 'Srbija',
    url: '/page/Srbija',
    imgSrc: '',
  },
  {
    title: 'Hrvatska',
    url: '/page/Hrvatska',
    imgSrc: '',
  },
  {
    title: 'Crna Gora',
    url: '/page/Crna Gora',
    imgSrc: '',
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader style={{marginBottom: 20, marginTop: -22}}>Covid Info</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonImg slot="start" src={appPage.imgSrc} />
                  <IonLabel>{appPage.title}</IonLabel>
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
