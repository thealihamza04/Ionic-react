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
    id: 'mon-it3016',
    courseCode: 'IT3016',
    section: 'W1',
    courseName: 'Simulation & Modeling',
    room: 'SST1-705B',
    instructor: 'Ateeqa Naseer',
    day: 1,
    normalTime: '9:30 AM - 10:45 AM',
    ramadanTime: '9:00 AM - 9:55 AM'
  },
  {
    id: 'tue-se480',
    courseCode: 'SE480',
    section: 'W2',
    courseName: 'Design Pattern & Refactoring',
    room: '',
    instructor: 'Dr. Nosheen Qamar',
    day: 2,
    normalTime: '11:00 AM - 12:15 PM',
    ramadanTime: '10:00 AM - 10:55 AM'
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
    id: 'wed-hu4092',
    courseCode: 'HU4092',
    section: 'W2',
    courseName: 'Professional Practices',
    room: 'SST2-1303',
    instructor: 'Shama Sadaqat',
    day: 3,
    normalTime: '11:00 AM - 12:15 PM',
    ramadanTime: '10:00 AM - 10:55 AM'
  },
  {
    id: 'wed-cc371',
    courseCode: 'CC371',
    section: 'W5',
    courseName: 'Artificial Intelligence',
    room: '',
    instructor: 'Faculty TBA',
    day: 3,
    normalTime: '2:00 PM - 3:15 PM',
    ramadanTime: '12:00 PM - 12:55 PM'
  },
  {
    id: 'thu-it3016',
    courseCode: 'IT3016',
    section: 'W1',
    courseName: 'Simulation & Modeling',
    room: 'SST1-705B',
    instructor: 'Ateeqa Naseer',
    day: 4,
    normalTime: '9:30 AM - 10:45 AM',
    ramadanTime: '9:00 AM - 9:55 AM'
  },
  {
    id: 'fri-se480',
    courseCode: 'SE480',
    section: 'W2',
    courseName: 'Design Pattern & Refactoring',
    room: '',
    instructor: 'Dr. Nosheen Qamar',
    day: 5,
    normalTime: '11:00 AM - 12:15 PM',
    ramadanTime: '10:00 AM - 10:55 AM'
  },
  {
    id: 'fri-cc371',
    courseCode: 'CC371',
    section: 'W5',
    courseName: 'Artificial Intelligence',
    room: '',
    instructor: 'Faculty TBA',
    day: 5,
    normalTime: '2:00 PM - 3:15 PM',
    ramadanTime: '11:00 AM - 11:55 AM'
  },
  {
    id: 'sat-hu4092',
    courseCode: 'HU4092',
    section: 'W2',
    courseName: 'Professional Practices',
    room: 'SST2-1303',
    instructor: 'Shama Sadaqat',
    day: 6,
    normalTime: '11:00 AM - 12:15 PM',
    ramadanTime: '10:00 AM - 10:55 AM'
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
