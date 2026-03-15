export interface TimetableSlot {
  code: string;
  name: string;
  room: string;
  instructor: string;
  email: string;
  type: 'ai' | 'nlp' | 'sim' | 'pp';
  timeNormal: string;
  timeRamadan: string;
}

export interface DaySchedule {
  day: string;
  slots: TimetableSlot[];
}

export const timetableData: DaySchedule[] = [
  {
    day: 'Monday',
    slots: [
      {
        code: 'HU201 · W5',
        name: 'Professional Practices',
        room: 'SST1-705A',
        instructor: 'Dr. Abdul Ghaffar',
        email: 'abdul.ghaffar@umt.edu.pk',
        type: 'pp',
        timeNormal: '08:00 – 09:15 AM',
        timeRamadan: '08:00 – 08:55 AM'
      },
      {
        code: 'IT3016 · W1',
        name: 'Simulation and Modeling',
        room: 'SST1-705B',
        instructor: 'Ateeqa Naseer',
        email: 'ateeqa.naseer@umt.edu.pk',
        type: 'sim',
        timeNormal: '09:30 – 10:45 AM',
        timeRamadan: '09:00 – 09:55 AM'
      }
    ]
  },
  {
    day: 'Tuesday',
    slots: []
  },
  {
    day: 'Wednesday',
    slots: [
      {
        code: 'CS438 · W1',
        name: 'Natural Language Processing',
        room: 'SST1-705B',
        instructor: 'Waqar Ashiq',
        email: 'waqar.ashiq@umt.edu.pk',
        type: 'nlp',
        timeNormal: '08:00 – 09:15 AM',
        timeRamadan: '08:00 – 08:55 AM'
      },
      {
        code: 'CS438 · W1',
        name: 'Natural Language Processing',
        room: 'SST1-705B',
        instructor: 'Waqar Ashiq',
        email: 'waqar.ashiq@umt.edu.pk',
        type: 'nlp',
        timeNormal: '09:30 – 10:45 AM',
        timeRamadan: '09:00 – 09:55 AM'
      }
    ]
  },
  {
    day: 'Thursday',
    slots: [
      {
        code: 'HU201 · W5',
        name: 'Professional Practices',
        room: 'SST1-705A',
        instructor: 'Dr. Abdul Ghaffar',
        email: 'abdul.ghaffar@umt.edu.pk',
        type: 'pp',
        timeNormal: '08:00 – 09:15 AM',
        timeRamadan: '08:00 – 08:55 AM'
      },
      {
        code: 'IT3016 · W1',
        name: 'Simulation and Modeling',
        room: 'SST1-705B',
        instructor: 'Ateeqa Naseer',
        email: 'ateeqa.naseer@umt.edu.pk',
        type: 'sim',
        timeNormal: '09:30 – 10:45 AM',
        timeRamadan: '09:00 – 09:55 AM'
      }
    ]
  },
  {
    day: 'Friday',
    slots: [
      {
        code: 'CS4152 · W1',
        name: 'Deep Learning and Neural Networks',
        room: 'SST2-702',
        instructor: 'Muhammad Asif Subhani',
        email: 'asif.subhani@umt.edu.pk',
        type: 'ai',
        timeNormal: '08:00 – 09:15 AM',
        timeRamadan: '08:00 – 08:55 AM'
      },
      {
        code: 'CS4152 · W1',
        name: 'Deep Learning and Neural Networks',
        room: 'SST2-702',
        instructor: 'Muhammad Asif Subhani',
        email: 'asif.subhani@umt.edu.pk',
        type: 'ai',
        timeNormal: '09:30 – 10:45 AM',
        timeRamadan: '09:00 – 09:55 AM'
      }
    ]
  },
  {
    day: 'Saturday',
    slots: []
  }
];
