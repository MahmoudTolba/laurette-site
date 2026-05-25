<template>
  <div class="bg-[#F5F1ED] font-body-md text-on-surface antialiased overflow-x-hidden">
    <main class="min-h-screen flex items-center justify-center p-4 md:p-12 relative overflow-hidden">
      
      <div class="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-[100px]"></div>

      <div class="w-full max-w-[1100px] flex flex-col md:flex-row bg-white rounded-[32px] overflow-hidden custom-shadow border border-outline-variant/20 z-10">
        
        <div class="hidden md:block md:w-1/2 relative min-h-[700px]">
          <img 
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600" 
            alt="Natural Skincare textures" 
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-primary/20 backdrop-multiply"></div>
          
          <div class="absolute top-12 left-12 right-12">
            <div class="font-serif text-2xl tracking-[0.2em] font-bold text-white uppercase">LAURETTE</div>
          </div>

          <div class="absolute bottom-12 left-12 right-12 text-white">
            <h2 class="font-h2 text-4xl mb-4 leading-tight italic">Start your beauty rituals today.</h2>
            <p class="font-body-lg opacity-90 max-w-sm italic">
              Joining us grants you exclusive access to clean, non-toxic products designed specifically to unleash your skin's natural radiance.
            </p>
          </div>
        </div>

        <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div class="mb-8 text-center md:text-left">
            <span class="font-label-sm text-[10px] text-secondary tracking-widest uppercase block mb-2">Join our family</span>
            <h1 class="font-bold text-4xl text-on-surface mb-2 bg-gradient-to-r from-[#C28E78] to-[#A67563] bg-clip-text text-transparent">
              Create Account
            </h1>
            <p class="font-body-md text-on-surface-variant text-sm">
              Register your details for a personalized and seamless shopping experience.
            </p>
          </div>

          <div v-if="errorMessage" class="mb-4 p-4 text-sm text-red-600 bg-red-50 rounded-2xl text-center">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="mb-4 p-4 text-sm text-green-600 bg-green-50 rounded-2xl text-center">
            {{ successMessage }}
          </div>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <div class="space-y-2">
              <label class="font-label-sm text-[10px] text-secondary block tracking-widest uppercase">Full Name</label>
              <div class="relative">
                <span class="absolute left-5 top-1/2 -translate-y-1/2 text-outline-variant">
                  <Icon name="heroicons:user" class="w-5 h-5 opacity-60" />
                </span>
                <input
                  v-model="fullName"
                  type="text"
                  required
                  :disabled="isLoading"
                  placeholder="Julianne Moore"
                  class="auth-input pl-12"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="font-label-sm text-[10px] text-secondary block tracking-widest uppercase">Email Address</label>
              <div class="relative">
                <span class="absolute left-5 top-1/2 -translate-y-1/2 text-outline-variant">
                  <Icon name="heroicons:envelope" class="w-5 h-5 opacity-60" />
                </span>
                <input
                  v-model="email"
                  type="email"
                  required
                  :disabled="isLoading"
                  placeholder="julianne@maison.com"
                  class="auth-input pl-12"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="font-label-sm text-[10px] text-secondary block tracking-widest uppercase">Password</label>
              <div class="relative">
                <span class="absolute left-5 top-1/2 -translate-y-1/2 text-outline-variant">
                  <Icon name="heroicons:lock-closed" class="w-5 h-5 opacity-60" />
                </span>
                <input
                  v-model="password"
                  :type="showPass ? 'text' : 'password'"
                  required
                  :disabled="isLoading"
                  placeholder="••••••••••••"
                  class="auth-input px-12"
                />
                <button 
                  type="button" 
                  @click="showPass = !showPass" 
                  class="absolute right-5 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors focus:outline-none"
                >
                  <Icon :name="showPass ? 'heroicons:eye-slash' : 'heroicons:eye'" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <div class="flex items-start gap-3 pt-2">
              <input 
                type="checkbox" 
                id="terms"
                required
                :disabled="isLoading"
                class="accent-primary rounded text-primary focus:ring-primary w-4 h-4 border-outline cursor-pointer mt-0.5"
              />
              <label class="text-xs text-on-surface-variant cursor-pointer select-none leading-relaxed" for="terms">
                I agree to the <span class="text-primary font-semibold hover:underline underline-offset-2 transition-colors">Terms & Conditions</span> and Privacy Policy of the Maison.
              </label>
            </div>

            <button 
              type="submit"
              :disabled="isLoading"
              class="block w-full text-center py-5 mt-4 rounded-full button-gradient text-white font-label-sm text-sm tracking-[0.15em] shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading">CREATING ACCOUNT...</span>
              <span v-else>CREATE MY ACCOUNT</span>
            </button>
          </form>

          <div class="mt-8 text-center">
            <p class="font-body-md text-on-surface-variant text-sm">
              Already have an account?
              <NuxtLink to="/login" class="text-primary font-bold hover:underline decoration-primary/30 underline-offset-4 ml-1">
                Sign In
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </main>

    <footer class="w-full py-6 px-8 bg-transparent text-center relative z-10">
      <p class="font-label-sm text-[10px] text-outline-variant uppercase tracking-[0.2em]">
        © 2026 Laurette Maison de Beauté. All Rights Reserved.
      </p>
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

