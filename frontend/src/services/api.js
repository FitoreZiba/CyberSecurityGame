const BASE_URL = 'http://localhost:8080'

const getHeaders = (token) => ({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
})

async function request(path, options = {}, token = null) {
    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: getHeaders(token),
        credentials: 'include',
    })
    if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `HTTP ${res.status}`)
    }
    const text = await res.text()
    return text ? JSON.parse(text) : null
}

// ── Auth ──────────────────────────────────────────────
export const authApi = {
    register: (data) =>
        request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    login: (data) =>
        request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
}

// ── Game ──────────────────────────────────────────────
export const gameApi = {
    getQuestions: (categoryId, token) =>
        request(`/game/${categoryId}/questions`, {}, token),
    submitAnswer: (data, token) =>
        request('/game/answer', { method: 'POST', body: JSON.stringify(data) }, token),
}

// ── Missions ──────────────────────────────────────────
export const missionApi = {
    startMission: (missionId, userId, token) =>
        request(`/missions/${missionId}/${userId}/start`, {}, token),
    submitStep: (data, token) =>
        request('/missions/step/answer', {
            method: 'POST',
            body: JSON.stringify(data)
        }, token),
}

// ── Progress ──────────────────────────────────────────
export const progressApi = {
    getProgress: (userId, token) =>
        request(`/progress/${userId}`, {}, token),
}

// ── Leaderboard ───────────────────────────────────────
export const leaderboardApi = {
    getTop: (token) =>
        request('/leaderboard/leaderboard', {}, token),
}

export const userApi = {
    getMe: (userId, token) =>
        request(`/progress/${userId}`, {}, token),
}