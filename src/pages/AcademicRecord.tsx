import React from 'react';
import {
  IonAccordion,
  IonAccordionGroup,
  IonBadge,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {
  completedUniversityElectives,
  degreeBreakdown,
  parseCourseEntry,
  paymentSummary,
  paymentTransactions,
  studentProfile,
  totalPayments,
  transcriptBySemester
} from '../constants/studentRecords';

const AcademicRecord: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Academic</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList inset>
          <IonItem>
            <IonLabel>
              <h2>{studentProfile.name}</h2>
              <p>{studentProfile.studentId}</p>
            </IonLabel>
            <IonNote slot="end">{studentProfile.date}</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>Program</IonLabel>
            <IonNote slot="end">{studentProfile.program}</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>Batch</IonLabel>
            <IonNote slot="end">{studentProfile.batch}</IonNote>
          </IonItem>
        </IonList>

        <IonList inset>
          <IonItem>
            <IonLabel>
              <h2>Degree breakdown</h2>
            </IonLabel>
          </IonItem>
          {degreeBreakdown.map((item) => (
            <IonItem key={item.label}>
              <IonLabel>{item.label}</IonLabel>
              <IonNote slot="end">
                {item.courses} courses · {item.creditHours} Cr.Hr
              </IonNote>
            </IonItem>
          ))}
        </IonList>

        <IonList inset>
          <IonItem>
            <IonLabel>
              <h2>University electives completed</h2>
            </IonLabel>
          </IonItem>
          {completedUniversityElectives.map((course) => (
            <IonItem key={course}>
              <IonLabel>{course}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonList inset>
          <IonItem>
            <IonLabel>
              <h2>Transcript by semester</h2>
            </IonLabel>
          </IonItem>
          <IonAccordionGroup>
            {transcriptBySemester.map((semester) => (
              <IonAccordion key={semester.term} value={semester.term}>
                <IonItem slot="header">
                  <IonLabel>{semester.term}</IonLabel>
                  <IonBadge slot="end">SGPA {semester.sgpa}</IonBadge>
                  <IonBadge slot="end" color="medium">
                    CGPA {semester.cgpa}
                  </IonBadge>
                </IonItem>
                <IonList slot="content">
                  <IonItem>
                    <IonLabel>Earned credits</IonLabel>
                    <IonNote slot="end">{semester.earnedCredits}</IonNote>
                  </IonItem>
                  {semester.courses.map((entry) => {
                    const { code, title, grade } = parseCourseEntry(entry);
                    return (
                      <IonItem key={entry}>
                        <IonLabel>
                          <h3>{code}</h3>
                          <p>{title}</p>
                        </IonLabel>
                        <IonBadge slot="end" color={grade === 'P' ? 'tertiary' : 'success'}>
                          {grade}
                        </IonBadge>
                      </IonItem>
                    );
                  })}
                </IonList>
              </IonAccordion>
            ))}
          </IonAccordionGroup>
        </IonList>

        <IonList inset>
          <IonItem>
            <IonLabel>
              <h2>Payment summary</h2>
              <p>Total paid: {totalPayments}</p>
            </IonLabel>
          </IonItem>
          {paymentSummary.map((item) => (
            <IonItem key={item.account}>
              <IonLabel>{item.account}</IonLabel>
              <IonNote slot="end">{item.amount}</IonNote>
            </IonItem>
          ))}
        </IonList>

        <IonList inset>
          <IonItem>
            <IonLabel>
              <h2>Transactions</h2>
              <p>{paymentTransactions.length} records</p>
            </IonLabel>
          </IonItem>
          {paymentTransactions.map((tx, idx) => (
            <IonItem key={`${tx.challanNo}-${idx}`}>
              <IonLabel>
                <h3>{tx.account}</h3>
                <p>
                  {tx.date} · Challan #{tx.challanNo}
                </p>
                <p>{tx.bank}</p>
              </IonLabel>
              <IonNote slot="end">{tx.amount}</IonNote>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AcademicRecord;
