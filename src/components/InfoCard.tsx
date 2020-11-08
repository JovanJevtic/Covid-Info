import React, { useState, useEffect } from 'react';

import {
    IonLabel,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonItem,
} from '@ionic/react';

import './InfoCard.css'

interface Props {
    title: string | undefined;
    value: any;
    color: string;
}

const InfoCard: React.FC<Props> = ({ title, value, color }) => {

    const [ cardColor, setCardColor ] = useState('');
    const formatedValue = new Intl.NumberFormat('IN').format(value);

    useEffect(() => {
        if (color === 'red') {
            setCardColor('#ed576b')
        } else if (color === 'blue') {
            setCardColor('#50c8ff')
        } else if (color === 'green') {
            setCardColor('#2dd36f')
        }
    }, [])

    return(
        <IonCard style={{borderBottom: `5px solid ${cardColor}`}} className="card-wrapp" color={'light tint'} >
            <IonItem color={'light tint'}>
                <IonCardTitle style={{fontWeight: 'bold'}} className="card-title"> {title} </IonCardTitle>
            </IonItem>
            <IonItem color={'light tint'}>
                <IonCardContent style={{color: cardColor}} className="card-content"> {formatedValue} </IonCardContent>
            </IonItem>
        </IonCard>
    );
}

export default InfoCard;