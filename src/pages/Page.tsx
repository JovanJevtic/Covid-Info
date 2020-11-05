import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import GlobalData from '../components/GlobalData';

import { getWorldData } from '../api/index';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [ isHome, setIsHome ] = useState<boolean>();

  useEffect(() => {
    if (name === 'Globalno') {
      setIsHome(true);
    } else {
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
          <IonTitle>Covid Info - {name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          { isHome && <GlobalData /> }
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Page;
