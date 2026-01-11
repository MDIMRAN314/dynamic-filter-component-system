import type { Employee } from '@/domain/employee/employee.types';

// Helper to generate random items
const randomFrom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const names = [
  'John Smith',
  'Jane Doe',
  'Alice Johnson',
  'Bob Brown',
  'Charlie Green',
];
const departments = ['Engineering', 'HR', 'Marketing', 'Finance'];
const roles = ['Junior Developer', 'Senior Developer', 'Manager', 'Team Lead'];
const skills = ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Redux', 'Docker'];
const cities = ['San Francisco', 'New York', 'Austin', 'Seattle', 'Boston'];
const states = ['CA', 'NY', 'TX', 'WA', 'MA'];
const countries = ['USA', 'USA', 'UK', 'Germany'];

export const sampleEmployees: Employee[] = Array.from(
  { length: 100 },
  (_, i) => ({
    id: i + 1,
    name: randomFrom(names),
    email: `user${i + 1}@company.com`,
    department: randomFrom(departments),
    role: randomFrom(roles),
    salary: Math.floor(Math.random() * 90000) + 50000, // 50k - 140k
    joinDate: new Date(
      2018 + Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    ).toISOString(),
    isActive: Math.random() > 0.3,
    skills: Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () =>
      randomFrom(skills),
    ),
    address: {
      city: randomFrom(cities),
      state: randomFrom(states),
      country: randomFrom(countries),
    },
    projects: Math.floor(Math.random() * 5) + 1,
    lastReview: new Date(
      2023,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    ).toISOString(),
    performanceRating: Math.round(Math.random() * 5 * 10) / 10, // 0.0 - 5.0
  }),
);
