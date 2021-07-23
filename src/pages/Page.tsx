import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { Basket, BasketIcon } from '../components/Basket';
import { Carousel } from '../components/Carousel';
import { Categories } from '../components/Categories';
import { GCard } from '../components/GCard';
import { Goods } from '../components/Goods';
import { Order } from '../components/Order';
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
  console.log(route)
  switch( route ) {
    case "back": hust.goBack(); break
    case "forward": hust.goForward(); break;
    default: hust.push( route );
  }
  }})

  function Main():JSX.Element {
    let elem = <></>

    console.log(name.substr(0, 1))
    console.log(name.substr(1))
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
  default: elem = <></>;
    }
    return elem
  }
  return (
    <IonPage>
      <IonHeader>
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
