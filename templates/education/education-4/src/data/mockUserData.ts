import { UserProgress } from '../types';

export const INITIAL_USER_PROGRESS: UserProgress = {
  name: 'Alex Rivera',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  level: 8,
  currentXP: 4850,
  nextLevelXP: 6000,
  streakDays: 14,
  totalHours: 38.5,
  completedLessonsCount: 32,
  enrolledCoursesCount: 4,
  certificatesEarned: 2,
  weeklyActivity: [
    { day: 'Monday', shortDay: 'Mon', hours: 2.4, lessonsCompleted: 3, xpEarned: 350 },
    { day: 'Tuesday', shortDay: 'Tue', hours: 3.1, lessonsCompleted: 4, xpEarned: 480 },
    { day: 'Wednesday', shortDay: 'Wed', hours: 1.8, lessonsCompleted: 2, xpEarned: 260 },
    { day: 'Thursday', shortDay: 'Thu', hours: 4.2, lessonsCompleted: 6, xpEarned: 620 },
    { day: 'Friday', shortDay: 'Fri', hours: 2.9, lessonsCompleted: 4, xpEarned: 410 },
    { day: 'Saturday', shortDay: 'Sat', hours: 5.0, lessonsCompleted: 7, xpEarned: 780 },
    { day: 'Sunday', shortDay: 'Sun', hours: 3.5, lessonsCompleted: 5, xpEarned: 550 },
  ],
  badges: [
    {
      id: 'b-streak-14',
      title: '14-Day Sprint Master',
      description: 'Maintained an unbroken daily learning habit for 2 consecutive weeks.',
      icon: 'Flame',
      unlocked: true,
      unlockedAt: 'Yesterday',
      rarity: 'Epic',
      xp: 500,
    },
    {
      id: 'b-code-ninja',
      title: 'Sandbox Code Ninja',
      description: 'Successfully executed and validated 25+ live coding exercises with zero errors.',
      icon: 'Code2',
      unlocked: true,
      unlockedAt: '3 days ago',
      rarity: 'Rare',
      xp: 350,
    },
    {
      id: 'b-quiz-champ',
      title: 'Flawless Knowledge Ace',
      description: 'Scored 100% on 10 technical chapter assessment quizzes on first attempt.',
      icon: 'Award',
      unlocked: true,
      unlockedAt: '5 days ago',
      rarity: 'Rare',
      xp: 300,
    },
    {
      id: 'b-ai-architect',
      title: 'Neural Pioneer',
      description: 'Completed the flagship Generative AI transformer attention milestone.',
      icon: 'Cpu',
      unlocked: true,
      unlockedAt: '1 week ago',
      rarity: 'Legendary',
      xp: 1000,
    },
    {
      id: 'b-speed-demon',
      title: 'Hyperfocus Marathon',
      description: 'Logged 4+ continuous hours of uninterrupted study in a single day.',
      icon: 'Zap',
      unlocked: false,
      rarity: 'Epic',
      xp: 600,
    },
    {
      id: 'b-community-mentor',
      title: 'Helpful Peer',
      description: 'Answered 5 student questions in the course discussion threads.',
      icon: 'Users',
      unlocked: false,
      rarity: 'Common',
      xp: 200,
    }
  ],
  notes: [
    {
      id: 'note-1',
      courseId: 'course-ai-mastery',
      lessonTitle: 'Deconstructing Self-Attention Mechanisms',
      timestamp: '14:45 in Lesson 2',
      content: 'Key takeaway: Scaling factor sqrt(d_k) keeps the variance of Q·K^T at 1.0, which prevents softmax saturation.'
    },
    {
      id: 'note-2',
      courseId: 'course-react-fullstack',
      lessonTitle: 'Modern Concurrent Rendering & Transitions',
      timestamp: '08:12 in Lesson 1',
      content: 'Use startTransition for non-urgent search filtering to keep typing feedback instantaneous!'
    }
  ]
};
