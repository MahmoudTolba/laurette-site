<template>
  <div class="bg-[#F5F1ED] font-body-md text-on-surface antialiased overflow-x-hidden" dir="ltr">
    <main class="min-h-screen flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
      <div class="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-[100px]"></div>

      <div class="w-full max-w-[1100px] flex flex-col md:flex-row bg-surface-container-lowest rounded-[32px] overflow-hidden custom-shadow border border-outline-variant/20 relative z-10">
        
        <div class="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
          <div class="mb-12">
            <img alt="Laurette Logo" class="h-18 mb-8 object-contain" src="@/assets/images/logo.png" />
            
            <h1 class="font-bold text-4xl text-on-surface mb-2 bg-gradient-to-r from-[#C28E78] to-[#A67563] bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p class="font-body-md text-on-surface-variant bg-gradient-to-r from-[#C28E78] to-[#A67563] bg-clip-text text-transparent">
              Please enter your details to access your account.
            </p>
          </div>

          <div v-if="errorMessage" class="mb-6 p-4 text-sm text-red-600 bg-red-50 rounded-2xl text-center">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-2">
              <label class="font-label-sm text-label-sm text-secondary block" for="email">EMAIL ADDRESS</label>
              <div class="relative">
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  required
                  :disabled="isSubmitting"
                  placeholder="claire@maison.com"
                  class="w-full px-6 py-4 rounded-full border border-outline-variant/30 bg-surface-container-low focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 outline-none placeholder:text-on-surface-variant/40 font-body-md text-left"
                />
                <span class="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-outline-variant select-none pointer-events-none">mail</span>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="font-label-sm text-label-sm text-secondary block" for="password">PASSWORD</label>
              </div>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  required
                  :disabled="isSubmitting"
                  placeholder="••••••••"
                  class="w-full pl-6 pr-14 py-4 rounded-full border border-outline-variant/30 bg-surface-container-low focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 outline-none placeholder:text-on-surface-variant/40 font-body-md text-left"
                />
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors focus:outline-none select-none"
                >
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </button>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="block w-full text-center py-5 rounded-full button-gradient text-white font-label-sm text-label-sm shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style="transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);"
            >
              {{ isSubmitting ? 'SIGNING IN...' : 'SIGN IN' }}
            </button>
          </form>

          <div class="mt-12 pt-6 text-center border-t border-outline-variant/20">
            <p class="font-body-md text-on-surface-variant">
              Don't have an account?
              <NuxtLink to="/register" class="text-primary font-semibold hover:underline decoration-primary/30 underline-offset-4 bg-gradient-to-r from-[#C28E78] to-[#A67563] bg-clip-text text-transparent">
                Create account
              </NuxtLink>
            </p>
          </div>
        </div>

        <div class="hidden md:block md:w-1/2 relative min-h-[600px]">
          <img alt="Laurette Campaign" class="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600" />
          
          <div class="absolute inset-0 bg-primary/20 backdrop-multiply"></div>
          
          <div class="absolute bottom-12 left-12 right-12 text-white text-left z-20">
            <h2 class="font-h2 text-h2 mb-4 leading-tight italic">Discover the secrets of clean Korean skincare.</h2>
            <p class="font-body-lg text-body-lg opacity-90 max-w-sm">
              We bring you the finest, safe lab innovations directly from Seoul, ensuring your skin receives the luxurious care it deserves.
            </p>
          </div>
        </div>
        
      </div>
    </main>

    <footer class="w-full py-8 px-8 bg-transparent text-center relative z-10">
      <p class="font-label-sm text-label-sm text-outline-variant uppercase">© 2026 Laurette Maison de Beauté. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false,
})

// استدعاء عميل سوبابيز المدمج في نكست
const supabase = useSupabaseClient()
const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)
const showPassword = ref(false)

const handleLogin = async () => {
  try {
    errorMessage.value = ''
    isSubmitting.value = true

    const normalizedEmail = email.value.trim().toLowerCase()

    // 🔐 تسجيل الدخول باستخدام Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: password.value,
    })

    if (error) throw error

    if (data?.user) {
      // سحب الاسم من الـ metadata اللي حفظناها أثناء الـ Register
      const displayName = data.user.user_metadata?.full_name || 'Maison Guest'

      // تحديث الـ Pinia Auth Store بالداتا الصافية للـ User
      auth.login({ 
        name: displayName, 
        email: data.user.email 
      })

      // توجيه المستخدم لصفحة المتجر الرئيسية
      await router.push('/')
    }

  } catch (error) {
    console.error('Login error:', error.message)
    // تبسيط رسائل الخطأ عشان العميل يفهمها
    if (error.message === 'Invalid login credentials') {
      errorMessage.value = 'Invalid email or password. Please try again.'
    } else {
      errorMessage.value = error.message
    }
  } finally {
    isSubmitting.value = false
  }
}

// العناوين والخطوط المطلوبة
useHead({
  title: 'Sign In | Laurette Maison de Beauté',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0' }
  ]
})
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Button Gradient */
.button-gradient {
  background: linear-gradient(90deg, #C28E78 0%, #A67563 100%);
}

/* Custom Shadow */
.custom-shadow {
  box-shadow: 0 24px 48px -12px rgba(92, 64, 51, 0.08);
}
</style>