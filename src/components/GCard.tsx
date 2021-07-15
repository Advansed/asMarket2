import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonLabel, IonRow, IonText, IonToolbar } from "@ionic/react";
import { addOutline, arrowBackOutline, checkmarkCircleOutline, removeOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Store } from "../pages/Store";
import { addBasket } from "./Basket";
import './GCard.css'

export function   GCard(props):JSX.Element {
  
  const [good,    setGood]  = useState<any>({})
  const [upd,     setUpd]   = useState(0)
  const [info,    setInfo]  = useState<any> ({
        Код:            good.Код,
        Наименование:   good.Наименование,
        Цена:           good.Цена,
        Количество:     1,
        Сумма:          good.Цена,
        Картинка:       good.Картинка
  });
 

  useEffect(()=>{
      let basket  = Store.getState().basket;
      
      let amount  = 0;
      basket.forEach(elem => {
        if(elem.Код === props.info){
          amount = elem.Количество
        }
      });

      let gcard = Store.getState().gcard
      if(gcard === "") 
        Store.dispatch({type: "route", route: "/page/root"})
      else {
        setGood( gcard )
        setInfo({
            Код:                    gcard.Код,
            Наименование:           gcard.Наименование,
            Цена:                   gcard.Цена,
            Количество:             amount,
            Сумма:                  amount * gcard.Цена,
            Картинка:               gcard.Картинка
        })  
      }
  },[])

  function Количество(){
    return info.Количество 
  }

  let elem = <>
        <IonCard class="f-card" >
          <IonRow>
            <IonCol size="5">
              {/* <IonButton fill="clear" 
                onClick={()=>{
                  Store.dispatch({type: "route", route: "back"})
                }}
              >
                <IonIcon icon={ arrowBackOutline } />
              </IonButton> */}
              <img className="" src={  good.Картинка } alt="" />
            </IonCol>
            <IonCol size="7">
              <IonItem>
                <h4 className="a-center f-18"><b>{ good.Наименование }</b></h4>
              </IonItem>
              <IonItem class="f-14">
                <IonLabel position="stacked"> Цена </IonLabel>
                  <div className="mt-1 mb-1 ml-1">
                    <div>
                      <IonText class="f-price a-center"><b>{ good.Цена?.toFixed(2) + " ₽/шт " } </b></IonText>
                    </div>
                  </div>
                <IonChip>
                  <IonIcon icon = { checkmarkCircleOutline }/>
                  <IonText class="f-12"> { good.Количество > 0 ? "В Наличии" : "Под заказ" } </IonText>
                </IonChip>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonItem lines = "none" class="gc-item">
            <IonButton slot = "start" shape="round" class="gc-but"
              onClick={()=>{
                info.Количество = info.Количество - 1 
                if(info.Количество  < 0) info.Количество = 0
                info.Сумма = info.Количество * info.Цена;
                setInfo(info);setUpd(upd + 1);
                addBasket(good, -1)
              }}
            >
              <IonIcon icon = { removeOutline } />
            </IonButton>
            <div className="w-100">
              <div className="gc-div-1 f-16">
                { Количество()?.toString() + " шт" } 
              </div>      
              <div className="gc-div-2 f-16">
                { (info.Цена * Количество())?.toString() + " руб" } 
              </div>
            </div>
            <IonButton slot = "end" shape = "round" class="gc-but"
              onClick={()=>{
                info.Количество = info.Количество + 1 
                info.Сумма = info.Количество * info.Цена;
                setInfo(info);setUpd(upd + 1);
                addBasket(good, 1)
              }}
            >
              <IonIcon icon = { addOutline } />
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Описание</IonLabel>
            <IonText class="gc-text-2">
              { good.Описание }
            </IonText>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Производитель</IonLabel>
            <IonText class="gc-text-2">
              { good.Производитель }
            </IonText>
          </IonItem>
          <IonToolbar>
              <IonButton
                onClick = {()=>{
                  Store.dispatch({ type: "route", route: "back" })
                }}
              >
                Назад к покупкам
              </IonButton>
          </IonToolbar>
        </IonCard>
    </>
    
    
    return elem
}
  