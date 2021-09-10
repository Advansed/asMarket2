
import { useEffect, useState } from 'react';
import { IonCard, IonItem, IonLabel, IonList, IonSlide, IonSlides, IonText } from '@ionic/react';

import './Carousel.css';

import { Store } from '../pages/Store';
import { Good } from './Goods';

const slideOpts = {
    initialSlide: 1,
    speed: 1200,
    autoplay: true,
  };

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

export function Carousel():JSX.Element {
    const [info,    setInfo]    = useState<any>( [] )
    const [upd,     setUpd]     = useState(0)
     
    useEffect(()=>{

        setInfo(Store.getState().actions)

    },[upd])

    Store.subscribe({num: 7, type: "actions", func: ()=>{
        setInfo(Store.getState().actions)
    }})

    function Slides():JSX.Element {
        let elem = <>
            <IonSlides pager={ true } options={ slideOpts }
                class="slider"
                onIonSlidesDidLoad = {(e)=>{
                    let ass : any = e.target
                    ass.startAutoplay();
                }}
            >
                { info.map((e, ind) =>{ 
                    return <>
                        <IonSlide translate = "yes" key = { ind } 
                            onClick = {()=>{
                                Store.dispatch({type: "action", action: e})
                                Store.dispatch({type: "route", route: "/page/action"})
                            }}                
                        >
                            <img src={ e.Картинка } alt ="" className = "sl-img"
                        />
                </IonSlide>

                    </>
                })}
            </IonSlides>
        </>
        return elem
    }

    return <Slides />

    // return <>
    // <div className="body">
    // <div className="slider">
    //     <div className="slides">
    //         <input type="radio" name="radio-btn" id="radio1"/>
    //         <input type="radio" name="radio-btn" id="radio2"/>
    //         <input type="radio" name="radio-btn" id="radio3"/>
    //         <input type="radio" name="radio-btn" id="radio4"/>

    //         <div className="slide first">
    //             <img src="/assets/carousel img/1.png" alt=""/>
    //         </div>
    //         <div className="slide">
    //             <img src="/assets/carousel img/2.png" alt=""/>
    //         </div>
    //         <div className="slide">
    //             <img src="/assets/carousel img/3.png" alt=""/>
    //         </div>
    //         <div className="slide">
    //             <img src="/assets/carousel img/4.png" alt=""/>
    //         </div>

    //         <div className="navigation-auto">
    //             <div className="auto-btn1"></div>
   //             <div className="auto-btn2"></div>
    //             <div className="auto-btn3"></div>
    //             <div className="auto-btn4"></div>
    //         </div>
    //     </div>
    //     <div className="navigation-manual">
    //         <label htmlFor="radio1" className="manual-btn"></label>
    //         <label htmlFor="radio2" className="manual-btn"></label>
    //         <label htmlFor="radio3" className="manual-btn"></label>
    //         <label htmlFor="radio4" className="manual-btn"></label>
    //     </div>
    // </div>
    // </div>
    // </>

}


export function Action():JSX.Element {
    const [info, setInfo] = useState<any> ()
    
    useEffect(()=>{
        setInfo(Store.getState().action);
        console.log(Store.getState().action)
    },[])

    Store.subscribe({num: 8, type: "action", func: ()=>{
        setInfo(Store.getState().action)
        console.log("sunscribe")
        console.log(Store.getState().action)
    }})

    let items = <></>

    console.log(info)
    for(let i = 0; i < info?.Товары.length;i++){
        items = <>  
            { items }
            <Good info = { info.Товары[i] } />
        </>
    }

    let elem = <>
        <IonCard class="w-90">
            <IonList >
            <IonItem class="m-1">
                    <IonLabel position="stacked"> Наименование </IonLabel>
                    <IonText>{ info?.Наименование }</IonText>
                </IonItem>
                <IonItem class="m-1">
                    <IonLabel position="stacked"> Текст </IonLabel>
                    <IonText>{ info?.Заголовок }</IonText>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked"> Описание </IonLabel>
                    <IonText> { info?.Описание} </IonText>
                </IonItem>
            </IonList>
        </IonCard>
        <div className="g-content">
            { items }
        </div>
    </>

    return elem
}