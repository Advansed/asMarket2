import { IonCard, IonCardContent, IonCardHeader, IonCol, IonIcon, IonItem, IonRow } from "@ionic/react"
import { useEffect, useState } from "react"
import { Store } from "../pages/Store"
import QRCode from "react-qr-code";
import { arrowBackOutline } from "ionicons/icons";

export function Orders(props):JSX.Element{
    const [info, setInfo] = useState<any>([])

    useEffect(()=>{
        setInfo(Store.getState().orders)
    }, [])
    let elem = <></>

    for(let i = 0;i < info.length;i++){
        elem = <>
            { elem }
            <IonCard class="f-card">
                <IonCardHeader>
                <IonRow>
                    <IonCol size="8"> <b>{ info[i].Номер }</b> { info[i].Дата } </IonCol>
                    <IonCol size="4" class="a-right">
                    <b>{ info[i].Статус}</b>
                    </IonCol>
                </IonRow>
                </IonCardHeader>
                <IonCardContent>
                <IonRow>
                    <IonCol size="4">
                    {/* <img src = { info[i].Картинка === "" ? imageSharp : info[i].Картинка}  alt = ""/>   */}
                    
                    <QRCode value= { info[i].Номер + ";" + info[i].Дата + ";" } size={ 100 }/>
                    </IonCol>
                    <IonCol size="8">
                    <IonRow>
                        <IonCol>{ info[i].Фирма }</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>{ info[i].Доставка } <b>{ info[i].СуммаДокумента } руб</b></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>{ info[i].Адрес }</IonCol>
                    </IonRow>
                    </IonCol>
                </IonRow>
                </IonCardContent>
            </IonCard>
        </>
    }
    return <>
    <div>
        <div>
            <IonIcon icon = { arrowBackOutline } 
                class= "back ml-1 mt-1"
                onClick = {()=>{
                Store.dispatch({type: "route", route: "back"})
                }}
            />  
        </div>
        <div>
            { elem }
        </div>
    </div>
    </>
}