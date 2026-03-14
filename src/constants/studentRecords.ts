export const degreeBreakdown = [
  { label: 'Core courses', courses: 30, creditHours: 96 },
  { label: 'Technical electives', courses: 5, creditHours: 15 },
  { label: 'Supporting electives', courses: 3, creditHours: 9 },
  { label: 'University electives', courses: 4, creditHours: 12 }
];

export const completedUniversityElectives = [
  'Introduction to Psychology',
  'Introduction to Sociology',
  'Introduction to Marketing',
  'Introduction to Management'
];

export function parseCourseEntry(entry: string) {
  const [left, grade = ''] = entry.split(' — ');
  const firstSpace = left.indexOf(' ');
  const code = firstSpace > -1 ? left.slice(0, firstSpace) : left;
  const title = firstSpace > -1 ? left.slice(firstSpace + 1) : left;
  return { code, title, grade };
}

export const transcriptBySemester = [
  {
    term: 'Fall 2022',
    earnedCredits: 16,
    sgpa: 3.28,
    cgpa: 3.28,
    courses: [
      'CC1021 Programming Fundamentals — A-',
      'CC1021L Programming Fundamentals (Lab) — A-',
      'EN111 English Grammar and Comprehension — B-',
      'ISL101 Islamic Studies — B-',
      'IT1091 Introduction to Info & Comm. Technologies — B+',
      'IT1091L Introduction to Info & Comm. Technologies (Lab) — A-',
      'MA107 Calculus and Analytical Geometry — A-'
    ]
  },
  {
    term: 'Spring 2023',
    earnedCredits: 16,
    sgpa: 2.96,
    cgpa: 3.12,
    courses: [
      'CC1022 Object Oriented Programming — B-',
      'CC1022L Object Oriented Programming (Lab) — B+',
      'CC1041 Discrete Structures — B+',
      'EN125 Composition and Communication — C-',
      'NS125 Applied Physics — B+',
      'NS125L Applied Physics (Lab) — B+',
      'POL101 Pakistan Studies — A-'
    ]
  },
  {
    term: 'Fall 2023',
    earnedCredits: 16,
    sgpa: 3.38,
    cgpa: 3.21,
    courses: [
      'CC2042 Data Structures and Algorithms — A',
      'CC2042L Data Structures and Algorithms (Lab) — A',
      'CC2101 Software Engineering — A-',
      'EN220 Research Paper Writing and Presentation — C',
      'MA210 Linear Algebra — A',
      'MK210 Principles of Marketing — B'
    ]
  },
  {
    term: 'Spring 2024',
    earnedCredits: 16,
    sgpa: 3.49,
    cgpa: 3.28,
    courses: [
      'CC2141 Database Systems — A-',
      'CC2141L Database Systems (Lab) — A-',
      'IT4052 Operations Research — B+',
      'MA150 Probability and Statistics — A-',
      'MG120 Principles of Management — B',
      'SE2102 Software Requirement Engineering (SRE) — A-'
    ]
  },
  {
    term: 'Fall 2024',
    earnedCredits: 17,
    sgpa: 3.54,
    cgpa: 3.33,
    courses: [
      'CC3011 Operating Systems — B',
      'CC3011L Operating Systems (Lab) — A-',
      'CC3071 Computer Networks — A-',
      'CC3071L Computer Networks (Lab) — B+',
      'IT3110 Web Technologies — A',
      'SC160 Introduction to Sociology — B+',
      'SE3103 Software Design and Architecture — A+'
    ]
  },
  {
    term: 'Spring 2025',
    earnedCredits: 18,
    sgpa: 3.68,
    cgpa: 3.39,
    courses: [
      'CC3121 Information Security — B',
      'CS458 Data Mining — B+',
      'SD102 21st Century Skills — P',
      'SE3104 Formal Methods in Software Engineering — A',
      'SE3111 Software Construction and Development — A',
      'SE3111L Software Construction and Development (Lab) — B+',
      'SE3162 Web Engineering — A',
      'SE4114 Human Computer Interaction — A'
    ]
  },
  {
    term: 'Fall 2025',
    earnedCredits: 9,
    sgpa: 3.8,
    cgpa: 3.43,
    courses: [
      'CS446 Machine Learning — A-',
      'PSY101 Introduction to Psychology — A-',
      'SD100 English Immersion — P',
      'SE4112 Software Quality Engineering — A'
    ]
  }
];

