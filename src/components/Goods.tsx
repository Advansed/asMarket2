import { useEffect, useState } from "react"
import { Store } from "../pages/Store"
import { IonCard, IonImg, IonIcon, IonChip, IonText, IonButton, IonCardSubtitle, IonCardTitle} from '@ionic/react';

import './Goods.css'
import { useHistory } from "react-router";
import { addBasket } from "./Basket";


export function Goods():JSX.Element {
    const [info, setInfo]   = useState<any>([])
    const [sub, setSub]     = useState<any>()
    const [upd, setUpd]     = useState(0)

    Store.subscribe({num: 21, type: "sub", func: ()=>{
        setSub(Store.getState().sub)
    }})
    Store.subscribe({num: 22, type: "goods", func: ()=>{
        setUpd(upd + 1)
    }})

    useEffect(()=>{
        if(sub !== "") {
            let goods = Store.getState().goods
            let jarr : any = []
            goods.forEach(elem => {
                if(elem.СубКатегория === sub?.Код) jarr = [...jarr, elem]
            });
            setInfo(jarr)
        }
    }, [sub, upd])

    useEffect(()=>{
        setSub(Store.getState().sub)
    }, [])

    let elem = <></>
    for(let i = 0;i < info.length;i++){
        elem = <>
            { elem }
            <Good info = { info[i] }  />
        </>
    }

    return <>

        <div className="catalogue">
        <div className="g-content">
            { elem }
        </div>
    </div>
    </> 
}

export function   Good(props):JSX.Element {
  let info = props.info

  let elem = <></>
  let hist = useHistory();

  let pr = 100 - info.Цена * 100 / info.СтараяЦена;

  if(info !== undefined)
    elem = <>
        <div className="g-card-div">
            <IonCard class="g-card"
                onClick={()=>{
                    Store.dispatch({type: "gcard", gcard: info})
                    hist.push("/page/_" + info.Код)    
//                    Store.dispatch({type: "route", route: "/page/#" + info.Код})
                }}
            >
                                 
                <IonImg src={ info.Картинка } className="g-img"/>
                <div className="ml-1 mr-1">
                    <IonCardSubtitle className="g-text"> { info.Наименование } </IonCardSubtitle>
                </div>
                <div className="g-position">
                <IonButton className="g-size-btn" color="new" size="small"
                    onClick = {(e)=>{
                        addBasket(info, 1)
                        e.stopPropagation()
                    }}
                >+</IonButton>
                <IonButton className="g-size-btn2" color="new" size="small">
                    {
                    info.СтараяЦена > 0 
                        ?<>
                        <div className="red f-12">
                            <b>{  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(info?.Цена)}</b>
                        </div>
                        <div className="t-line f-12 ml-1">
                            <b>{  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(info?.СтараяЦена)}</b>
                        </div>
                        </>
                        :<div className="f-12">
                        <b >{  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(info?.Цена)}</b>
                        </div>
                    }
                    
                </IonButton>  
                <IonButton className="g-size-btn" color="new" size="small"
                    onClick = {(e)=>{
                        addBasket(info, -1)
                        e.stopPropagation()
                    }}                
                >-</IonButton>
                </div>
                <div>
                </div>
            </IonCard>
        </div>
    </>
  return elem
}