const fullName = ref('')
const email = ref('')
const password = ref('')
const showPass = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleRegister = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''
    
    const normalizedEmail = email.value.trim().toLowerCase()

    // 🔐 إرسال بيانات التسجيل لـ Supabase Auth مع حفظ الاسم في الـ Metadata
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: password.value,
      options: {
        data: {
          full_name: fullName.value.trim()
        }
      }
    })

    if (error) throw error

    // إذا كانت سوبابيز مهيأة لتأكيد الحساب عبر الإيميل أولاً
    if (data?.user && data?.session === null) {
      successMessage.value = 'تم إنشاء الحساب بنجاح! يرجى مراجعة بريدك الإلكتروني لتأكيد الحساب.'
      fullName.value = ''
      email.value = ''
      password.value = ''
      return
    }

    // إذا تم تسجيل الدخول فوراً بدون تفعيل بريد إلكتروني إجباري
    if (data?.user) {
      // تحديث الـ Pinia Store ببيانات المستخدم الجديد
      auth.login({ 
        name: data.user.user_metadata.full_name, 
        email: data.user.email 
      })
      
      successMessage.value = 'تم إنشاء الحساب بنجاح، جاري تحويلك...'
      setTimeout(async () => {
        await router.push('/')
      }, 1500)
    }

  } catch (error) {
    console.error('Registration error:', error.message)
    errorMessage.value = error.message === 'User already registered' 
      ? 'هذا البريد الإلكتروني مسجل بالفعل!' 
      : `فشل إنشاء الحساب: ${error.message}`
  } finally {
    isLoading.value = false
  }
}

useHead({
  title: 'Create Account | Laurette Maison de Beauté'
})
</script>

<style scoped>
.auth-input {
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1.5rem;
  border-radius: 9999px; /* rounded-full */
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  font-size: 0.875rem; /* text-sm */
  
  border: 1px solid rgba(var(--color-outline-variant, 166, 117, 99), 0.2); 
  background-color: var(--color-surface-container-low, #FCFBFB);
  color: var(--color-on-surface, #1C1B1B);
}

.auth-input:focus {
  border-color: var(--color-primary, #C28E78);
  box-shadow: 0 0 0 1px var(--color-primary, #C28E78);
}

.auth-input::placeholder {
  color: rgba(var(--color-on-surface-variant, 28, 27, 27), 0.3);
}

.button-gradient {
  background: linear-gradient(90deg, #C28E78 0%, #A67563 100%);
}

.custom-shadow {
  box-shadow: 0 40px 100px -20px rgba(92, 64, 51, 0.15);
}
</style>