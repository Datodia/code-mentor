
export type Feedback = {
    _id: string,
    feedback: string,
    author: User,
    rating: number,
    createdAt: string,
    updatedAt: string
}

export type BlogResponse = {
    blogs: Blog[],
    page: number,
    take: number,
    totalBlogs: number
}

export type Blog = {
    _id: string;
    title: string;
    image: string;
    readTime: number;
    description: string;
    views: number;
    createdAt: Date,
    updatedAt: Date
}

export type UserResponse = {
    users: User[],
    page: number,
    take: number,
    total: number
}

export type User = {
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    isActiveStudent: boolean,
    role: string,
    hasFeedbackPermition: boolean,
    avatar?: string,
    phoneNumber: string,
    createdAt: string,
    updatedAt: string 
    feedback: string,
    isEmailNotificationEnable: boolean
}

export type UserState = {
    user: User | null,
    setUser: (user: User) => void,
    removeUser: () => void
}

export type Course = {
    _id: string,
    title: string,
    description: string,
    image: string,
    level: string,
    price: number,
    rating: number,
    totalEnrollments: number,
    totalLessons: number,
    totalDuration: number,
    totalReviews: number,
    totalStudents: number,
    isActive: boolean,
    sylabus: Sylabus[],
    createdAt: string,
    updatedAt: string
}

export type Sylabus = {
    title: string,
    description: string
}

export type Challenge = {
    _id: string,
    title: string,
    description: string,
    figma: string,
    level: 1 | 2 | 3 | 4 | 5,
    image: string,
    source: string,
    type: 'frontend' | 'backend' | 'fullstack',
    price: number,
    createdAt: string,
    updatedAt: string
}

export type ChallengeResponse = {
    challenges: Challenge[],
    page: number,
    take: number,
    totalChallenges: number
}

export type TransactionChartData = {
  totalIncome: number
  approved: number
  blocked: number
  chartData: ChartData[]
}

export type ChartData = {
    count: number,
    date: string
}