export const studentProfile = {
  studentId: 'F2022065286',
  name: 'ALI HAMZA',
  program: 'BS(SE)',
  batch: 'F2022065',
  date: '14 Mar 2026'
};

export const paymentTransactions = [
  { date: '07 Oct 2022', challanNo: '941057', account: 'ADMISSION FEE', amount: 'Rs 25,000', bank: 'Meezan-B-S' },
  { date: '07 Oct 2022', challanNo: '941057', account: 'COURSE FEE (Tuition Fee)', amount: 'Rs 99,375', bank: 'Meezan-B-S' },
  { date: '06 Dec 2022', challanNo: '971482', account: 'Tuition Fee: Dec-2022', amount: 'Rs 29,813', bank: 'HBL (UMT)' },
  { date: '10 Mar 2023', challanNo: '1020736', account: 'Tuition Fee: Mar-2023', amount: 'Rs 32,297', bank: 'ABL' },
  { date: '15 Apr 2023', challanNo: '996516', account: 'Tuition Fee: Mar-2023', amount: 'Rs 32,297', bank: 'ABL' },
  { date: '15 Apr 2023', challanNo: '996516', account: 'Contribution for ILM Fund Scholarships', amount: 'Rs 3,100', bank: 'ABL' },
  { date: '24 May 2023', challanNo: '1028833', account: 'COURSE FEE (Tuition Fee) arrears', amount: 'Rs 34,780', bank: 'ABL' },
  { date: '04 Jul 2023', challanNo: '1035122', account: 'Tuition Fee: Jun-2023', amount: 'Rs 32,297', bank: 'ABL' },
  { date: '11 Sep 2023', challanNo: '1108018', account: 'COURSE FEE (Arrears)', amount: 'Rs 17,400', bank: 'ABL' },
  { date: '11 Sep 2023', challanNo: '1108018', account: 'Semester Registration Fee', amount: 'Rs 5,000', bank: 'ABL' },
  { date: '09 Oct 2023', challanNo: '1108020', account: 'Tuition Fee: Sep-2023', amount: 'Rs 37,150', bank: 'ABL' },
  { date: '13 Nov 2023', challanNo: '1108022', account: 'Tuition Fee: Sep-2023', amount: 'Rs 37,150', bank: 'ABL' },
  { date: '29 Dec 2023', challanNo: '1132742', account: 'Tuition Fee: Dec-2023', amount: 'Rs 37,174', bank: 'ABL' },
  { date: '29 Dec 2023', challanNo: '1132742', account: 'Contribution for ILM Fund Scholarships', amount: 'Rs 3,600', bank: 'ABL' },
  { date: '29 Jan 2024', challanNo: '1161182', account: 'Tuition Fee: Dec-2023', amount: 'Rs 37,174', bank: 'Meezan-B-S' },
  { date: '17 Apr 2024', challanNo: '1161184', account: 'COURSE FEE (Arrears)', amount: 'Rs 8,671', bank: 'ABL' },
  { date: '17 Apr 2024', challanNo: '1161184', account: 'Tuition Fee: Dec-2023', amount: 'Rs 28,503', bank: 'ABL' },
  { date: '08 May 2024', challanNo: '1197313', account: 'COURSE FEE (Tuition Fee)', amount: 'Rs 51,426', bank: 'ABL' },
  { date: '07 Jun 2024', challanNo: '1197314', account: 'COURSE FEE (Tuition Fee)', amount: 'Rs 51,426', bank: 'ABL' },
  { date: '12 Jul 2024', challanNo: '1220325', account: 'Semester Registration Fee', amount: 'Rs 5,000', bank: 'ABL' },
  { date: '12 Jul 2024', challanNo: '1220325', account: 'Tuition Fee: Jun-2024', amount: 'Rs 51,426', bank: 'ABL' },
  { date: '08 Aug 2024', challanNo: '1231193', account: 'Tuition Fee: Jun-2024', amount: 'Rs 51,426', bank: 'Meezan-B-S' },
  { date: '03 Oct 2024', challanNo: '1264844', account: 'Semester Registration Fee', amount: 'Rs 5,000', bank: 'ABL' },
  { date: '03 Oct 2024', challanNo: '1264844', account: 'Tuition Fee: Sep-2024', amount: 'Rs 40,285', bank: 'ABL' },
  { date: '03 Oct 2024', challanNo: '1264844', account: 'Contribution for ILM Fund Scholarships', amount: 'Rs 5,400', bank: 'ABL' },
  { date: '23 Oct 2024', challanNo: '1288051', account: 'Tuition Fee: Sep-2024', amount: 'Rs 52,285', bank: 'ABL' },
  { date: '09 Dec 2024', challanNo: '1320050', account: 'Tuition Fee: Dec-2024', amount: 'Rs 30,862', bank: 'ABL' },
  { date: '07 Jan 2025', challanNo: '1324589', account: 'Tuition Fee: Dec-2024', amount: 'Rs 30,862', bank: 'ABL' },
  { date: '06 Feb 2025', challanNo: '1324590', account: 'Tuition Fee: Dec-2024', amount: 'Rs 30,862', bank: 'ABL' },
  { date: '28 Mar 2025', challanNo: '1345118', account: 'Semester Registration Fee', amount: 'Rs 5,000', bank: 'Meezan-B-S' },
  { date: '28 Mar 2025', challanNo: '1345118', account: 'Tuition Fee: Mar-2025', amount: 'Rs 30,862', bank: 'Meezan-B-S' },
  { date: '18 Apr 2025', challanNo: '1379736', account: 'Tuition Fee: Mar-2025', amount: 'Rs 30,862', bank: 'ABL' },
  { date: '20 May 2025', challanNo: '1379820', account: 'Tuition Fee: Mar-2025', amount: 'Rs 30,862', bank: 'Meezan-B-S' },
  { date: '23 Jun 2025', challanNo: '1387113', account: '21st Century Skills', amount: 'Rs 5,000', bank: 'ABL' },
  { date: '23 Jun 2025', challanNo: '1387113', account: 'Tuition Fee: Jun-2025', amount: 'Rs 30,856', bank: 'ABL' },
  { date: '23 Jun 2025', challanNo: '1387113', account: 'Contribution for ILM Fund Scholarships', amount: 'Rs 3,200', bank: 'ABL' },
  { date: '15 Jul 2025', challanNo: '1418016', account: 'Tuition Fee: Jun-2025', amount: 'Rs 30,856', bank: 'Meezan-B-S' },
  { date: '13 Aug 2025', challanNo: '1418018', account: 'Tuition Fee: Jun-2025', amount: 'Rs 30,856', bank: 'Meezan-B-S' },
  { date: '30 Sep 2025', challanNo: '1433443', account: 'Semester Registration Fee (F2025)', amount: 'Rs 5,000', bank: 'Meezan-B-S' },
  { date: '30 Sep 2025', challanNo: '1433443', account: 'Tuition Fee: Sep-2025', amount: 'Rs 28,255', bank: 'Meezan-B-S' },
  { date: '30 Oct 2025', challanNo: '1464503', account: 'Tuition Fee: Sep-2025', amount: 'Rs 28,255', bank: 'HBL-Cash' },
  { date: '27 Nov 2025', challanNo: '1464504', account: 'Tuition Fee: Sep-2025', amount: 'Rs 28,255', bank: 'Meezan-B-S' },
  { date: '29 Dec 2025', challanNo: '1484010', account: 'English Immersion', amount: 'Rs 5,000', bank: 'Meezan-B-S' },
  { date: '29 Dec 2025', challanNo: '1484010', account: 'Tuition Fee: Dec-2025', amount: 'Rs 28,619', bank: 'Meezan-B-S' },
  { date: '18 Jan 2026', challanNo: '1520635', account: 'Tuition Fee: Dec-2025', amount: 'Rs 28,619', bank: 'Meezan-B-S' },
  { date: '21 Feb 2026', challanNo: '1520637', account: 'Tuition Fee: Dec-2025', amount: 'Rs 28,619', bank: 'Meezan-B-S' }
];

export const totalPayments = 'Rs 1,286,017';

export const paymentSummary = [
  { account: 'English Immersion', amount: 'Rs 5,000' },
  { account: '21st Century Skills', amount: 'Rs 5,000' },
  { account: 'Contribution for ILM Fund Scholarships', amount: 'Rs 3,200' }
];
