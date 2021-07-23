import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRow,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { Store } from '../pages/Store';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Категории',
    url: '/page/root',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Заказы',
    url: '/goods/orders',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'История',
    url: '/goods/history',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Условия работы',
    url: '/goods/cond',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
  {
    title: 'О нас',
    url: '/goods/about',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
];

const labels = ['Акции', 'Бренды', 'Скидки', 'Уценка', 'Распродажа'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <IonItem>
              <IonImg slot = "start" src = "assets/asMarket.jpg" class="m-img" />
                <div>
                  <div>
                    Маркет Ас
                  </div>
                  <div>
                    <IonButton
                      expand= "block"
                      onClick = {()=>{
                        Store.dispatch({type: "route", route: "/page/login"})
                      }}
                    > Вход </IonButton>
                  </div>
                </div>
            </IonItem>
          </IonListHeader>
          
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Акции, Скидки, Бренды</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
