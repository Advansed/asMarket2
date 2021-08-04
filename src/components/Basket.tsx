import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonGrid, IonIcon, IonImg, IonLabel, IonRow, IonText, IonToolbar, IonFooter} from '@ionic/react';
import { addCircleOutline, addOutline, arrowBackOutline, cartOutline, closeOutline, removeCircle, removeOutline, trashBinOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { SuperElementAccessExpression } from 'typescript';
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
            
            <IonRow class="r-underline ">
              <IonCol size="1">
                    
                    <IonIcon icon={ closeOutline } 
                        onClick={()=>{
                          delBasket(info.Код); setUpd(upd + 1);
                        }} 
                    />
              
              </IonCol>
              <IonCol size="2">
                  <IonImg id="a-margin" src={info.Картинка} class="b_img"/>
              </IonCol>
              <IonCol size="9" className="ml-0.5">
                  <IonRow>
                  <a><b>{info.Наименование}</b></a>
                </IonRow>    
                        <IonRow className="mt-4">
                        <button  className="white-bg text-align orange-clr-fnt"> 
                            { new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(info.Цена * Количество)  }
                        </button>
                            <button className="bs-btn right" onClick={()=>{
                                updBasket(info.Код, -1)
                                setUpd(upd + 1);
                            }}>
                              <IonIcon  icon={ removeOutline }></IonIcon>
                            </button>
                            <button  className="f-16 white-bg text-align"
                            > 
                            <a >{ Количество.toFixed() + " шт."} </a>
                            </button>
                            <button className="bs-btn left"  onClick={()=>{
                                updBasket(info.Код, 1)
                                setUpd(upd + 1);
                            }}>
                              <IonIcon  icon={ addOutline }></IonIcon>
                            </button>
                        </IonRow>
                        
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
      
      let delivery=0;
      if(sum>=0 && sum<=999){
        delivery=150;
      }else if(sum>=1000 && sum<=1499) delivery=100
      else if (sum>=1500 && sum<=1999) delivery=50
      else delivery=0
      let sumtotal=0;
      sumtotal=sum+delivery;

      items = <>
        
          <IonGrid className="w-100 header">
              <IonRow className="m-top">
                <IonCol size="1">
                  <button 
                      onClick = {()=>{
                      Store.dispatch({type: "route", route: "back"})
                    }} className="btn"
                  > 
                    <IonIcon icon = { arrowBackOutline } />
                  </button>
                </IonCol>
                <IonCol size="7" >
                <button  className="m-header btn"
> 
                    <b><a >Корзина</a></b>
                  </button>
                </IonCol> 
                
                <IonCol size="4">
                  <button  className="m-header btn"
                      onClick = {()=>{
                      Store.dispatch({type: "basket", basket: []})
                      setBasket([]);
                    }}
                  > 
                    <a >Очистить всё</a>
                  </button>
                </IonCol> 
              </IonRow>        
            </IonGrid>
         
          <div className="content">
            <div className="b-content w-100 h-80 ">
              { items }
            </div>
          </div>
          <div className="footer">
            <div className="footer2 ">
              
            <IonRow>
              <IonCol size="6">
                  <div className="left">
                    <IonText class="f-16 ml-1">
                      <a>Товаров на сумму </a>
                    </IonText>
                  </div>
                </IonCol>
                <IonCol size="6">
                <div className="right ">
                  
                 <a>{ new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sum)  }</a>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">
                <div className="left">
                  <IonText class="f-16 ml-1">
                    <a>Доставка </a>
                  </IonText>
                </div>
              </IonCol>
              <IonCol size="6">
                <div className="right ">
                 <a>{ new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(delivery)  }</a>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">
                <div className="left">
                  <IonText class="f-18 ml-1">
                    <b>Итого </b>
                  </IonText>
                </div>
              </IonCol>
              <IonCol size="6">
                <div className="right orange-clr-fnt">
                <IonText class="f-18 ml-1">
                 <b>{ new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sumtotal)  }</b>
                 </IonText>
                </div>
              </IonCol>
            </IonRow>
            </div>
            
            <IonRow>
                <div className="btn">
                  <button
                    slot="end"
                    onClick={()=>{
                      Store.dispatch({type: "route", route: "/page/order"})
                    }}  className="orange-clr-bg"
                  >
                    Оформить заказ
                  </button>
                </div>
            </IonRow> 
          </div>
        
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
  