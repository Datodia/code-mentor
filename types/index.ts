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
}

export type UserState = {
    user: User | null,
    setUser: (user: User) => void,
    removeUser: () => void
}