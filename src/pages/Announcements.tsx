import React from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { 
  informationCircleOutline
} from 'ionicons/icons';
import { announcements } from '../constants/announcementsData';

const Announcements: React.FC = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'var(--app-primary-text)';
      case 'Event': return 'var(--app-success-text)';
      case 'Financial': return 'var(--app-secondary-text)';
      case 'Administrative': return 'var(--app-warning-text)';
      default: return 'var(--app-text-muted)';
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'Academic': return 'var(--app-primary-soft)';
      case 'Event': return 'var(--app-success-soft)';
      case 'Financial': return 'var(--app-secondary-soft)';
      case 'Administrative': return 'var(--app-warning-soft)';
      default: return 'var(--app-surface)';
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--padding-top': 'var(--space-lg)' } as React.CSSProperties}>
          <IonTitle style={{ 
            fontSize: 'var(--font-size-xl)', 
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--app-text-main)'
          }}>Announcements</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--app-background)' } as React.CSSProperties}>
        <div style={{ padding: '0 var(--space-md) var(--space-lg) var(--space-md)' }}>
          <IonList style={{ background: 'transparent' }}>
            {announcements.map((announcement) => (
              <div key={announcement.id} style={{
                background: 'var(--app-card-bg)',
                borderRadius: 'var(--radius-md)',
                border: '0.5px solid var(--app-border)',
                marginBottom: 'var(--space-md)',
                padding: 'var(--space-md)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {announcement.isImportant && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: 'var(--app-danger)'
                  }} />
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: 'var(--font-weight-semibold)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-sm)',
                    background: getCategoryBg(announcement.category),
                    color: getCategoryColor(announcement.category)
                  }}>
                    {announcement.category}
                  </span>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--app-text-hint)' }}>
                    {announcement.date}
                  </span>
                </div>

                <h2 style={{ 
                  fontSize: 'var(--font-size-md)', 
                  fontWeight: 'var(--font-weight-semibold)', 
                  color: 'var(--app-text-main)',
                  margin: '0 0 var(--space-xs) 0',
                  lineHeight: '1.4'
                }}>
                  {announcement.title}
                </h2>

                <p style={{ 
                  margin: 0, 
                  fontSize: 'var(--font-size-sm)', 
                  color: 'var(--app-text-muted)',
                  lineHeight: '1.6'
                }}>
                  {announcement.content}
                </p>

                {announcement.isImportant && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginTop: 'var(--space-sm)',
                    gap: '4px'
                  }}>
                    <IonIcon icon={informationCircleOutline} style={{ color: 'var(--app-danger)', fontSize: '14px' }} />
                    <span style={{ fontSize: '10px', color: 'var(--app-danger)', fontWeight: 'var(--font-weight-medium)' }}>Action Required</span>
                  </div>
                )}
              </div>
            ))}
          </IonList>
        </div>

        {/* Safe area spacer */}
        <div style={{ height: 'calc(var(--space-2xl) + env(safe-area-inset-bottom))' }} />
      </IonContent>
    </IonPage>
  );
};

export default Announcements;
