import React, { useMemo, useState } from 'react';
import {
  IonAlert,
  IonButton,
  IonCheckbox,
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
import { addOutline, trashOutline } from 'ionicons/icons';
import type { TodoItem } from '../App';

type TodosProps = {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
};

const Todos: React.FC<TodosProps> = ({ todos, setTodos }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const remainingCount = useMemo(() => todos.filter((t) => !t.done).length, [todos]);

  const toggleTodo = (id: string, done: boolean) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const addTodo = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTodos((prev) => [{ id: `t_${Date.now()}`, title: trimmed, done: false }, ...prev]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList inset>
          <IonItem>
            <IonLabel>
              {todos.length} total • {remainingCount} remaining
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonButton expand="block" onClick={() => setIsAddOpen(true)}>
              <IonIcon slot="start" icon={addOutline} aria-hidden="true" />
              Add todo
            </IonButton>
          </IonItem>
        </IonList>

        <IonList inset>
          {todos.map((todo) => (
            <IonItem key={todo.id}>
              <IonCheckbox
                slot="start"
                checked={todo.done}
                onIonChange={(e) => toggleTodo(todo.id, Boolean(e.detail.checked))}
              />
              <IonLabel>{todo.title}</IonLabel>
              <IonButton fill="clear" color="danger" onClick={() => deleteTodo(todo.id)}>
                <IonIcon icon={trashOutline} aria-hidden="true" />
              </IonButton>
            </IonItem>
          ))}
          {todos.length === 0 ? (
            <IonItem>
              <IonLabel>No todos yet.</IonLabel>
            </IonItem>
          ) : null}
        </IonList>

        <IonAlert
          isOpen={isAddOpen}
          header="New todo"
          inputs={[
            {
              name: 'title',
              type: 'text',
              placeholder: 'What do you need to do?'
            }
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                setIsAddOpen(false);
              }
            },
            {
              text: 'Add',
              handler: (value) => {
                const title = typeof value?.title === 'string' ? value.title : '';
                addTodo(title);
                setIsAddOpen(false);
              }
            }
          ]}
          onDidDismiss={() => setIsAddOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Todos;
