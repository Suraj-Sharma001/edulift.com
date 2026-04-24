import { NextResponse } from 'next/server';

const scholarships = [
  {
    id: 1,
    featured: true,
    title: 'EduLift Merit Scholarship',
    description: 'For students with strong academic performance and leadership potential.',
    amount: '$8000',
    deadline: '2026-08-15',
    category: 'merit-based'
  },
  {
    id: 2,
    featured: false,
    title: 'Future Innovators Grant',
    description: 'Supports learners building impactful projects in technology and education.',
    amount: '$5000',
    deadline: '2026-07-30',
    category: 'academic'
  },
  {
    id: 3,
    featured: false,
    title: 'Community Impact Award',
    description: 'Recognizes students with measurable service in their local communities.',
    amount: '$3500',
    deadline: '2026-09-10',
    category: 'community-service'
  },
  {
    id: 4,
    featured: false,
    title: 'Need-Based Success Fund',
    description: 'Financial support for students demonstrating need and commitment to studies.',
    amount: '$6000',
    deadline: '2026-08-25',
    category: 'need-based'
  },
  {
    id: 5,
    featured: true,
    title: 'Women in STEM Scholarship',
    description: 'Encourages women pursuing science, technology, engineering, and mathematics.',
    amount: '$7000',
    deadline: '2026-10-01',
    category: 'academic'
  },
  {
    id: 6,
    featured: false,
    title: 'Athletic Excellence Scholarship',
    description: 'For students balancing athletic achievement with educational progress.',
    amount: '$4000',
    deadline: '2026-09-20',
    category: 'athletic'
  }
];

export async function GET() {
  return NextResponse.json({ ok: true, scholarships }, { status: 200 });
}
