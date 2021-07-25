import { IonAlert, IonButton, IonCard, IonImg, IonInput, IonText, IonToolbar } from "@ionic/react";
import { logoSoundcloud } from "ionicons/icons";
import { useState } from "react";
import MaskedInput from "../mask/reactTextMask";
import { getData1C, Store } from "../pages/Store";
import './Registration.css'

let phone = "";

async function getSMS(phone) {

    let login = Store.getState().login;
    let res = await  getData1C("ПолучитьСМС", {
        Телефон:    phone,    
    })

    console.log(res)
    if(res.СМС !== undefined) {
        if(login === "") login = { SMS: res.СМС }
        else login.СМС = res.СМС
        Store.dispatch({type: "login", login: login})
        Store.dispatch({type: "route", route: "/page/SMS"})
    }

}


export function Login(props): JSX.Element {
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
                    let login = Store.getState().login
                    if(login === "") login = { Код: phone }
                    else login.Код = phone
                    Store.dispatch({type: "login", login: login})
                    getSMS(phone)
                }}
            >
                Получить СМС
            </IonButton>
            <IonToolbar></IonToolbar>
        </IonCard>
    </>

    return elem
}

export function SMS(props):JSX.Element {
    const [tires, setTires] = useState("----")
    const [alert1, setAlert1] = useState(false)
    const [alert2, setAlert2] = useState(false)
    let elem = <>
        <IonCard>
            <IonImg src = "assets/asMarket.jpg"/>
            <div className = "a-center f-27">
                <IonText> Введите СМС </IonText>
            </div>
            <div className="lg-sms-box">
                <div className="lg-div-1">
                    <span></span>
                    { tires }
                </div>
                <IonInput
                    className = "lg-sms-input"
                    type = "text"
                    inputMode = "numeric"
                    maxlength = { 4 }
                    onIonChange = {(e)=>{
                        let val = e.detail.value;
                        switch (val?.length) {
                            case 0:     setTires("----");break;       
                            case 1:     setTires("---");break;       
                            case 2:     setTires("--");break;       
                            case 3:     setTires("-");break;       
                            case 4:     setTires("");break;       
                            default:    setTires("----");break;       
                        }
                        if(val?.length === 4) {
                            let SMS = Store.getState().login.СМС
                            console.log(Store.getState().login)
                            if(SMS === val) {
                                setAlert1(true)    
                                Store.dispatch({type: "auth", auth: true})
                                Store.dispatch({type: "route", route: "/page/profile"})
                                localStorage.setItem("marketAs.login", phone)
                            } else 
                                setAlert2(true)
                        }
                        
                    }}
                    />
            </div>
            <div>
                <IonButton
                    class = "ml-1 mr-1 mb-1"
                    expand = "block"
                    onClick = {()=>{
                        getSMS(phone)
                    }}
                >
                    Получить СМС еще раз
                </IonButton>
            </div>
            <IonToolbar>

            </IonToolbar>
        </IonCard>
        <IonAlert
          isOpen={ alert1 }
          onDidDismiss={() => setAlert1(false)}
          cssClass='my-custom-class'
          header={'Успех'}
          message={'Регистрация завершена'}
          buttons={['Ок']}
        />
        <IonAlert
          isOpen={ alert2 }
          onDidDismiss={() => setAlert2(false)}
          cssClass='my-custom-class'
          header={'Ошибка'}
          subHeader={'СМС'}
          message={'неправильный СМС'}
          buttons={['Ок']}
        />
    </>

    return elem;
}