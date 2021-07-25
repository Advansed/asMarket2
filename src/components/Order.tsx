import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol
  , IonIcon, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonText } from "@ionic/react";
import { Component } from "ionicons/dist/types/stencil-public-runtime";
import { arrowBackOutline, bicycleOutline, businessOutline, cardOutline, cashOutline, homeOutline, phonePortrait, storefrontOutline, timeOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { AddressSuggestions } from "react-dadata";
import MaskedInput from "../mask/reactTextMask";
import { Store } from "../pages/Store";
import './Order.css'

declare type Dictionary = {
    [key: string]: any;
  };

export function   Order( props ):JSX.Element {
    const [message,   setMessage] = useState("")
    const [mp,        setMP]      = useState(false)
    const [dost,      setDost]    = useState(true)
    const [info,      setInfo]    = useState<any>({
        type:             "order",
        Организация:      Store.getState().market.Наименование,
        Адрес:            Store.getState().market.Адрес,
        token:            Store.getState().login.ГУИД,
        Телефон:          Store.getState().login.Телефон,
        Доставка:         "Доставка",
        МетодОплаты:      "картой",
        АдресДоставки:    "",
        ВремяДоставки:    "",
        СуммаЗаказа:      0,
        СуммаДоставки:    0,
        СуммаВсего:       0,
        Товары:           [] 
    })
    const [upd,       setUpd]     = useState(0)
    const [deliv,     setDeliv]   = useState(false)

    useEffect(()=>{
      let basket = Store.getState().basket
      let sum = basket.reduce(function(a, b){ return a + b.Сумма;}, 0); 
        let order = {
          type:             "order",
          Организация:      Store.getState().market.Наименование,
          Адрес:            Store.getState().market.Адрес,
          token:            Store.getState().login.ГУИД,
          Телефон:          Store.getState().login.Телефон,
          Доставка:         "Доставка",
          МетодОплаты:      "картой",
          АдресДоставки:    "",
          ВремяДоставки:    "",
          СуммаЗаказа:      sum,
          СуммаДоставки:    sum >= 1000 ? 0 : Store.getState().market.Доставка,
          СуммаВсего:       sum >= 1000 ? sum : Store.getState().market.Доставка + sum,
          Товары:           Store.getState().basket  
        }
        setInfo(order)
        Store.dispatch({type: "order", order: order})
        setUpd(upd + 1)


    },[])

    let item : Dictionary = {"city": "Якутск"};
    let dict : Dictionary[] = []; dict.push(item);

    function phone(st){
      if(st !== undefined) {
        if(st.length > 2)
          return st.substring(2)
      } else return ""
    }

    function Page1():JSX.Element {
      let elem = <>
      <IonCard class="o-card">
        <IonCardHeader> 
          <IonButton fill="clear" 
            onClick={()=>{
              Store.dispatch({type: "route", route: "back"})
            }}
          >
            <IonIcon slot="icon-only" icon={ arrowBackOutline }/>
          </IonButton>
            Оформление заказа 
        </IonCardHeader>
        <IonCardContent>
          {/* Оплата */}
          <IonItem> 
            <IonIcon slot="start" icon={ cardOutline } />
            <IonLabel position="stacked">Оплата</IonLabel>
            <IonSelect value={ info?.МетодОплаты } okText="Да" cancelText="Нет" onIonChange={e => {
                info.МетодОплаты = e.detail.value
                setInfo(info);
                if(info.МетодОплаты === "Эквайринг") setMP(true)
                else setMP(false)
            }}>
              {/* <IonSelectOption value="Эквайринг">Эквайринг</IonSelectOption> */}
              <IonSelectOption value="наличными">Наличными</IonSelectOption>
              <IonSelectOption value="картой">Картой</IonSelectOption>
              <IonSelectOption value="посчету">По счету</IonSelectOption>
            </IonSelect>
          </IonItem>
          {/* Телефон */}
          <IonItem>
            <IonIcon slot= "start" icon={ phonePortrait }/>
            <IonLabel position="stacked">Телефон</IonLabel>
            <div className="o-phone">
              <div>+7</div>
              <div>
                <MaskedInput
                  mask={[ ' ','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/]}
                  className="m-input"
                  autoComplete="off"
                  placeholder="(___) ___-__-__"
                  id='1'
                  type='text'
                  value = { phone(info?.Телефон) }
                  onChange={(e: any) => {
                    let st = e.target.value;
                    info.Телефон = "+7" + st;
                    setInfo(info)
                  }}
                />
              </div>
            </div>
          </IonItem>
          {/* Доставка */}
          <IonItem>
            <IonIcon slot="start" icon={ bicycleOutline } />
            <IonLabel position="stacked">Доставка</IonLabel>
            <IonSelect value={ info?.Доставка } okText="Да" cancelText="Нет" onIonChange={e => {
                info.Доставка = e.detail.value
                if(info.Доставка === "Доставка") {
                  info.Адрес = "";
                  info.АдресДоставки = "";
                  info.СуммаДоставки = info.СуммаЗаказа < 1000 ? Store.getState().market.Доставка : 0
                  info.СуммаВсего = info.СуммаЗаказа + info.СуммаДоставки
                  setInfo(info)
                  setDost(true); 
                  
                } else {
                  info.Адрес = Store.getState().market.Адрес
                  info.АдресДоставки = "";
                  info.СуммаДоставки = 0;
                  info.СуммаВсего = info.СуммаЗаказа 
                  setInfo(info)
                  setDost(false)
                }
                Store.dispatch({type: "order", order: info})
              
            }}>
              <IonSelectOption value="Доставка">Доставка до адреса</IonSelectOption>
              <IonSelectOption value="Самовывоз">Самовывоз</IonSelectOption>
            </IonSelect>
          </IonItem>
          <div className = { dost ? "" : "hidden"}>
            <IonLabel class="ml-15" >Адрес</IonLabel>
              <AddressSuggestions
                token="23de02cd2b41dbb9951f8991a41b808f4398ec6e"
                filterLocations ={ dict }
                hintText = { "г. Якутск" }
                onChange={(e)=>{
                  if(e !== undefined)
                    info.АдресДоставки = e.value
                    setInfo(info)
                }}
              /> 

            {/* <IonItem>
              <IonIcon slot= "start" icon={ timeOutline }/>
              <IonLabel position="stacked">Удобное время для доставки</IonLabel>
              <MaskedInput
                mask={[/[1-9]/, /\d/, ':', /\d/, /\d/, ' ', '-', ' ', /\d/, /\d/, ':', /\d/, /\d/,]}
                className="m-input"
                autoComplete="off"
                placeholder="12:00 - 21:00"
                id='2'
                type='text'
                value = { order.ВремяДоставки }
                onChange={(e: any) => {
                    order.ВремяДоставки = (e.target.value as string);
                    Store.dispatch({type: "order", order: order})
                  }}
              />
            </IonItem> */}
          </div>
        <IonCardHeader> Итоги по заказу </IonCardHeader>   
          <IonList class="f-14">
            <IonItem class="ml-1" lines="none">
              <IonCardSubtitle>Сумма доставки </IonCardSubtitle>
              <IonLabel slot="end" class="a-right">{ 
                  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(info?.СуммаДоставки)
              } </IonLabel>
            </IonItem>
            <IonItem class="ml-1" lines="none">
              <IonCardSubtitle>Заказано на сумму </IonCardSubtitle>
              <IonLabel slot="end" class="a-right">{ 
                  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(info?.СуммаЗаказа) } </IonLabel>
            </IonItem>
            <IonItem class="ml-1" lines="none">
              <IonCardSubtitle>Итого </IonCardSubtitle>
              <IonLabel slot="end" class="a-right">{ 
                  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(info?.СуммаВсего)
              } </IonLabel>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol></IonCol>
            <IonCol></IonCol>
            <IonCol>
              <IonButton expand="block"
                onClick = {()=>{
                  Proov();
                }}
              >
                { "Заказать" }
              </IonButton>
            </IonCol>
          </IonRow>
  
        </IonCardContent>
      </IonCard>
      <IonAlert
            isOpen={ message !== "" }
            onDidDismiss={() => setMessage("")}
            cssClass='my-custom-class'
            header={'Ошибка'}
            message={ message }
            buttons={['OK']}
          />
  
      </>
      return elem
    }

    function Page2():JSX.Element {
      let elem = <>
      <IonCard class="d-card">
        <IonCardHeader> Заказ </IonCardHeader>
        <IonCardContent>
          <IonList>
          <IonItem>
              <IonItem lines="none">
                <IonIcon slot="start" icon = { businessOutline }/>
                <IonLabel position="stacked"> Организация </IonLabel>
                <IonText><b> { info.Организация } </b></IonText>
              </IonItem>
            </IonItem>
            <IonItem>
              <IonItem lines="none">
                <IonIcon slot="start" icon = { bicycleOutline }/>
                <IonLabel position="stacked"> Доставка </IonLabel>
                <IonText><b> { info.Доставка } </b></IonText>
              </IonItem>
            </IonItem>
            <IonItem className={ info.Доставка === "Доставка" ? "" : "hide"}>
              <IonItem lines="none">
                <IonIcon slot="start" icon = { homeOutline }/>
                <IonLabel position="stacked"> Адрес доставки </IonLabel>
                <IonText><b> { info.АдресДоставки } </b></IonText>
              </IonItem>
            </IonItem>
            <IonItem className={ info.Доставка === "Доставка" ? "hide" : ""}>
              <IonItem lines="none">
                <IonIcon slot="start" icon = { storefrontOutline }/>
                <IonLabel position="stacked"> Забирать с адреса </IonLabel>
                <IonText><b> { info.Адрес } </b></IonText>
              </IonItem>
            </IonItem>
            <IonItem>
              <IonItem lines="none">
                <IonIcon slot="start" icon = { cashOutline }/>
                <IonLabel position="stacked"
                  className={ info.МетодОплаты === "Эквайринг" ? "hide" : ""}
                > Оплата { info.МетодОплаты } </IonLabel>
                <IonText
                  className={ info.МетодОплаты === "Эквайринг" ? "hide" : ""}
                ><b> Заказано на сумму { info.СуммаВсего } руб </b></IonText>
                <IonText
                  className={ info.МетодОплаты === "Эквайринг" ? "" : "hide"}
                ><b> Оплачено { info.СуммаВсего } руб </b></IonText>
              </IonItem>
            </IonItem>
            <IonItem className={ info.Доставка === "Доставка" ? "hide" : ""}>
             <IonText class="f-14">
                Вы можете забрать свой заказ с указанного адреса в рабочее время течение трех дней.
                Потом заказ будет отменен. 
                <span className={ info.МетодОплаты === "Эквайринг" ? "" : "hide"}>
                  Деньги будут возвращены на карту
                </span>
             </IonText>
            </IonItem>
            <IonItem className={ info.Доставка === "Доставка" ? "" : "hide"}>
             <IonText class="f-14">
               Ближайшее время с вами свяжутся и обговорят время доставки вашего заказа
             </IonText>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol></IonCol>
            <IonCol></IonCol>
            <IonCol>
              <IonButton
                onClick = {()=>{  
                  Store.dispatch({type: "route", route: "/page/root"})
                }}
              > Закрыть
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCardContent>
  
  
      </IonCard>
      
      </>

      return elem
    }

    let elem = <>
      { !deliv 
          ? <Page1 />
          : <Page2 />
      }
    </>
  
    function Proov(){
      console.log(info)
      Store.dispatch({type: "order", order: info})

      if( dost && info.АдресДоставки === "") 
        setMessage("Заполните адрес")
      else 
      if(info.Телефон === "" || info.Телефон.indexOf('_') > -1)
        setMessage("Заполните телефон")
      else 
      if(info.МетодОплаты === "Эквайринг"){
        if(Order(info)){
          setDeliv(true)
          //Store.dispatch({type: "route", route: "/menu/delivery"})
        }
      } else {
        if(Order(info)){
          setDeliv(true)
          //Store.dispatch({type: "route", route: "/menu/delivery"})
        }
      }
    }
  
    async function Order(order){
     
      // info.СтатусОплаты = "Не оплачено"
      // info.МетодДоставки = order.Доставка
      // info.Покупатель = "Покупатель"
      // getData("Заказ", info )
      
     Store.dispatch({type: "basket", basket: []})
      return true
    }
  
    return elem;
  }
  