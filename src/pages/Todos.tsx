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
  IonToolbar,
  IonFab,
  IonFabButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/react';
import { addOutline, trashOutline, listOutline } from 'ionicons/icons';
import type { TodoItem } from '../App';

type TodosProps = {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
};

const Todos: React.FC<TodosProps> = ({ todos, setTodos }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<TodoItem | null>(null);

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
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--padding-top': 'var(--space-lg)' } as React.CSSProperties}>
          <IonTitle style={{ 
            fontSize: 'var(--font-size-xl)', 
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--app-text-main)'
          }}>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--app-background)' } as React.CSSProperties}>
        {/* Minimal Summary Pin */}
        <div style={{ padding: '0 var(--space-lg) var(--space-md) var(--space-lg)' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '0.5px solid var(--app-border)',
            paddingBottom: 'var(--space-sm)'
          }}>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--app-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {remainingCount === 0 ? 'All caught up' : `${remainingCount} focus items`}
            </span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--app-text-hint)' }}>
              {todos.length} total
            </span>
          </div>
        </div>

        {todos.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70%',
            padding: 'var(--space-xl)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--app-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-lg)',
              border: '0.5px solid var(--app-border)'
            }}>
              <IonIcon icon={listOutline} style={{ fontSize: '32px', color: 'var(--app-text-hint)' }} />
            </div>
            <h2 style={{ 
              fontSize: 'var(--font-size-lg)', 
              fontWeight: 'var(--font-weight-semibold)', 
              color: 'var(--app-text-main)',
              margin: '0 0 var(--space-sm) 0'
            }}>Ready for your day?</h2>
            <p style={{ 
              fontSize: 'var(--font-size-sm)', 
              color: 'var(--app-text-muted)',
              margin: 0,
              lineHeight: '1.5'
            }}>
              Organize your tasks, set your priorities, and check them off as you go.
            </p>
            <IonButton 
              fill="clear" 
              onClick={() => setIsAddOpen(true)}
              style={{ marginTop: 'var(--space-lg)', '--color': 'var(--app-primary)', fontWeight: 'var(--font-weight-medium)' }}
            >
              Add your first task
            </IonButton>
          </div>
        ) : (
          <IonList style={{ background: 'transparent', padding: '0 var(--space-md)' }}>
            {todos.map((todo) => (
              <IonItemSliding key={todo.id} style={{ marginBottom: 'var(--space-xs)' }}>
                <IonItem 
                  style={{ 
                    '--background': 'var(--app-card-bg)',
                    '--border-radius': 'var(--radius-md)',
                    '--border-width': '0.5px',
                    '--border-color': 'var(--app-border)',
                    boxShadow: 'var(--shadow-sm)',
                    opacity: todo.done ? 0.6 : 1,
                    transition: 'opacity var(--duration-base) var(--ease-out)'
                  } as React.CSSProperties} 
                  lines="none"
                >
                  <IonCheckbox
                    slot="start"
                    checked={todo.done}
                    onIonChange={(e) => toggleTodo(todo.id, Boolean(e.detail.checked))}
                    style={{ 
                      '--size': '20px',
                      '--border-radius': 'var(--radius-full)',
                      '--checkbox-background-checked': 'var(--app-success-soft)',
                      '--checkmark-color': 'var(--app-success-text)',
                      '--border-color': 'var(--app-border-strong)'
                    } as React.CSSProperties}
                  />
                  <IonLabel className="ion-text-wrap">
                    <h2 style={{ 
                      fontSize: 'var(--font-size-sm)', 
                      color: 'var(--app-text-main)',
                      fontWeight: todo.done ? 'var(--font-weight-normal)' : 'var(--font-weight-medium)',
                      textDecoration: todo.done ? 'line-through' : 'none',
                      transition: 'all var(--duration-base) var(--ease-out)'
                    }}>{todo.title}</h2>
                  </IonLabel>
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption 
                    color="danger" 
                    onClick={() => setPendingDelete(todo)}
                    style={{ borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}
                  >
                    <IonIcon slot="icon-only" icon={trashOutline} />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ margin: 'var(--space-md)' }}>
          <IonFabButton onClick={() => setIsAddOpen(true)} style={{ '--background': 'var(--app-primary)', '--box-shadow': 'var(--shadow-lg)' } as React.CSSProperties}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        <IonAlert
          isOpen={isAddOpen}
          header="New Task"
          inputs={[
            {
              name: 'title',
              type: 'text',
              placeholder: 'What needs to be done?'
            }
          ]}
          buttons={[
            { text: 'Cancel', role: 'cancel', handler: () => setIsAddOpen(false) },
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
        <IonAlert
          isOpen={Boolean(pendingDelete)}
          header="Delete Task?"
          message="This task will be permanently removed."
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => setPendingDelete(null)
            },
            {
              text: 'Delete',
              role: 'destructive',
              handler: () => {
                if (pendingDelete) {
                  deleteTodo(pendingDelete.id);
                }
                setPendingDelete(null);
              }
            }
          ]}
          onDidDismiss={() => setPendingDelete(null)}
        />

        <div style={{ height: 'calc(var(--space-2xl) + env(safe-area-inset-bottom))' }} />
      </IonContent>
    </IonPage>
  );
};

export default Todos;
