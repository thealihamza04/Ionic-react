export type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Academic' | 'Administrative' | 'Event' | 'Financial';
  isImportant: boolean;
};

export const announcements: Announcement[] = [
  {
    id: 'a1',
    title: 'Final Examination Schedule - Spring 2026',
    content: 'The final examination schedule for Spring 2026 has been published. Please check your respective department notice boards or the student portal for details.',
    date: '15 Mar 2026',
    category: 'Academic',
    isImportant: true
  },
  {
    id: 'a2',
    title: 'Annual Sports Gala 2026 Registration',
    content: 'Registration for the Annual Sports Gala is now open. Interested students can sign up at the Student Affairs office before March 25th.',
    date: '14 Mar 2026',
    category: 'Event',
    isImportant: false
  },
  {
    id: 'a3',
    title: 'Scholarship Applications for Fall 2026',
    content: 'Applications for merit-based and need-based scholarships for the Fall 2026 semester are now being accepted. Deadline is May 15th.',
    date: '12 Mar 2026',
    category: 'Financial',
    isImportant: true
  },
  {
    id: 'a4',
    title: 'Update to University Library Timings',
    content: 'Starting next week, the central library will remain open until 10:00 PM on weekdays to facilitate students during the exam season.',
    date: '10 Mar 2026',
    category: 'Administrative',
    isImportant: false
  }
];
