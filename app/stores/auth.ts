export interface AuthUser {
  name: string
  email: string
}

const STORAGE_KEY = 'laurette-auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AuthUser | null,
    hydrated: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    displayName: (state) => state.user?.name ?? '',
  },

  actions: {
    hydrate() {
      if (!import.meta.client || this.hydrated) return

      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          this.user = JSON.parse(raw) as AuthUser
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }

      this.hydrated = true
    },

    login(user: AuthUser, remember = true) {
      this.user = user
      if (import.meta.client && remember) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      }
    },

    logout() {
      this.user = null
      if (import.meta.client) {
        localStorage.removeItem(STORAGE_KEY)
      }
    },
  },
})
