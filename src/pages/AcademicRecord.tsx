import React, { useState } from 'react';
import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton
} from '@ionic/react';
import {
  libraryOutline,
  walletOutline,
  barChartOutline
} from 'ionicons/icons';
import {
  completedUniversityElectives,
  degreeBreakdown,
  parseCourseEntry,
  paymentTransactions,
  studentProfile,
  totalPayments,
  transcriptBySemester
} from '../constants/studentRecords';

const AcademicRecord: React.FC = () => {
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showFinancials, setShowFinancials] = useState(false);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'success';
    if (grade.startsWith('B')) return 'primary';
    if (grade.startsWith('C')) return 'warning';
    if (grade.startsWith('D')) return 'danger';
    if (grade === 'P') return 'tertiary';
    return 'medium';
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--padding-top': 'var(--space-lg)' } as React.CSSProperties}>
          <IonTitle style={{ 
            fontSize: 'var(--font-size-lg)', 
            fontWeight: 'var(--font-weight-semibold)', 
            color: 'var(--app-text-main)' 
          }}>Academic</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent style={{ '--background': 'var(--app-background)' } as React.CSSProperties}>
        {/* Minimal Profile Summary */}
        <div style={{ padding: 'var(--space-md) var(--space-lg)' }}>
          <div style={{ 
            borderBottom: '0.5px solid var(--app-border)', 
            paddingBottom: 'var(--space-md)' 
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: 'var(--font-size-md)', 
              fontWeight: 'var(--font-weight-semibold)' 
            }}>{studentProfile.name}</h2>
            <p style={{ 
              margin: 'var(--space-2xs) 0 0 0', 
              fontSize: 'var(--font-size-sm)', 
              color: 'var(--app-text-muted)' 
            }}>
              {studentProfile.studentId} · {studentProfile.program}
            </p>
          </div>
        </div>

        <IonList inset style={{ background: 'transparent', marginTop: 0 }}>
          <IonItem button onClick={() => setShowRoadmap(true)} detail={true} style={{ '--padding-start': '0' }}>
            <IonIcon icon={barChartOutline} slot="start" style={{ 
              color: 'var(--app-primary)', 
              fontSize: '18px',
              paddingLeft: 'var(--space-md)'
            }} />
            <IonLabel>
              <h2 style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-sm)' }}>Degree Roadmap</h2>
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => setShowTranscript(true)} detail={true} style={{ '--padding-start': '0' }}>
            <IonIcon icon={libraryOutline} slot="start" style={{ 
              color: 'var(--app-primary)', 
              fontSize: '18px',
              paddingLeft: 'var(--space-md)'
            }} />
            <IonLabel>
              <h2 style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-sm)' }}>Academic Transcript</h2>
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => setShowFinancials(true)} detail={true} style={{ '--padding-start': '0' }}>
            <IonIcon icon={walletOutline} slot="start" style={{ 
              color: 'var(--app-primary)', 
              fontSize: '18px',
              paddingLeft: 'var(--space-md)'
            }} />
            <IonLabel>
              <h2 style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-sm)' }}>Financial Status</h2>
            </IonLabel>
          </IonItem>
        </IonList>

        {/* Roadmap Sheet */}
        <IonModal isOpen={showRoadmap} onDidDismiss={() => setShowRoadmap(false)} initialBreakpoint={0.75} breakpoints={[0, 0.75, 1]} style={{ '--border-radius': 'var(--radius-lg)' }}>
          <IonHeader className="ion-no-border">
            <IonToolbar style={{ '--background': 'var(--app-background)' } as React.CSSProperties}>
              <IonTitle style={{ fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)' }}>Degree Roadmap</IonTitle>
              <IonButton slot="end" fill="clear" onClick={() => setShowRoadmap(false)} style={{ 
                fontSize: 'var(--font-size-sm)', 
                fontWeight: 'var(--font-weight-medium)',
                '--color': 'var(--app-text-muted)',
                textTransform: 'none'
              } as React.CSSProperties}>Close</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent style={{ '--background': 'var(--app-background)' } as React.CSSProperties}>
            <div style={{ padding: '0 var(--space-md)' }}>
              <IonAccordionGroup>
                {degreeBreakdown.map((item) => (
                  item.label === 'University electives' ? (
                    <IonAccordion key={item.label} value={item.label} style={{ 
                      borderBottom: '0.5px solid var(--app-border)',
                      '--background': 'transparent'
                    } as React.CSSProperties}>
                      <IonItem slot="header" style={{ '--background': 'transparent', '--padding-start': '0' }}>
                        <IonLabel className="ion-text-wrap">
                          <h3 style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-sm)' }}>{item.label}</h3>
                          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--app-text-muted)' }}>{item.courses} courses · {item.creditHours} hours</p>
                        </IonLabel>
                      </IonItem>
                      <div slot="content" style={{ background: 'var(--app-surface)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-sm)' }}>
                        <IonList lines="full" style={{ background: 'transparent' }}>
                          {completedUniversityElectives.map((course) => (
                            <IonItem key={course} lines="none" style={{ '--background': 'transparent' }}>
                                <IonLabel className="ion-text-wrap">
                                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--app-text-main)' }}>{course}</p>
                                </IonLabel>
                            </IonItem>
                          ))}
                        </IonList>
                      </div>
                    </IonAccordion>
                  ) : (
                    <IonItem key={item.label} style={{ 
                      borderBottom: '0.5px solid var(--app-border)',
                      '--background': 'transparent',
                      '--padding-start': '0'
                    } as React.CSSProperties}>
                      <IonLabel className="ion-text-wrap">
                        <h3 style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-sm)' }}>{item.label}</h3>
                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--app-text-muted)' }}>{item.courses} courses · {item.creditHours} hours</p>
                      </IonLabel>
                    </IonItem>
                  )
                ))}
              </IonAccordionGroup>
            </div>
          </IonContent>
        </IonModal>

        {/* Transcript Sheet */}
        <IonModal isOpen={showTranscript} onDidDismiss={() => setShowTranscript(false)} initialBreakpoint={0.9} breakpoints={[0, 0.9, 1]} style={{ '--border-radius': 'var(--radius-lg)' }}>
          <IonHeader className="ion-no-border">
            <IonToolbar style={{ '--background': 'var(--app-background)' } as React.CSSProperties}>
              <IonTitle style={{ fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)' }}>Academic Transcript</IonTitle>
              <IonButton slot="end" fill="clear" onClick={() => setShowTranscript(false)} style={{ 
                fontSize: 'var(--font-size-sm)', 
                fontWeight: 'var(--font-weight-medium)',
                '--color': 'var(--app-text-muted)',
                textTransform: 'none'
              } as React.CSSProperties}>Close</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent style={{ '--background': 'var(--app-background)' } as React.CSSProperties}>
            <div style={{ padding: '0 var(--space-md)' }}>
              <IonAccordionGroup>
                {transcriptBySemester.map((semester) => (
                  <IonAccordion key={semester.term} value={semester.term} style={{ 
                    borderBottom: '0.5px solid var(--app-border)', 
                    '--background': 'transparent'
                  } as React.CSSProperties}>
                    <IonItem slot="header" lines="none" style={{ '--background': 'transparent', '--padding-start': '0' }}>
                      <IonLabel>
                        <h2 style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-sm)' }}>{semester.term}</h2>
                      </IonLabel>
                      <div slot="end" style={{ 
                        background: 'var(--app-primary-soft)', 
                        color: 'var(--app-primary-text)', 
                        padding: '2px 8px', 
                        borderRadius: 'var(--radius-full)', 
                        fontSize: '11px', 
                        fontWeight: 'var(--font-weight-semibold)' 
                      }}>
                        {semester.sgpa} GPA
                      </div>
                    </IonItem>
                    <div slot="content" style={{ background: 'var(--app-surface)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-sm)' }}>
                      <IonList lines="full" style={{ background: 'transparent' }}>
                        {semester.courses.map((entry) => {
                          const { code, title, grade } = parseCourseEntry(entry);
                          const gradeColor = getGradeColor(grade);
                          const colorMap: any = {
                            success: ['var(--app-success-soft)', 'var(--app-success-text)'],
                            primary: ['var(--app-primary-soft)', 'var(--app-primary-text)'],
                            warning: ['var(--app-warning-soft)', 'var(--app-warning-text)'],
                            danger: ['var(--app-danger-soft)', 'var(--app-danger-text)'],
                            tertiary: ['var(--app-tertiary-soft)', 'var(--app-tertiary-text)'],
                            medium: ['var(--app-surface)', 'var(--app-text-hint)']
                          };
                          const [bg, col] = colorMap[gradeColor] || colorMap.medium;

                          return (
                            <IonItem key={entry} lines="none" style={{ '--background': 'transparent' }}>
                              <IonLabel className="ion-text-wrap">
                                <h3 style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-sm)' }}>{code}</h3>
                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--app-text-muted)' }}>{title}</p>
                              </IonLabel>
                              <div slot="end" style={{ 
                                background: bg, 
                                color: col, 
                                padding: '2px 6px', 
                                borderRadius: 'var(--radius-xs)', 
                                fontSize: '10px', 
                                fontWeight: 'var(--font-weight-semibold)',
                                minWidth: '24px',
                                textAlign: 'center'
                              }}>{grade}</div>
                            </IonItem>
                          );
                        })}
                      </IonList>
                    </div>
                  </IonAccordion>
                ))}
              </IonAccordionGroup>
            </div>
          </IonContent>
        </IonModal>

        {/* Financials Sheet */}
        <IonModal isOpen={showFinancials} onDidDismiss={() => setShowFinancials(false)} initialBreakpoint={0.8} breakpoints={[0, 0.8, 1]} style={{ '--border-radius': 'var(--radius-lg)' }}>
          <IonHeader className="ion-no-border">
            <IonToolbar style={{ '--background': 'var(--app-background)' } as React.CSSProperties}>
              <IonTitle style={{ fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)' }}>Financials</IonTitle>
              <IonButton slot="end" fill="clear" onClick={() => setShowFinancials(false)} style={{ 
                fontSize: 'var(--font-size-sm)', 
                fontWeight: 'var(--font-weight-medium)',
                '--color': 'var(--app-text-muted)',
                textTransform: 'none'
              } as React.CSSProperties}>Close</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent style={{ '--background': 'var(--app-background)' } as React.CSSProperties}>
            <div style={{ padding: '0 var(--space-md)' }}>
              <div style={{ 
                padding: 'var(--space-md) 0', 
                borderBottom: '0.5px solid var(--app-border)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--app-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Paid</span>
                <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--app-text-main)' }}>{totalPayments}</span>
              </div>
              
              <IonAccordionGroup>
                {(() => {
                  const grouped = paymentTransactions.reduce((acc, tx) => {
                    const year = tx.date.split(' ').pop() || 'Other';
                    if (!acc[year]) acc[year] = [];
                    acc[year].push(tx);
                    return acc;
                  }, {} as Record<string, typeof paymentTransactions>);

                  return Object.keys(grouped).sort((a, b) => b.localeCompare(a)).map((year) => (
                    <IonAccordion key={year} value={year} style={{ 
                      borderBottom: '0.5px solid var(--app-border)',
                      '--background': 'transparent' 
                    } as React.CSSProperties}>
                      <IonItem slot="header" style={{ '--background': 'transparent', '--padding-start': '0' }}>
                        <IonLabel>
                          <h2 style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-sm)' }}>{year}</h2>
                        </IonLabel>
                      </IonItem>
                      <div slot="content" style={{ background: 'var(--app-surface)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-sm)' }}>
                        <IonList lines="full" style={{ background: 'transparent' }}>
                          {grouped[year].map((tx, idx) => (
                            <IonItem key={`${tx.challanNo}-${idx}`} lines="none" style={{ '--background': 'transparent' }}>
                              <IonLabel>
                                <h3 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--app-text-main)' }}>{tx.account}</h3>
                                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--app-text-muted)' }}>{tx.date}</p>
                              </IonLabel>
                              <IonText slot="end" style={{ fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-sm)', color: 'var(--app-text-main)' }}>{tx.amount}</IonText>
                            </IonItem>
                          ))}
                        </IonList>
                      </div>
                    </IonAccordion>
                  ));
                })()}
              </IonAccordionGroup>
            </div>
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default AcademicRecord;
