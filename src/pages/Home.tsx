import React from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';

type HomeProps = {
  totalTodos: number;
  completedTodos: number;
  totalNotes: number;
};

const Home: React.FC<HomeProps> = ({ totalTodos, completedTodos, totalNotes }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList inset>
          <IonItem>
            <IonLabel>
              <h2>Welcome</h2>
              <p>Keep track of quick todos and notes.</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonButton expand="block" routerLink="/tabs/timetable">
              <IonIcon slot="start" icon={calendarOutline} aria-hidden="true" />
              Open timetable
            </IonButton>
          </IonItem>
        </IonList>

        <IonList inset>
          <IonItem>
            <IonLabel>Total todos</IonLabel>
            <IonLabel slot="end">{totalTodos}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Completed</IonLabel>
            <IonLabel slot="end">
              {completedTodos}/{totalTodos || 0}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Total notes</IonLabel>
            <IonLabel slot="end">{totalNotes}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
