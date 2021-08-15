
import { useEffect, useState } from 'react';
import { IonCard, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/react';

import './Carousel.css';

import { car_jarr } from '../pages/Store';

export function Carousel():JSX.Element {
    const [info, setInfo] = useState( car_jarr )
    
    useEffect(()=>{
    },[])
    let elem = <>
    </>
    
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

    return <>
    <div className="body">
    <div className="slider">
        <div className="slides">
            <input type="radio" name="radio-btn" id="radio1"/>
            <input type="radio" name="radio-btn" id="radio2"/>
            <input type="radio" name="radio-btn" id="radio3"/>
            <input type="radio" name="radio-btn" id="radio4"/>

            <div className="slide first">
                <img src="/assets/carousel img/1.png" alt=""/>
            </div>
            <div className="slide">
                <img src="/assets/carousel img/2.png" alt=""/>
            </div>
            <div className="slide">
                <img src="/assets/carousel img/3.png" alt=""/>
            </div>
            <div className="slide">
                <img src="/assets/carousel img/4.png" alt=""/>
            </div>

            <div className="navigation-auto">
                <div className="auto-btn1"></div>
                <div className="auto-btn2"></div>
                <div className="auto-btn3"></div>
                <div className="auto-btn4"></div>
            </div>
        </div>
        <div className="navigation-manual">
            <label htmlFor="radio1" className="manual-btn"></label>
            <label htmlFor="radio2" className="manual-btn"></label>
            <label htmlFor="radio3" className="manual-btn"></label>
            <label htmlFor="radio4" className="manual-btn"></label>
        </div>
    </div>
    </div>
    </>
}

