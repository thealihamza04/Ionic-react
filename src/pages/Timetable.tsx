import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { cafeOutline, moonOutline } from 'ionicons/icons';
import { timetableData } from '../constants/timetableData';

const Timetable: React.FC = () => {
  const [mode, setMode] = useState<'normal' | 'ramadan'>('normal');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ai': return 'var(--app-primary)';
      case 'nlp': return 'var(--app-secondary)';
      case 'sim': return 'var(--app-tertiary)';
      case 'pp': return 'var(--app-warning)';
      default: return 'var(--app-text-muted)';
    }
  };

  const getSoftColor = (type: string) => {
    switch (type) {
      case 'ai': return 'var(--app-primary-soft)';
      case 'nlp': return 'var(--app-secondary-soft)';
      case 'sim': return 'var(--app-tertiary-soft)';
      case 'pp': return 'var(--app-warning-soft)';
      default: return 'var(--app-surface)';
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case 'ai': return 'var(--app-primary-text)';
      case 'nlp': return 'var(--app-secondary-text)';
      case 'sim': return 'var(--app-tertiary-text)';
      case 'pp': return 'var(--app-warning-text)';
      default: return 'var(--app-text-main)';
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
          }}>Schedule</IonTitle>
        </IonToolbar>
        <IonToolbar style={{ '--padding-bottom': 'var(--space-sm)' } as React.CSSProperties}>
          <div style={{ padding: '0 var(--space-md)' }}>
            <IonSegment
              mode="ios"
              value={mode}
              onIonChange={(e) => setMode(e.detail.value as 'normal' | 'ramadan')}
              style={{ 
                '--background': 'var(--app-surface)',
                '--indicator-color': 'var(--app-card-bg)',
                height: '36px',
                borderRadius: 'var(--radius-sm)'
              } as React.CSSProperties}
            >
              <IonSegmentButton value="normal" style={{ '--color-checked': 'var(--app-primary-text)' } as React.CSSProperties}>
                <IonLabel style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>Normal</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="ramadan" style={{ '--color-checked': 'var(--app-primary-text)' } as React.CSSProperties}>
                <IonLabel style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>Ramadan</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--app-background)' } as React.CSSProperties}>
        {mode === 'ramadan' && (
          <div style={{ 
            textAlign: 'center', 
            padding: 'var(--space-md) 0',
            background: 'var(--app-primary-soft)',
            margin: 'var(--space-md) var(--space-md) 0 var(--space-md)',
            borderRadius: 'var(--radius-md)',
            border: '0.5px solid var(--app-primary-soft)'
          }}>
            <IonText style={{ color: 'var(--app-primary-text)' }}>
              <p style={{ 
                fontSize: 'var(--font-size-xs)', 
                fontWeight: 'var(--font-weight-semibold)',
                textTransform: 'uppercase', 
                letterSpacing: '0.05em',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-xs)'
              }}>
                <IonIcon icon={moonOutline} />
                Ramadan Timings Active
              </p>
            </IonText>
          </div>
        )}

        {timetableData.map((day) => (
          <div key={day.day}>
            <IonListHeader style={{ 
              paddingStart: 'var(--space-lg)', 
              minHeight: '40px', 
              marginTop: 'var(--space-lg)',
              '--background': 'transparent'
            } as React.CSSProperties}>
              <IonLabel style={{ 
                color: 'var(--app-text-muted)', 
                fontSize: 'var(--font-size-xs)', 
                fontWeight: 'var(--font-weight-semibold)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em' 
              }}>
                {day.day}
              </IonLabel>
            </IonListHeader>

            {day.slots.length === 0 ? (
              <div style={{
                margin: 'var(--space-sm) var(--space-md) var(--space-lg) var(--space-md)',
                padding: 'var(--space-xl) var(--space-md)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--app-surface)',
                textAlign: 'center',
                border: '0.5px dashed var(--app-border-strong)',
                transition: 'transform var(--duration-base) var(--ease-out)'
              }}>
                <IonIcon icon={cafeOutline} style={{ 
                  fontSize: 'var(--font-size-2xl)', 
                  color: 'var(--app-text-hint)', 
                  marginBottom: 'var(--space-sm)',
                  opacity: 0.5 
                }} />
                <h3 style={{ 
                  margin: 0, 
                  fontSize: 'var(--font-size-sm)', 
                  fontWeight: 'var(--font-weight-semibold)', 
                  color: 'var(--app-text-main)' 
                }}>
                  No classes scheduled
                </h3>
                <p style={{ 
                  margin: 'var(--space-xs) 0 0 0', 
                  fontSize: 'var(--font-size-xs)', 
                  color: 'var(--app-text-muted)' 
                }}>
                  Enjoy your free day!
                </p>
              </div>
            ) : (
              <IonList style={{ background: 'transparent', padding: '0 var(--space-md)' }}>
                {day.slots.map((slot, idx) => (
                  <div key={`${day.day}-${idx}`} style={{
                    background: 'var(--app-card-bg)',
                    marginBottom: 'var(--space-sm)',
                    borderRadius: 'var(--radius-md)',
                    border: '0.5px solid var(--app-border)',
                    boxShadow: 'var(--shadow-sm)',
                    padding: 'var(--space-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    transition: 'all var(--duration-base) var(--ease-out)'
                  }}>
                    {/* Visual Indicator Pill */}
                    <div style={{
                      width: '4px',
                      height: '32px',
                      borderRadius: 'var(--radius-full)',
                      background: getTypeColor(slot.type),
                      flexShrink: 0
                    }} />
                    
                    <div style={{ flex: 1 }}>
                      <h2 style={{ 
                        fontSize: 'var(--font-size-md)', 
                        fontWeight: 'var(--font-weight-semibold)', 
                        color: 'var(--app-text-main)',
                        margin: 0
                      }}>{slot.name}</h2>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 'var(--space-sm)',
                        marginTop: 'var(--space-2xs)'
                      }}>
                        <div style={{
                          background: getSoftColor(slot.type),
                          color: getTextColor(slot.type),
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          textTransform: 'uppercase'
                        }}>{slot.code}</div>
                        <IonText style={{ fontSize: 'var(--font-size-xs)', color: 'var(--app-text-muted)' }}>
                          {slot.room}
                        </IonText>
                      </div>
                      <p style={{ 
                        fontSize: 'var(--font-size-xs)', 
                        color: 'var(--app-text-hint)',
                        margin: 'var(--space-xs) 0 0 0'
                      }}>{slot.instructor}</p>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <IonText style={{ color: 'var(--app-text-main)' }}>
                        <span style={{ fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-sm)' }}>
                          {mode === 'normal' ? slot.timeNormal.split(' – ')[0] : slot.timeRamadan.split(' – ')[0]}
                        </span>
                      </IonText>
                      <p style={{ 
                        fontSize: 'var(--font-size-xs)', 
                        color: 'var(--app-text-muted)', 
                        margin: 'var(--space-2xs) 0 0 0' 
                      }}>
                        {mode === 'normal' ? slot.timeNormal.split(' – ')[1] : slot.timeRamadan.split(' – ')[1]}
                      </p>
                    </div>
                  </div>
                ))}
              </IonList>
            )}
          </div>
        ))}
        {/* Safe area spacer */}
        <div style={{ height: 'calc(var(--space-2xl) + env(safe-area-inset-bottom))' }} />
      </IonContent>
    </IonPage>
  );
};

export default Timetable;

