import { useEffect, useState } from "react";
import { getData, Phone, Store } from "../pages/Store";
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
//import { Plugins, CameraResultType } from '@capacitor/core';
import { IonAlert, IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonGrid, IonIcon, IonInput, IonItem
    , IonList, IonLoading, IonRow, IonText, IonThumbnail } from "@ionic/react";
import { arrowBackOutline, cameraOutline, exitOutline, headsetOutline, homeOutline, informationCircleOutline, mailUnreadOutline, personCircleOutline, shieldCheckmarkOutline, timerOutline } from "ionicons/icons";
import './Profile.css'

defineCustomElements(window)

async function    takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    // source: CameraSource.Photos
    });
    var imageUrl = "data:image/jpeg;base64," + image.base64String;
    
    return imageUrl
    // Can be set to the src of an image no
  
  }

  
export function   Profile():JSX.Element {
    const [load , setLoading] = useState(false)
    const [login, setLogin] = useState<any>(Store.getState().login);

    Store.subscribe({num: 51, type: "login", func: ()=>{
      setLogin(Store.getState().login)
    }})

    useEffect(()=>{
      setLogin(Store.getState().login)
      console.log(Store.getState().login)
    }, [])
  
    async function saveProfile(){
      setLoading(true)
  
      let login = Store.getState().login;
      login.method = "СохранитьПрофиль"
      getData("method", login)
  
      setLoading(false)
  
    }
  
    async function getFoto(){
      const imageUrl = await takePicture();
      login.Картинка = imageUrl
      setLogin(login)
      Store.dispatch({type: "login", Картинка: imageUrl})
  
    }
  
    let elem = <>
      <IonCard class="pr-card">
        <IonIcon icon = { arrowBackOutline } 
            class= "back ml-1 mt-1"
            onClick = {()=>{
              Store.dispatch({type: "route", route: "back"})
            }}
          />          
        <IonLoading isOpen = { load } message = "Подождите" />
        <IonCardContent>
          <div className="pr-container">
            <IonRow>
              <IonCol size= "3"></IonCol>
              <IonCol size= "6">
                <img className="pr-img" src = { login.image } alt="" />
              </IonCol>
              <IonCol size="3"></IonCol>
            </IonRow>
            <IonButton class="pr-btn" fill="clear"
              onClick = {()=>{
                getFoto()    
              }}
            >
              <IonIcon slot = "icon-only" icon={ cameraOutline }/>
            </IonButton>
            <IonList class="ml-2 mr-2">
              <IonItem>
                <IonInput
                  placeholder = "ФИО, псевдоним"
                  onIonChange={(e)=>{
                    Store.dispatch({type: "login", name: e.detail.value as string})
                    login.name = e.detail.value as string
                    setLogin(login)
                  }}
                  value = { login.name }
                />
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder = "эл. почта"
                  onIonChange={(e)=>{
                    Store.dispatch({type: "login", email: e.detail.value as string})
                    login.email = e.detail.value as string
                    setLogin(login)
                  }}          
                  value = { login.email }
                />
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder = "Адрес"
                  onIonChange={(e)=>{
                    Store.dispatch({type: "login", address: e.detail.value as string})
                    login.address = e.detail.value as string
                    setLogin(login)
                  }}          
                  value = { login.address }
                />
              </IonItem>
            </IonList>
            <IonRow>
              <IonCol>
                <IonButton class="ml-2 mr-2" expand="block"
                  onClick={()=>{
//                    saveProfile()
                    Store.dispatch({type: "route", route: "/page/root"})
                  }}
                >
                  Выход
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton class="ml-2 mr-2" expand="block"
                  onClick={()=>{
                    saveProfile()
                    Store.dispatch({type: "route", route: "/page/root"})
                  }}
                >
                  Сохранить
                </IonButton>
              </IonCol>
            </IonRow>
          </div>
        </IonCardContent>
      </IonCard>  
    </>
  
    return elem;
}
  
