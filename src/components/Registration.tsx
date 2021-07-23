import { IonButton, IonCard, IonImg, IonInput, IonText } from "@ionic/react";
import EventEmitter from "events";
import { storefront } from "ionicons/icons";
import { useState } from "react";
import MaskedInput from "../mask/reactTextMask";
import { getData, Store } from "../pages/Store";
import './Registration.css'

async function getSMS(phone) {
    let res = await  getData("ПолучитьСМС", {
        Телефон:    phone    
    })

    Store.dispatch({type: "SMS", SMS: res.SMS})

}


export function Login(props): JSX.Element {
    let phone = "";
    let elem = <>
        <IonCard>
            <IonImg src = "assets/asMarket.jpg" />

            <div className=" lg-input ml-1 mr-1 mb-2">
                <div>+7</div>
                <MaskedInput 
                    mask={[ ' ','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/]}
                    className="m-input"
                    placeholder = "(---)-- -- --"
                    onChange={(e: any) => {
                        let st = e.target.value;
                        phone = "+7" + st;
                    }}
                        
                />
            </div>
            <IonButton expand="block"
                class = "ml-1 mr-1 mb-2"
                onClick= {()=>{
                    //getSMS(phone)
                    Store.dispatch({type: "route", route: "/page/SMS"})
                }}
            >
                Получить СМС
            </IonButton>
        </IonCard>
    </>

    return elem
}

export function SMS(props):JSX.Element {
    let elem = <>
        <IonCard>
            <IonImg src = "assets/asMarket.jpg"/>
            <div>
                <IonText> ВВедите СМС </IonText>
            </div>
            <div className="lg-sms-box">
                <div className="lg-div-1">----</div>
                <input
                    className = "lg-sms-input"
                />
            </div>
            <IonButton
                class = "ml-1 mr-1 mb-1"
                expand = "block"
            >
                Получить СМС еще раз
            </IonButton>
        </IonCard>
    </>

    return elem;
}