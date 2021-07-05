import { useEffect, useState } from "react"
import { Store } from "../pages/Store"
import { IonCard, IonImg, IonText, IonChip } from '@ionic/react';

import './Goods.css'


export function Goods():JSX.Element {
    const [info, setInfo] = useState<any>([])

    Store.subscribe({num: 21, type: "goods", func: ()=>{
        setInfo(Store.getState().goods)
    }})

    useEffect(()=>{
        setInfo(Store.getState().goods)
    }, [])

    let elem = <>
        <IonCard>
            <div> Ghbdtn </div>
        </IonCard>
    </>

    return elem
}

