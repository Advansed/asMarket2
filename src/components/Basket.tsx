import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonGrid, IonIcon, IonImg, IonLabel, IonRow, IonText, IonToolbar } from '@ionic/react';
import { addCircleOutline, arrowBackOutline, cartOutline, closeOutline, removeCircle, trashBinOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Store } from '../pages/Store';
import './Basket.css';

export function BasketIcon():JSX.Element {
    const [info, setInfo] = useState(0)

    Store.subscribe({num: 31, type: "basket", func: ()=>{
        setInfo(Store.getState().basket.length)
    }})
    useEffect(()=>{
        setInfo(Store.getState().basket.length)
    }, [])

    let elem = <>
        <div className="bs-icon"
            onClick = {()=>{
                Store.dispatch({type: "route", route: "/page/basket"})
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
            </svg>
            <IonLabel class="bs-red"><b>{ info }</b></IonLabel>
        </div>
    </>

    return elem
}



function  delBasket(Код){
    let basket = Store.getState().basket;
  
    if(basket === undefined) basket = [];
  
    var commentIndex = basket.findIndex(function(b) { 
        return b.Код === Код  
    });
    if(commentIndex >= 0){
      basket.splice(commentIndex, 1)
      Store.dispatch({type:"basket", basket: basket})
    }
  }
  
    
  export function   addBasket( good, amount ){
    let basket = Store.getState().basket;
    if(basket === undefined) basket = [];
    var commentIndex = basket.findIndex(function(b) { 
        return b.Код === good.Код; 
    });
    if(commentIndex >= 0){
  
      let sum   = basket[commentIndex].Количество + amount;
      if(sum < 0) sum = 0
      let total = basket[commentIndex].Цена * sum;
  
      if(sum === 0) delBasket(good.Код)
      else {
        let bask = basket.map(todo => {
          if (todo.Код === good.Код) {
            return { ...todo, Количество: sum, Сумма: total}
          } else {
            return todo
          }
        })
        Store.dispatch({type: "basket", basket: bask})
    
      }
  
    } else {
      basket = [...basket, {
        Код:            good.Код,
        Наименование:   good.Наименование,
        Цена:           good.Цена,
        Количество:     amount,
        Сумма:          amount * good.Цена,
        Упаковка:       good.Уп,
        Картинка:       good.Картинка
    }]
  
      Store.dispatch({type: "basket", basket: basket})
    }
  }
  
  export function   Basket(props):JSX.Element {
      const [upd, setUpd] = useState(0)
      const [basket,  setBasket] = useState<any>(Store.getState().basket)
    
      Store.subscribe({num: 41, type: "basket", func: ()=>{
        setBasket(Store.getState().basket)
      }})
    
      useEffect(()=>{
    
        setBasket(Store.getState().basket)
    
      },[upd]) 
    
  
      function  updBasket(Код: number, amount: number){
          let basket = Store.getState().basket;
      
          if(basket === undefined) basket = [];
      
          var commentIndex = basket.findIndex(function(b) { 
              return b.Код === Код
          });
          if(commentIndex >= 0){
            let b_amount = basket[commentIndex].Количество
            let sum = b_amount + amount;
            let total = basket[commentIndex].Цена * sum;
  
            if(sum < 0) sum = 0
      
            if(sum === 0) delBasket(Код)
            else {
              let bask = basket.map(todo => {
                if (todo.Код === Код) {
                  return { ...todo, Количество: sum, Сумма: total}
                } else {
                  return todo
                }
              })
              Store.dispatch({type: "basket", basket: bask})
      
            }
      
          }
      }
      
      function  BItem(props):JSX.Element{
  
          let info                = props.info;
          let Количество          = info.Количество 
  
          return <>
            <IonRow class="r-underline">
              <IonCol size="2">
                <IonIcon class="b-but" icon={ closeOutline } 
                    onClick={()=>{
                      delBasket(info.Код); setUpd(upd + 1);
                    }}
                />
                <IonImg id="a-margin" src={info.Картинка} class="b_img"/>
              </IonCol>
              <IonCol size="10">
                <IonCardSubtitle> {info.Наименование} </IonCardSubtitle>
                <IonCardTitle> 
                  <div>
                    <div>
                      <IonChip class="w-100">
                        <div className="w-40 b-div-1">
                          <IonButton class="i-but" fill="clear" onClick={()=>{
                              updBasket(info.Код, -1)
                              setUpd(upd + 1);
                          }}>
                            <IonIcon slot="icon-only" icon={ removeCircle }></IonIcon>
                          </IonButton>
                          { Количество.toFixed() + " шт."} 
                        </div>
                        <div className="w-60 b-div-1">
                          <IonButton class="i-but" fill="clear" onClick={()=>{
                              updBasket(info.Код, 1)
                              setUpd(upd + 1);
                          }}>
                            <IonIcon slot="icon-only" icon={ addCircleOutline }></IonIcon>
                          </IonButton>
                          { (info.Цена * Количество).toFixed(2) + " руб" }
                        </div>
                      </IonChip>
                    </div>
                  </div>
                </IonCardTitle>
              </IonCol>
          </IonRow>
          </>
        
      }
    
      let b_length = 0;
    
      for(let i = 0;i < basket.length;i++){
        b_length = b_length + basket[i].Количество;
      }  
    
      let items = <></>
    
      let sum = 0;
      for(let i = 0;i < basket.length;i++){
        sum = sum + basket[i].Сумма;
        items = <>
          { items }
          <BItem info={ basket[i] } />
        </>
      }
    
      items = <>
        <IonCard class="b-card f-14" >
          <IonGrid className="w-100">
            <IonRow className="m-row">
  
            </IonRow>
              <IonRow className="m-top">
                <IonCol size="2">
                  <IonButton fill="clear"
                      onClick = {()=>{
                      Store.dispatch({type: "route", route: "back"})
                    }}
                  > 
                    <IonIcon icon = { arrowBackOutline } />
                  </IonButton>
                </IonCol>
                <IonCol size="3">
                  <IonButton fill="clear" class="m-header">
                    { "АсМаркет" }
                  </IonButton>
                </IonCol> 
                <IonCol size="5" class="t-right">
                  <IonButton fill="clear" class="m-header">
                    { (basket.reduce(function(a, b){
                        return a + b.Сумма;
                        }, 0)).toFixed(2) + " руб"
                    }
                  </IonButton>
                </IonCol> 
                <IonCol size="2">
                  <IonButton fill="clear" class="m-header"
                      onClick = {()=>{
                      Store.dispatch({type: "basket", basket: []})
                      setBasket([]);
                    }}
                  > 
                    <IonIcon icon = { trashBinOutline } />
                  </IonButton>
                </IonCol> 
              </IonRow>        
            </IonGrid>
          <IonText  class="f-14 ml-1">Всего товаров { b_length.toString() + " шт" }</IonText>
          <IonCardContent>
            <div className="b-content w-100 h-80">
              { items }
            </div>
          </IonCardContent>
          <IonText class="f-14 ml-1">
            Итого на сумму <b>{ new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sum)  }</b>
          </IonText>
  
            <IonToolbar>
              <IonButton
                slot="end"
                onClick={()=>{
                  Store.dispatch({type: "route", route: "/page/order"})
                }}
              >
                Сделать заказ
              </IonButton>
            </IonToolbar>
        </IonCard>
       </>
    
      return items
  }

  export function   count(info){
    if(info === undefined) return 0;
    let basket = Store.getState().basket;
    var commentIndex = basket.findIndex(function(b) { 
      return b.Код === info.Код; 
    });
    if(commentIndex >= 0)
      return basket[commentIndex].Количество
    else 
      return 0
  }
  
  export function   total(info){
    let basket = Store.getState().basket;
    var commentIndex = basket.findIndex(function(b) { 
      return b.Код === info.Код; 
    });
    if(commentIndex >= 0)
      return basket[commentIndex].Сумма
    else 
      return 0
  }
  