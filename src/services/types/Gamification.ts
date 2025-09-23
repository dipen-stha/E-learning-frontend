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


export interface AchievementsDetail {
    id: number
    title: string
    icon: string
    description: string
    rule_type: string
    threshold: number
    is_expirable: boolean
    is_active: boolean
}

export interface AchievementsPayload {
    title: string
    icon: string
    description: string
    rule_type: string
    threshold: number | string
    is_expirable: boolean
    is_active: boolean
}


export interface AllUserAchivementes {
    streak: number
    achievements: []
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

export interface UserGamificationState {
    isItemLoading: boolean
    isListLoading: boolean
    isCreateUpdateLoading: boolean
    userAchievements: AllUserAchivementes | null

    userStreakCreateUpdate: () => Promise<void>;
    fetchAllUserAchievements: () => Promise<void>;
    checkAndCreateUserAchievements: () => Promise<void>;
}

export interface AchievementsState {
    isItemLoading: boolean
    isListLoading: boolean
    isCreateUpdateLoading: boolean
    achievementPayload: AchievementsPayload
    achievementList: AchievementsDetail[]
    achievementItem: AchievementsDetail | null

    setPayload: (data: AchievementsPayload) => void;

    fetchAchievementList: () => Promise<void>;
    fetchAchievementById: (achievementId: number) => Promise<void>;
    createAchievement: () => Promise<void>;
    updateAchievement: (achievementId: number) => Promise<void>;
}