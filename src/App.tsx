import React, { useEffect, useMemo, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
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
  calendarOutline,
  checkboxOutline,
  documentTextOutline,
  homeOutline,
  schoolOutline
} from 'ionicons/icons';
import Home from './pages/Home';
import { DAY_LABELS, getLecturesForDay } from './constants/timetable';
import { loadNotes, loadTodos, saveNotes, saveTodos } from './lib/appStorage';
import Notes from './pages/Notes';
import Timetable from './pages/Timetable';
import Todos from './pages/Todos';
import AcademicRecord from './pages/AcademicRecord';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
/* Theme variables */
import './theme/variables.css';

setupIonicReact();

export type TodoItem = { id: string; title: string; done: boolean };
export type NoteItem = { id: string; text: string };

const DEFAULT_TODOS: TodoItem[] = [
  { id: 't1', title: 'Try adding a todo', done: false },
  { id: 't2', title: 'Check it off', done: true }
];

const DEFAULT_NOTES: NoteItem[] = [{ id: 'n1', text: 'Welcome! Add a quick note.' }];

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>(DEFAULT_TODOS);
  const [notes, setNotes] = useState<NoteItem[]>(DEFAULT_NOTES);
  const [isStorageReady, setIsStorageReady] = useState(false);

  useEffect(() => {
    let isActive = true;

    Promise.all([loadTodos(), loadNotes()])
      .then(([storedTodos, storedNotes]) => {
        if (!isActive) return;
        setTodos(storedTodos ?? DEFAULT_TODOS);
        setNotes(storedNotes ?? DEFAULT_NOTES);
      })
      .catch(() => {
        if (!isActive) return;
        setTodos(DEFAULT_TODOS);
        setNotes(DEFAULT_NOTES);
      })
      .finally(() => {
        if (isActive) {
          setIsStorageReady(true);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!isStorageReady) return;
    saveTodos(todos).catch(() => {
      // Ignore persistence errors and keep in-memory state usable.
    });
  }, [isStorageReady, todos]);

  useEffect(() => {
    if (!isStorageReady) return;
    saveNotes(notes).catch(() => {
      // Ignore persistence errors and keep in-memory state usable.
    });
  }, [isStorageReady, notes]);

  const summary = useMemo(() => {
    const totalTodos = todos.length;
    const completedTodos = todos.filter((t) => t.done).length;
    const totalNotes = notes.length;
    return { totalTodos, completedTodos, totalNotes };
  }, [notes.length, todos]);

  const todayDay = new Date().getDay();
  const todayLectures = getLecturesForDay(todayDay);
  const todayLabel = DAY_LABELS[todayDay] ?? 'Today';

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tabs/home">
              <Home
                totalTodos={summary.totalTodos}
                completedTodos={summary.completedTodos}
                totalNotes={summary.totalNotes}
                todayLabel={todayLabel}
                todayLectures={todayLectures}
              />
            </Route>
            <Route exact path="/tabs/todos">
              <Todos todos={todos} setTodos={setTodos} />
            </Route>
            <Route exact path="/tabs/notes">
              <Notes notes={notes} setNotes={setNotes} />
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

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/tabs/home">
              <IonIcon aria-hidden="true" icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="todos" href="/tabs/todos">
              <IonIcon aria-hidden="true" icon={checkboxOutline} />
              <IonLabel>Todos</IonLabel>
            </IonTabButton>
            <IonTabButton tab="notes" href="/tabs/notes">
              <IonIcon aria-hidden="true" icon={documentTextOutline} />
              <IonLabel>Notes</IonLabel>
            </IonTabButton>
            <IonTabButton tab="timetable" href="/tabs/timetable">
              <IonIcon aria-hidden="true" icon={calendarOutline} />
              <IonLabel>Timetable</IonLabel>
            </IonTabButton>
            <IonTabButton tab="academic" href="/tabs/academic">
              <IonIcon aria-hidden="true" icon={schoolOutline} />
              <IonLabel>Academic</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
