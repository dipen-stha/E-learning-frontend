const prefix = "/gamification"

export const streakTypeAPI = {
    createStreakType: `${prefix}/streak-type/create/`,
    updateStreakType: (streakTypeId: number) => `${prefix}/streak-type/${streakTypeId}/update/`,
    fetchStreakTypeById: (streakTypeId: number) => `${prefix}/streak-type/get/${streakTypeId}/`,
    fetchAllStreakType: `${prefix}/streak-type/all/`,
    removeStreakType: (streakTypeId: number) => `${prefix}/streak-type/delete/${streakTypeId}/`
}

export const userGamificationAPI = {
    createUpdateUserStreak: `${prefix}/user-streak/create-update/`
}

export const userAchievements = {
    allUserAchievements: `${prefix}/all-user-achievements/`
}

export const achievementsAPI = {
    createAchievement: `${prefix}/achievements/create/`,
    fetchAchievementList: `${prefix}/achievements/all/`,
    updateAchievement: (id: number) => `${prefix}/achievements/${id}/update/`,
    fetchAchievementById: (id: number) => `${prefix}/achievements/get/${id}/`,
}