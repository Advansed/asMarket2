import { useEffect, useState } from "react"
import { Store } from "../pages/Store"
import { IonCard, IonImg, IonIcon, IonChip, IonText } from '@ionic/react';

import './Goods.css'
import { cartOutline } from "ionicons/icons";


export function Goods():JSX.Element {
    const [info, setInfo]   = useState<any>([])
    const [sub, setSub]     = useState<any>()
    const [upd, setUpd]     = useState(0)

    Store.subscribe({num: 21, type: "sub", func: ()=>{
        console.log("subscribe 1")
        setSub(Store.getState().sub)
    }})
    Store.subscribe({num: 22, type: "goods", func: ()=>{
        console.log("subscribe 2 - " + upd.toString())
        setUpd(upd + 1)
    }})

    useEffect(()=>{
        console.log("useEffect 2 - 3")
        if(sub !== "") {
            let goods = Store.getState().goods
            let jarr : any = []
            goods.forEach(elem => {
                if(elem.СубКатегория === sub.Код) jarr = [...jarr, elem]
            });
            setInfo(jarr)
        }
    }, [sub, upd])

    useEffect(()=>{
        console.log("useEffect 1")
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
        <div className="g-content">
            { elem }
        </div>
    </> 
}

export function   Good(props):JSX.Element {
  let info = props.info

  let elem = <></>

  let pr = 100 - info.Цена * 100 / info.СтараяЦена;

  if(info !== undefined)
    elem = <>
        <div className="g-card-div">
            <IonCard class="g-card"
                onClick={()=>{
                Store.dispatch({type: "gcard", gcard: info})
                Store.dispatch({type: "route", route: "/page/" + info.Код})
                }}
            >
                <div className="g-price">
                    {
                    info.СтараяЦена > 0 
                        ?<>
                        <div className="red f-14">
                            <b>{  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(info?.Цена)}</b>
                        </div>
                        <div className="t-line f-14 ml-1">
                            <b>{  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(info?.СтараяЦена)}</b>
                        </div>
                        </>
                        :<div className="f-14">
                        <b >{  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(info?.Цена)}</b>
                        </div>
                    }
                    
                </div>                    
                <IonImg src={ info.Картинка } className="g-img"/>
                <div className="ml-1 mr-1">
                    <IonText> { info.Наименование } </IonText>
                </div>
                <div>
                </div>
            </IonCard>
        </div>
    </>
  return elem
}