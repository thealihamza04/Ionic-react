export type LectureItem = {
  id: string;
  courseCode: string;
  section: string;
  courseName: string;
  room: string;
  instructor: string;
  day: number;
  normalTime: string;
  ramadanTime: string;
};

export const TIMETABLE: LectureItem[] = [
  {
    id: 'mon-hu201',
    courseCode: 'HU201',
    section: 'W5',
    courseName: 'Professional Practices',
    room: 'SST1-705A',
    instructor: 'Dr. Abdul Ghaffar',
    day: 1,
    normalTime: '8:00 AM - 9:15 AM',
    ramadanTime: '8:00 AM - 8:55 AM'
  },
  {
    id: 'mon-it3016',
    courseCode: 'IT3016',
    section: 'W1',
    courseName: 'Simulation and Modeling',
    room: 'SST1-705B',
    instructor: 'Ateeqa Naseer',
    day: 1,
    normalTime: '9:30 AM - 10:45 AM',
    ramadanTime: '9:00 AM - 9:55 AM'
  },
  {
    id: 'wed-cs438-1',
    courseCode: 'CS438',
    section: 'W1',
    courseName: 'Natural Language Processing',
    room: 'SST1-705B',
    instructor: 'Waqar Ashiq',
    day: 3,
    normalTime: '8:00 AM - 9:15 AM',
    ramadanTime: '8:00 AM - 8:55 AM'
  },
  {
    id: 'wed-cs438-2',
    courseCode: 'CS438',
    section: 'W1',
    courseName: 'Natural Language Processing',
    room: 'SST1-705B',
    instructor: 'Waqar Ashiq',
    day: 3,
    normalTime: '9:30 AM - 10:45 AM',
    ramadanTime: '9:00 AM - 9:55 AM'
  },
  {
    id: 'thu-hu201',
    courseCode: 'HU201',
    section: 'W5',
    courseName: 'Professional Practices',
    room: 'SST1-705A',
    instructor: 'Dr. Abdul Ghaffar',
    day: 4,
    normalTime: '8:00 AM - 9:15 AM',
    ramadanTime: '8:00 AM - 8:55 AM'
  },
  {
    id: 'thu-it3016',
    courseCode: 'IT3016',
    section: 'W1',
    courseName: 'Simulation and Modeling',
    room: 'SST1-705B',
    instructor: 'Ateeqa Naseer',
    day: 4,
    normalTime: '9:30 AM - 10:45 AM',
    ramadanTime: '9:00 AM - 9:55 AM'
  },
  {
    id: 'fri-cs4152-1',
    courseCode: 'CS4152',
    section: 'W1',
    courseName: 'Deep Learning and Neural Networks',
    room: 'SST2-702',
    instructor: 'Muhammad Asif Subhani',
    day: 5,
    normalTime: '8:00 AM - 9:15 AM',
    ramadanTime: '8:00 AM - 8:55 AM'
  },
  {
    id: 'fri-cs4152-2',
    courseCode: 'CS4152',
    section: 'W1',
    courseName: 'Deep Learning and Neural Networks',
    room: 'SST2-702',
    instructor: 'Muhammad Asif Subhani',
    day: 5,
    normalTime: '9:30 AM - 10:45 AM',
    ramadanTime: '9:00 AM - 9:55 AM'
  }
];

export const DAY_LABELS: Record<number, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
};

export function getLecturesForDay(day: number): LectureItem[] {
  return TIMETABLE.filter((lecture) => lecture.day === day);
}
