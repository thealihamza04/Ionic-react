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
import type { LectureItem } from '../constants/timetable';

type HomeProps = {
  totalTodos: number;
  completedTodos: number;
  totalNotes: number;
  todayLabel: string;
  todayLectures: LectureItem[];
};

const Home: React.FC<HomeProps> = ({
  totalTodos,
  completedTodos,
  totalNotes,
  todayLabel,
  todayLectures
}) => {
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
        </IonList>

        <IonList inset>
          <IonItem>
            <IonLabel>
              <h2>{todayLabel} lectures</h2>
              <p>
                {todayLectures.length > 0
                  ? `${todayLectures.length} lecture${todayLectures.length === 1 ? '' : 's'} today`
                  : 'No lectures today'}
              </p>
            </IonLabel>
          </IonItem>
          {todayLectures.map((lecture) => (
            <IonItem key={lecture.id}>
              <IonLabel>
                <h3>{`${lecture.courseCode} - ${lecture.section}`}</h3>
                <p>{lecture.courseName}</p>
                <p>{lecture.normalTime}</p>
                <p>{[lecture.room, lecture.instructor].filter(Boolean).join(' - ')}</p>
              </IonLabel>
            </IonItem>
          ))}
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
