import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { BasketIcon } from '../components/Basket';
import { Carousel } from '../components/Carousel';
import { Categories } from '../components/Categories';
import { Goods } from '../components/Goods';
import './Page.css';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

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
        <Carousel />
      </IonHeader>
      <IonContent fullscreen>
        <Categories />

      </IonContent>
    </IonPage>
  );
};


export default Page;
