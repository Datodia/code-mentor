import { User, UserState } from '@/types'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useUserStore = create<UserState>()(
    combine(
        {
            user: null as User | null,
        },
        (set) => ({
            setUser: (user: User) => set({ user }),
            removeUser: () => set({ user: null }),
        })
    ),
);

export default useUserStore