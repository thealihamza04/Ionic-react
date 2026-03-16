import React, { useEffect, useState } from 'react';
import { IonProgressBar, IonText, IonIcon } from '@ionic/react';
import { cloudDownloadOutline, checkmarkCircleOutline } from 'ionicons/icons';
import './PWASyncProgress.css';

const PWASyncProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState<'syncing' | 'completed'>('syncing');

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const onMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'SW_PROGRESS') {
        const { progress } = event.data.payload;
        setProgress(progress);
        
        // Show progress if it hasn't reached 100% yet or if it's the first time we see it
        if (progress < 100) {
          setIsVisible(true);
          setStatus('syncing');
        } else if (progress >= 100) {
          setStatus('completed');
          // Hide after 3 seconds when completed
          setTimeout(() => setIsVisible(false), 3000);
        }
      }
    };

    navigator.serviceWorker.addEventListener('message', onMessage);

    // Initial check and trigger after registration
    const triggerSync = async () => {
      const registration = await navigator.serviceWorker.ready;
      if (registration.active) {
        // Collect all assets currently on the page
        const assets = [
          ...Array.from(document.querySelectorAll('script[src]')).map(el => (el as HTMLScriptElement).src),
          ...Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(el => (el as HTMLLinkElement).href),
          ...Array.from(document.querySelectorAll('img[src]')).map(el => (el as HTMLImageElement).src)
        ].filter(url => url.startsWith(window.location.origin) || url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com'));

        registration.active.postMessage({
          type: 'START_PRECACHE',
          payload: assets
        });
      }
    };

    triggerSync();

    return () => navigator.serviceWorker.removeEventListener('message', onMessage);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pwa-sync-container">
      <div className="pwa-sync-card">
        <div className="pwa-sync-header">
          <IonIcon 
            icon={status === 'syncing' ? cloudDownloadOutline : checkmarkCircleOutline} 
            className={status === 'syncing' ? 'syncing-icon' : 'completed-icon'} 
          />
          <IonText color="dark">
            <h2 className="pwa-sync-title">
              {status === 'syncing' ? 'Optimizing Offline Access' : 'Offline Ready'}
            </h2>
            <p className="pwa-sync-subtitle">
              {status === 'syncing' 
                ? `Syncing application data... ${progress}%` 
                : 'All resources downloaded successfully.'}
            </p>
          </IonText>
        </div>
        <IonProgressBar 
          value={progress / 100} 
          color={status === 'syncing' ? 'primary' : 'success'} 
          className="pwa-sync-bar" 
        />
      </div>
    </div>
  );
};

export default PWASyncProgress;
