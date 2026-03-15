import React from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonBadge
} from '@ionic/react';
import { 
  calendarOutline, 
  notificationsOutline, 
  megaphoneOutline,
  timeOutline,
  locationOutline
} from 'ionicons/icons';
import type { LectureItem } from '../constants/timetable';
import { studentProfile } from '../constants/studentRecords';
import { announcements } from '../constants/announcementsData';

type HomeProps = {
  todayLabel: string;
  todayLectures: LectureItem[];
};

const Home: React.FC<HomeProps> = ({
  todayLabel,
  todayLectures
}) => {
  const firstName = studentProfile.name.split(' ')[0];
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  const latestAnnouncement = announcements[0];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--padding-top': 'var(--space-lg)' } as React.CSSProperties}>
          <IonTitle style={{ 
            fontSize: 'var(--font-size-lg)', 
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--app-text-main)'
          }}>Dashboard</IonTitle>
          <div slot="end" style={{ paddingRight: 'var(--space-md)' }}>
            <IonIcon icon={notificationsOutline} style={{ fontSize: '24px', color: 'var(--app-text-muted)' }} />
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': 'var(--app-background)' } as React.CSSProperties}>
        {/* Header Greeting */}
        <div style={{ padding: 'var(--space-md) var(--space-lg) var(--space-xl) var(--space-lg)' }}>
          <IonText color="medium">
            <p style={{ 
              margin: 0, 
              fontSize: 'var(--font-size-xs)', 
              textTransform: 'uppercase', 
              letterSpacing: '1px',
              fontWeight: 'var(--font-weight-medium)'
            }}>{currentDate}</p>
          </IonText>
          <h1 style={{ 
            margin: 'var(--space-xs) 0 0 0', 
            fontSize: 'var(--font-size-xl)', 
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--app-text-main)'
          }}>Hey {firstName.charAt(0) + firstName.slice(1).toLowerCase()}</h1>
        </div>

        {/* Latest Announcement Card */}
        <div style={{ padding: '0 var(--space-lg)' }}>
          <IonText color="medium">
            <h3 style={{ 
              fontSize: 'var(--font-size-xs)', 
              fontWeight: 'var(--font-weight-semibold)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              marginBottom: 'var(--space-md)'
            }}>Recent News</h3>
          </IonText>
          
          <div style={{
            background: 'var(--app-card-bg)',
            padding: 'var(--space-md)',
            borderRadius: 'var(--radius-md)',
            border: '0.5px solid var(--app-border)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: 'var(--space-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
              <IonIcon icon={megaphoneOutline} style={{ color: 'var(--app-primary)', fontSize: '16px' }} />
              <span style={{ fontSize: '10px', color: 'var(--app-text-muted)', fontWeight: 'var(--font-weight-medium)', textTransform: 'uppercase' }}>
                Latest Update
              </span>
            </div>
            <h4 style={{ margin: 0, fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--app-text-main)' }}>
              {latestAnnouncement.title}
            </h4>
            <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--app-text-muted)', lineHeight: '1.4' }}>
              {latestAnnouncement.content.slice(0, 80)}...
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div style={{ padding: '0 var(--space-lg)' }}>
          <IonText color="medium">
            <h3 style={{ 
              fontSize: 'var(--font-size-xs)', 
              fontWeight: 'var(--font-weight-semibold)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              marginBottom: 'var(--space-md)'
            }}>Schedule Preview</h3>
          </IonText>

          {todayLectures.length === 0 ? (
            <div style={{
              padding: 'var(--space-xl) var(--space-md)',
              textAlign: 'center',
              background: 'var(--app-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '0.5px dashed var(--app-border)'
            }}>
              <IonText color="medium">
                <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>No classes planned for {todayLabel.toLowerCase()}</p>
              </IonText>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {todayLectures.map((lecture) => (
                <div key={lecture.id} style={{
                  background: 'var(--app-card-bg)',
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-md)',
                  border: '0.5px solid var(--app-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)'
                }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: 'var(--radius-sm)', 
                    background: 'var(--app-primary-soft)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IonIcon icon={calendarOutline} style={{ color: 'var(--app-primary-text)', fontSize: '18px' }} />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>{lecture.courseCode}</h4>
                    <p style={{ margin: 'var(--space-2xs) 0 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--app-text-muted)' }}>{lecture.courseName}</p>
                    
                    <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xs)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IonIcon icon={timeOutline} style={{ fontSize: '12px', color: 'var(--app-text-hint)' }} />
                        <span style={{ fontSize: '10px', color: 'var(--app-text-hint)' }}>{lecture.normalTime.split(' ')[0]}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IonIcon icon={locationOutline} style={{ fontSize: '12px', color: 'var(--app-text-hint)' }} />
                        <span style={{ fontSize: '10px', color: 'var(--app-text-hint)' }}>{lecture.room}</span>
                      </div>
                    </div>
                  </div>
                  
                  <IonBadge style={{ 
                    '--background': 'var(--app-surface)', 
                    '--color': 'var(--app-text-muted)',
                    fontSize: '10px',
                    fontWeight: 'normal',
                    padding: '4px 8px'
                  } as React.CSSProperties}>{lecture.section}</IonBadge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 'calc(var(--space-2xl) + env(safe-area-inset-bottom))' }} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
