import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import GlobalData from '../components/GlobalData';
import CountryData from '../components/CountryData';

import { getWorldData } from '../api/index';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [ isHome, setIsHome ] = useState<boolean>();
  const [ isCountry, setIsCountry ] = useState<boolean>();
  const [ title, setTitle ] = useState<string>('');

  useEffect(() => {
    if (name === 'BIH') {
      setTitle('Bosna i Hercegovina');
    } else if (name === 'SRB') {
      setTitle('Srbija');
    } else if (name === 'HRV') {
      setTitle('Hrvatska');
    } else if (name === 'MNE') {
      setTitle('Crna Gora')
    } else {
      setTitle(name)
    }
  }, [name])

  useEffect(() => {
    if (name === 'Globalno') {
      setTitle('Globalno')
      setIsHome(true);
      setIsCountry(false)
    } else {
      setIsCountry(true);
      setIsHome(false)
    }
  }, [name])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Covid Info - {title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          { isHome && <GlobalData /> }
          { isCountry && <CountryData country={name} /> }
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Page;
