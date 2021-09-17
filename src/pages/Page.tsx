import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar , IonIcon} from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { Basket, BasketIcon } from '../components/Basket';
import { Action, Carousel } from '../components/Carousel';
import { Categories } from '../components/Categories';
import { GCard } from '../components/GCard';
import { Goods } from '../components/Goods';
import { InfoPage1, InfoPage2 } from '../components/Infopage';
import { Order } from '../components/Order';
import { Orders } from '../components/Orders';
import { Options, Profile } from '../components/Profile';
import { Login, SMS } from '../components/Registration';
import './Page.css';
import { Store } from './Store';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  let hust = useHistory();

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(10, () => {
      hust.goBack();
    });
  });


  Store.subscribe({num: 1, type: "route", func: ()=>{ 
  let route = Store.getState().route;
  switch( route ) {
    case "back": {
        if(hust.location.pathname === "/page/options"){
          Store.dispatch({type: "route", route: "/page/root"})
        } else 
          hust.goBack(); 

      }; break
    case "forward": hust.goForward(); break;
    default: hust.push( route );
  }
  }})

  function Main():JSX.Element {
    let elem = <></>

    if(name.substr(0, 1) === "_"){
      elem = <>
        <GCard info = { name.substr(1) }/>
      </>
    } else
    switch(name){
      case "root": elem = <>
        <Carousel />
        <Categories />
        <Goods />
      </>; break
      case "basket": elem = <>
        <Basket />
      </>; break
      case "order": elem = <>
        <Order />
      </>; break
      case "login": elem = <>
        <Login />
      </>; break
      case "SMS": elem = <>
        <SMS />
      </>; break
      case "options": elem = <>
      <Options />
      </>; break
      case "profile": elem = <>
      <Profile />
      </>; break
      case "orders": elem = <>
      <Orders />
      </>; break
      case "contacts": elem = <>
      <InfoPage1 />
      </>; break
      case "info": elem = <>
      <InfoPage2 />
      </>; break
      case "action": elem = <>
      <Action />
      </>; break
      default: elem = <></>;
    }
    return elem
  }
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonSearchbar />
          <div slot="end">
            <BasketIcon/>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Main />
      </IonContent>
    </IonPage>
  );
};


export default Page;
