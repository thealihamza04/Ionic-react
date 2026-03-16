import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  calendar,
  calendarOutline,
  home,
  homeOutline,
  school,
  schoolOutline,
  megaphone,
  megaphoneOutline
} from 'ionicons/icons';
import Home from './pages/Home';
import { DAY_LABELS, getLecturesForDay, LectureItem } from './constants/timetable';
import Announcements from './pages/Announcements';
import Timetable from './pages/Timetable';
import AcademicRecord from './pages/AcademicRecord';
import PWASyncProgress from './components/PWASyncProgress';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const todayDay = new Date().getDay();
  const todayLectures = getLecturesForDay(todayDay);
  const todayLabel = DAY_LABELS[todayDay] ?? 'Today';

  return (
    <IonApp>
      <PWASyncProgress />
      <IonReactRouter>
        <AppContent
          todayLabel={todayLabel}
          todayLectures={todayLectures}
        />
      </IonReactRouter>
    </IonApp>
  );
};

type AppContentProps = {
  todayLabel: string;
  todayLectures: LectureItem[];
};

const AppContent: React.FC<AppContentProps> = ({
  todayLabel, todayLectures
}) => {
  const location = useLocation();

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home">
          <Home
            todayLabel={todayLabel}
            todayLectures={todayLectures}
          />
        </Route>
        <Route exact path="/tabs/announcements">
          <Announcements />
        </Route>
        <Route exact path="/tabs/timetable">
          <Timetable />
        </Route>
        <Route exact path="/tabs/academic">
          <AcademicRecord />
        </Route>

        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
        <Route exact path="/">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar
        slot="bottom"
        style={{
          '--background': 'var(--app-background)',
          '--border-color': 'var(--app-border)',
          borderTop: '0.5px solid var(--app-border)',
          height: 'calc(60px + env(safe-area-inset-bottom))',
          paddingBottom: 'env(safe-area-inset-bottom)',
          contain: 'none'
        } as { [key: string]: string }}
      >
        <IonTabButton tab="home" href="/tabs/home" style={{ '--color-selected': 'var(--app-primary)' } as React.CSSProperties}>
          <IonIcon aria-hidden="true" icon={location.pathname === '/tabs/home' ? home : homeOutline} style={{ fontSize: '20px' }} />
          <IonLabel style={{ fontSize: '10px', fontWeight: 'var(--font-weight-medium)', marginTop: '2px' }}>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="announcements" href="/tabs/announcements" style={{ '--color-selected': 'var(--app-primary)' } as React.CSSProperties}>
          <IonIcon aria-hidden="true" icon={location.pathname === '/tabs/announcements' ? megaphone : megaphoneOutline} style={{ fontSize: '20px' }} />
          <IonLabel style={{ fontSize: '10px', fontWeight: 'var(--font-weight-medium)', marginTop: '2px' }}>News</IonLabel>
        </IonTabButton>

        <IonTabButton tab="timetable" href="/tabs/timetable" style={{ '--color-selected': 'var(--app-primary)' } as React.CSSProperties}>
          <IonIcon aria-hidden="true" icon={location.pathname === '/tabs/timetable' ? calendar : calendarOutline} style={{ fontSize: '18px' }} />
          <IonLabel style={{ fontSize: '10px', fontWeight: 'var(--font-weight-medium)', marginTop: '2px' }}>Schedule</IonLabel>
        </IonTabButton>

        <IonTabButton tab="academic" href="/tabs/academic" style={{ '--color-selected': 'var(--app-primary)' } as React.CSSProperties}>
          <IonIcon aria-hidden="true" icon={location.pathname === '/tabs/academic' ? school : schoolOutline} style={{ fontSize: '20px' }} />
          <IonLabel style={{ fontSize: '10px', fontWeight: 'var(--font-weight-medium)', marginTop: '2px' }}>Hub</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default App;
