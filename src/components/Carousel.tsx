
import { useEffect, useState } from 'react';
import { IonCard, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/react';

import './Carousel.css';
import { car_jarr } from '../pages/Store';

export function Carousel():JSX.Element {
    const [info, setInfo] = useState( car_jarr )

    useEffect(()=>{
    },[])
    let elem = <></>

    for(let i = 0; i < info.length; i++) {
        elem = <>
            { elem }
            <IonCard class="cr-card"
                style= {{
                    backgroundColor: info[i].Цвет,
                }}
            >
                <IonCardTitle class="cr-title">{ info[i].Имя }</IonCardTitle>
                <IonCardSubtitle class="cr-subtitle">{ info[i].Описание}</IonCardSubtitle>
                
                <IonButton class="cr-img">
                    Подробнее
                </IonButton>
            </IonCard>
        </>
    }

    return <div className="cr-content mr-05"> { elem } </div>
}

