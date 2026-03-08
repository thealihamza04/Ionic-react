import type { NoteItem, TodoItem } from '../App';

const DB_NAME = 'ionic-app-db';
const DB_VERSION = 1;
const STORE_NAME = 'app-state';
const TODOS_KEY = 'todos';
const NOTES_KEY = 'notes';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Failed to open IndexedDB'));
  });
}

function runTransaction<T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore, resolve: (value: T) => void, reject: (reason?: unknown) => void) => void
): Promise<T> {
  return openDatabase().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, mode);
        const store = transaction.objectStore(STORE_NAME);

        transaction.oncomplete = () => db.close();
        transaction.onabort = () => {
          db.close();
          reject(transaction.error ?? new Error('IndexedDB transaction aborted'));
        };
        transaction.onerror = () => {
          db.close();
          reject(transaction.error ?? new Error('IndexedDB transaction failed'));
        };

        operation(store, resolve, reject);
      })
  );
}

function getValue<T>(key: string): Promise<T | null> {
  return runTransaction<T | null>('readonly', (store, resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve((request.result as T | undefined) ?? null);
    request.onerror = () => reject(request.error ?? new Error(`Failed to read ${key}`));
  });
}

function setValue<T>(key: string, value: T): Promise<void> {
  return runTransaction<void>('readwrite', (store, resolve, reject) => {
    const request = store.put(value, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error ?? new Error(`Failed to write ${key}`));
  });
}

export function loadTodos(): Promise<TodoItem[] | null> {
  return getValue<TodoItem[]>(TODOS_KEY);
}

export function loadNotes(): Promise<NoteItem[] | null> {
  return getValue<NoteItem[]>(NOTES_KEY);
}

export function saveTodos(todos: TodoItem[]): Promise<void> {
  return setValue(TODOS_KEY, todos);
}

export function saveNotes(notes: NoteItem[]): Promise<void> {
  return setValue(NOTES_KEY, notes);
}
