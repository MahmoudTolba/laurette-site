import { defineStore } from 'pinia'

export interface AuthUser {
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // الـ state الأساسي مش محتاج تخزين يدوي خلاص
    customUser: null as AuthUser | null,
  }),

  getters: {
    // 1. التحقق من تسجيل الدخول عن طريق سوبابيز أو الـ state المخصص
    isLoggedIn(): boolean {
      const supabaseUser = useSupabaseUser()
      return !!supabaseUser.value
    },

    // 2. جلب الاسم نظيف وسريع من الـ Metadata المخرنة في سوبابيز
    displayName(): string {
      const supabaseUser = useSupabaseUser()
      
      // لو لسه مغيرين الـ state في نفس اللحظة (حالة الـ login/register)
      if (this.customUser?.name) return this.customUser.name
      
      // قراءة الاسم من الـ user_metadata اللي سجلناها في سوبابيز
      return supabaseUser.value?.user_metadata?.full_name ?? supabaseUser.value?.email?.split('@')[0] ?? ''
    },

    // 3. جلب الإيميل
    displayEmail(): string {
      const supabaseUser = useSupabaseUser()
      return supabaseUser.value?.email ?? this.customUser?.email ?? ''
    }
  },

  actions: {
    // دالة الـ login هتحتاج بس تثبت الاسم لحظياً بعد التسجيل/الدخول
    login(user: AuthUser) {
      this.customUser = user
    },

    // دالة تسجيل الخروج هتنظف الـ state وتعمل signOut من سوبابيز
    async logout() {
      const supabase = useSupabaseClient()
      this.customUser = null
      
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        
        // توجيه المستخدم لصفحة تسجيل الدخول بعد الخروج
        const router = useRouter()
        await router.push('/login')
      } catch (error: any) {
        console.error('Error during logout:', error.message)
      }
    },
  },
})