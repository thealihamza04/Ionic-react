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
  IonToolbar
} from '@ionic/react';
import { addOutline, trashOutline } from 'ionicons/icons';
import type { NoteItem } from '../App';

type NotesProps = {
  notes: NoteItem[];
  setNotes: React.Dispatch<React.SetStateAction<NoteItem[]>>;
};

const Notes: React.FC<NotesProps> = ({ notes, setNotes }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);

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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList inset>
          <IonItem>
            <IonButton expand="block" onClick={() => setIsAddOpen(true)}>
              <IonIcon slot="start" icon={addOutline} aria-hidden="true" />
              Add note
            </IonButton>
          </IonItem>
        </IonList>

        <IonList inset>
          {notes.map((note) => (
            <IonItem key={note.id}>
              <IonLabel>{note.text}</IonLabel>
              <IonButton fill="clear" color="danger" onClick={() => deleteNote(note.id)}>
                <IonIcon icon={trashOutline} aria-hidden="true" />
              </IonButton>
            </IonItem>
          ))}
          {notes.length === 0 ? (
            <IonItem>
              <IonLabel>No notes yet.</IonLabel>
            </IonItem>
          ) : null}
        </IonList>

        <IonAlert
          isOpen={isAddOpen}
          header="New note"
          inputs={[
            {
              name: 'text',
              type: 'textarea',
              placeholder: 'Write a quick note...'
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
      </IonContent>
    </IonPage>
  );
};

export default Notes;