export function   Options():JSX.Element {
  // const [load,    setLoad] = useState(false)
  const [alert,   setAlert] = useState(false)

  function          Person():JSX.Element{
      let login = Store.getState().login
      let elem = <>
        <IonCard class="f-card">
          <IonIcon icon = { arrowBackOutline } 
            class= "back ml-1 mt-1"
            onClick = {()=>{
              Store.dispatch({type: "route", route: "back"})
            }}
          />  
          <IonCardContent>
            <IonItem class="mt-1 mb-1" detail
              onClick = {()=>{
                Store.dispatch({type: "route", route: "/menu/profile"})
              }}
            >
              <IonItem lines="none">
                <IonAvatar slot="start">
                  <img src={ login.Картинка === "" ? personCircleOutline : login.Картинка } 
                  alt=""
                />
                </IonAvatar>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonInput placeholder="ФИО, псевдоним" disabled
                        value = { login.ФИО }  
                      >
                      </IonInput> 
                    </IonCol>           
                  </IonRow>
                  <IonRow>
                    <IonCol>
                    <IonInput placeholder="Телефон" disabled
                      value = { login.Телефон }  
                    >
                    </IonInput>
                    </IonCol>           
                  </IonRow>
                </IonGrid> 
              </IonItem>
            </IonItem>
            <IonItem class="mt-1 mb-1 op-item" lines = "none" detail
              onClick={()=>{
                Store.dispatch({type: "route", route: "/menu/orders"})
              }}
            >
                <IonThumbnail class="op-thumb" color="blue" slot="start">
                  <IonIcon class= "op-icon" icon = { timerOutline }/>
                </IonThumbnail>
                <IonText> Мои заказы </IonText>
            </IonItem>
            <IonItem class="mt-1 mb-1 op-item" lines = "none" detail
              onClick={()=>{
                //Store.dispatch({type: "route", route: "/menu/notifs"})
              }}
            >
                <IonThumbnail class="op-thumb1" color="blue" slot="start">
                  <IonIcon class= "op-icon" icon = { mailUnreadOutline }/>
                </IonThumbnail>
                <IonText> Уведомления </IonText>
            </IonItem>
            <IonItem class="mt-1 mb-1 op-item" lines = "none" detail
              onClick={()=>{
                //Store.dispatch({type: "route", route: "/menu/policy"})
              }}
            >
                <IonThumbnail class="op-thumb2" color="blue" slot="start">
                  <IonIcon class= "op-icon" icon = { shieldCheckmarkOutline }/>
                </IonThumbnail>
                <IonText> Политика конфиденциальности </IonText>
            </IonItem>
            <IonItem class="mt-1 mb-1 op-item" lines = "none" detail
               onClick={()=>{
                Store.dispatch({type: "route", route: "/menu/contacts"})
              }}             
            >
                <IonThumbnail class="op-thumb3" color="blue" slot="start">
                  <IonIcon class= "op-icon" icon = { headsetOutline }/>
                </IonThumbnail>
                <IonText> Служба поддержки </IonText>
            </IonItem>
            <IonItem class="mt-1 mb-1 op-item" lines = "none" detail
               onClick={()=>{
                Store.dispatch({type: "route", route: "/menu/delinfo"})
              }}             
            >
                <IonThumbnail class="op-thumb" color="blue" slot="start">
                  <IonIcon class= "op-icon" icon = { informationCircleOutline }/>
                </IonThumbnail>
                <IonText> О приложении </IonText>
            </IonItem>
            <IonItem class="mt-1 mb-1 op-item" lines = "none" detail
               onClick={()=>{
               // Plugins.App.exitApp();
                Store.dispatch({type: "auth",   auth: false})
                Store.dispatch({type: "orders", orders: []})
                Store.dispatch({  
                  type:              "login",
                  ГУИД:                    0,
                  Телефон:                "",
                  ФИО:                    "",
                  элПочта:                "",
                  Пароль:                 "",
                  Роль:                    0,
                  СМС:                    "", 
                  Картинка:               "",
              })
                Store.dispatch({type: "route",  route: "back"})
              }}             
            >
                <IonThumbnail class="op-thumb1" color="blue" slot="start">
                  <IonIcon class= "op-icon" icon = { exitOutline }/>
                </IonThumbnail>
                <IonText> Выйти </IonText>
            </IonItem>
          </IonCardContent>
        </IonCard>
    </>;
    return elem
}
  
  let elem = <>
      <Person />
  </>

  return elem;
}
