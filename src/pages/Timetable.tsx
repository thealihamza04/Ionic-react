import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Timetable: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Timetable</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <iframe
          title="Timetable"
          src="/timetable.html"
          style={{ border: 0, display: 'block', width: '100%', height: '100%' }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Timetable;
