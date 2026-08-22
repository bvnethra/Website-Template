export type Category = 
  | 'All'
  | 'Programming'
  | 'AI & ML'
  | 'Data Science'
  | 'Web Development'
  | 'Frontend Engineering'
  | 'Digital Marketing'
  | 'Marketing'
  | 'Design'
  | 'Cloud & DevOps'
  | 'Business';

export type Difficulty = 'All Levels' | 'Beginner' | 'Intermediate' | 'Advanced';

export interface Instructor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  studentsCount: number;
  bio: string;
  coursesCount: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'code' | 'quiz' | 'reading';
  completed: boolean;
  codeSnippet?: string;
  language?: string;
  expectedOutput?: string;
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  summary?: string;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  difficulty: Difficulty;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  lessonsCount: number;
  image: string;
  badge?: 'Bestseller' | 'Hot' | 'New' | 'Featured' | 'Popular' | 'Trending';
  instructor: Instructor;
  price: number;
  originalPrice: number;
  progress?: number; // 0 to 100
  tags: string[];
  chapters: Chapter[];
  outcomes: string[];
  prerequisites: string[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  xp: number;
}

export interface DayActivity {
  day: string;
  shortDay: string;
  hours: number;
  lessonsCompleted: number;
  xpEarned: number;
}

export interface UserProgress {
  name: string;
  avatar: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  streakDays: number;
  totalHours: number;
  completedLessonsCount: number;
  enrolledCoursesCount: number;
  certificatesEarned: number;
  weeklyActivity: DayActivity[];
  badges: AchievementBadge[];
  notes: {
    id: string;
    courseId: string;
    lessonTitle: string;
    timestamp: string;
    content: string;
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  courseCompleted: string;
  rating: number;
  quote: string;
  salaryIncrease?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  role: string;
  description: string;
  coursesCount: number;
  estimatedMonths: number;
  avgSalary: string;
  color: string;
  skills: string[];
  steps: {
    title: string;
    description: string;
    duration: string;
  }[];
}
