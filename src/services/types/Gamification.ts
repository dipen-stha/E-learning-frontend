import { UserItem } from "./user"

export interface StreakTypeDetail{
    id: number
    title: string
    description: string
    is_active: boolean
}

export interface StreakTypePayload {
    title: string
    description: string
    is_active: boolean
}

export interface UserStreakDetail {
    id: number
    streak_by: UserItem
    streak_type: StreakTypeDetail
    current_streak: number
    longest_streak: number
    last_action: Date
}


export interface StreakTypeState {
    isListLoading: boolean
    isItemLoading: boolean
    isCreateUpdateLoading: boolean
    streakTypeItem: StreakTypeDetail | null
    streakTypeList: StreakTypeDetail[]
    streakTypePayload: StreakTypePayload

    setPayload: (data: StreakTypePayload) => void;

    createStreakType: () => Promise<void>;
    updateStreakType: (streakTypeId: number) => Promise<void>;
    fetchStreakTypeList: () => Promise<void>;
    fetchStreakTypeById: (streakTypeId: number) => Promise<void>;
    removeStreakType: (streakTypeId: number) => Promise<void>;
}