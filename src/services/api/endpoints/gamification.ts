const prefix = "/gamification"

export const streakTypeAPI = {
    createStreakType: `${prefix}/streak-type/create/`,
    updateStreakType: (streakTypeId: number) => `${prefix}/streak-type/${streakTypeId}/update/`,
    fetchStreakTypeById: (streakTypeId: number) => `${prefix}/streak-type/get/${streakTypeId}/`,
    fetchAllStreakType: `${prefix}/streak-type/all/`,
    removeStreakType: (streakTypeId: number) => `${prefix}/streak-type/delete/${streakTypeId}/`
}