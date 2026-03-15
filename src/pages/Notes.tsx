import React, { useState } from 'react';
import {
  IonAlert,
  IonButton,
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
import { addOutline, trashOutline, documentTextOutline, createOutline } from 'ionicons/icons';
import type { NoteItem } from '../App';

type NotesProps = {
  notes: NoteItem[];
  setNotes: React.Dispatch<React.SetStateAction<NoteItem[]>>;
};

const Notes: React.FC<NotesProps> = ({ notes, setNotes }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [pendingNoteDelete, setPendingNoteDelete] = useState<NoteItem | null>(null);

  const addNote = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setNotes((prev) => [{ id: `n_${Date.now()}`, text: trimmed }, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--padding-top': 'var(--space-lg)' } as React.CSSProperties}>
          <IonTitle style={{ 
            fontSize: 'var(--font-size-xl)', 
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--app-text-main)'
          }}>Notes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--app-background)' } as React.CSSProperties}>
        {notes.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80%',
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
              <IonIcon icon={documentTextOutline} style={{ fontSize: '32px', color: 'var(--app-text-hint)' }} />
            </div>
            <h2 style={{ 
              fontSize: 'var(--font-size-lg)', 
              fontWeight: 'var(--font-weight-semibold)', 
              color: 'var(--app-text-main)',
              margin: '0 0 var(--space-sm) 0'
            }}>Capturing Ideas</h2>
            <p style={{ 
              fontSize: 'var(--font-size-sm)', 
              color: 'var(--app-text-muted)',
              margin: 0,
              lineHeight: '1.5'
            }}>
              Draft a note, jot a reminder, or stash a link for later. Your thoughts stay perfectly in sync.
            </p>
            <IonButton 
              fill="clear" 
              onClick={() => setIsAddOpen(true)}
              style={{ marginTop: 'var(--space-lg)', '--color': 'var(--app-primary)', fontWeight: 'var(--font-weight-medium)' }}
            >
              <IonIcon slot="start" icon={createOutline} />
              Write your first note
            </IonButton>
          </div>
        ) : (
          <IonList style={{ background: 'transparent', padding: '0 var(--space-md)' }}>
            {notes.map((note) => (
              <IonItemSliding key={note.id} style={{ marginBottom: 'var(--space-sm)' }}>
                <IonItem style={{ 
                  '--background': 'var(--app-card-bg)',
                  '--border-radius': 'var(--radius-md)',
                  '--border-width': '0.5px',
                  '--border-color': 'var(--app-border)',
                  '--inner-padding-end': 'var(--space-md)',
                  boxShadow: 'var(--shadow-sm)'
                } as React.CSSProperties} lines="none">
                  <IonLabel className="ion-text-wrap" style={{ padding: 'var(--space-sm) 0' }}>
                    <p style={{ 
                      fontSize: 'var(--font-size-sm)', 
                      color: 'var(--app-text-main)',
                      lineHeight: '1.5'
                    }}>{note.text}</p>
                  </IonLabel>
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption 
                    color="danger" 
                    onClick={() => setPendingNoteDelete(note)}
                    style={{ borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}
                  >
                    <IonIcon slot="icon-only" icon={trashOutline} />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        )}

        {/* FAB for adding items - modern mobile standard */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ margin: 'var(--space-md)' }}>
          <IonFabButton onClick={() => setIsAddOpen(true)} style={{ '--background': 'var(--app-primary)', '--box-shadow': 'var(--shadow-lg)' } as React.CSSProperties}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        <IonAlert
          isOpen={isAddOpen}
          header="New note"
          cssClass="custom-alert"
          inputs={[
            {
              name: 'text',
              type: 'textarea',
              placeholder: 'Write something...'
            }
          ]}
          buttons={[
            { text: 'Cancel', role: 'cancel', handler: () => setIsAddOpen(false) },
            {
              text: 'Add',
              handler: (value) => {
                const text = typeof value?.text === 'string' ? value.text : '';
                addNote(text);
                setIsAddOpen(false);
              }
            }
          ]}
          onDidDismiss={() => setIsAddOpen(false)}
        />
        <IonAlert
          isOpen={Boolean(pendingNoteDelete)}
          header="Delete note?"
          message="This action cannot be undone."
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => setPendingNoteDelete(null)
            },
            {
              text: 'Delete',
              role: 'destructive',
              handler: () => {
                if (pendingNoteDelete) {
                  deleteNote(pendingNoteDelete.id);
                }
                setPendingNoteDelete(null);
              }
            }
          ]}
          onDidDismiss={() => setPendingNoteDelete(null)}
        />
        
        {/* Safe area spacer */}
        <div style={{ height: 'calc(var(--space-2xl) + env(safe-area-inset-bottom))' }} />
      </IonContent>
    </IonPage>
  );
};

export default Notes;
