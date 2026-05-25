<template>
  <!-- Main container with the updated background color, font, and LTR direction -->
  <div class="bg-[#F5F1ED] font-body-md text-on-surface antialiased overflow-x-hidden" dir="ltr">
    <main class="min-h-screen flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
      <!-- Background blur circles from the reference code -->
      <div class="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-[100px]"></div>

      <!-- Main card container with the reference layout and styling -->
      <div class="w-full max-w-[1100px] flex flex-col md:flex-row bg-surface-container-lowest rounded-[32px] overflow-hidden custom-shadow border border-outline-variant/20 relative z-10">
        
        <!-- Left Side: Login Form (English Text and LTR Alignment) -->
        <div class="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
          <div class="mb-12">
            <!-- Logo -->
            <img alt="Laurette Logo" class="h-18 mb-8 object-contain" src="@/assets/images/logo.png" />
            
            <!-- Heading with gradient text effect -->
            <h1 class="font-bold text-4xl text-on-surface mb-2 bg-gradient-to-r from-[#C28E78] to-[#A67563] bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p class="font-body-md text-on-surface-variant bg-gradient-to-r from-[#C28E78] to-[#A67563] bg-clip-text text-transparent">
              Please enter your details to access your account.
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email Input Field -->
            <div class="space-y-2">
              <label class="font-label-sm text-label-sm text-secondary block" for="email">EMAIL ADDRESS</label>
              <div class="relative">
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  required
                  placeholder="claire@maison.com"
                  class="w-full px-6 py-4 rounded-full border border-outline-variant/30 bg-surface-container-low focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 outline-none placeholder:text-on-surface-variant/40 font-body-md text-left"
                />
                <span class="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-outline-variant select-none pointer-events-none">mail</span>
              </div>
            </div>

            <!-- Password Input Field -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="font-label-sm text-label-sm text-secondary block" for="password">PASSWORD</label>
                <!-- <NuxtLink to="/forgot-password" class="font-label-sm text-label-sm text-primary hover:opacity-70 transition-opacity">FORGOT?</NuxtLink> -->
              </div>
              <div class="relative">
                <!-- Dynamic input type based on showPassword state -->
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  required
                  placeholder="••••••••"
                  class="w-full pl-6 pr-14 py-4 rounded-full border border-outline-variant/30 bg-surface-container-low focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 outline-none placeholder:text-on-surface-variant/40 font-body-md text-left"
                />
                <!-- Interactive Eye Icon Button -->
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors focus:outline-none select-none"
                >
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </button>
              </div>
            </div>

            <!-- Remember Me Checkbox -->
            <!-- <div class="flex items-center justify-start gap-2 pt-1">
              <input
                v-model="remember"
                type="checkbox"
                id="remember"
                class="accent-primary rounded text-primary focus:ring-primary w-4 h-4 border-outline cursor-pointer"
              />
              <label class="text-xs text-on-surface-variant cursor-pointer select-none" for="remember">Remember me</label>
            </div> -->

            <!-- Error Message Display -->
            <p v-if="errorMessage" class="text-xs text-red-500 text-center">{{ errorMessage }}</p>

            <!-- Submit Button with gradient background and reference styling -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="block w-full text-center py-5 rounded-full button-gradient text-white font-label-sm text-label-sm shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style="transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);"
            >
              {{ isSubmitting ? 'SIGNING IN...' : 'SIGN IN' }}
            </button>
          </form>

          <!-- Create Account Link -->
          <div class="mt-12 pt-6 text-center border-t border-outline-variant/20">
            <p class="font-body-md text-on-surface-variant">
              Don't have an account?
              <NuxtLink to="/register" class="text-primary font-semibold hover:underline decoration-primary/30 underline-offset-4 bg-gradient-to-r from-[#C28E78] to-[#A67563] bg-clip-text text-transparent">
                Create account
              </NuxtLink>
            </p>
          </div>
        </div>

        <!-- Right Side: Marketing Image (English Text and LTR Alignment) -->
        <div class="hidden md:block md:w-1/2 relative min-h-[600px]">
          <!-- Campaign Image -->
          <img alt="Laurette Campaign" class="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtbSDNIM_J1_x5VP9BB4B-siHo0MR08yH-LJPkcWY8okbaNx0WkQnU3u1HzseEX2PY70U6mgZW1Zixnge8-mNGV1zB656vg6qoKoyKm7RCAHeN2zYSiwiTXHrkxsvdBO4_cfrHaOrx_vdth9EbvBlp8-wnizBwX95pjyOULdMAZm52x3foD3Uhte69wnEMpWIhrQn8J1V3mct9z7c_BSIPTApcpH_OKqAl1nuNqLt90NumkNHgshtlwg2z2mI8BHhyyq5jXOWaVGI" />
          
          <!-- Multiply overlay from the reference code -->
          <div class="absolute inset-0 bg-primary/20 backdrop-multiply"></div>
          
          <!-- Marketing Text in English -->
          <div class="absolute bottom-12 left-12 right-12 text-white text-left z-20">
            <h2 class="font-h2 text-h2 mb-4 leading-tight italic">Discover the secrets of clean Korean skincare.</h2>
            <p class="font-body-lg text-body-lg opacity-90 max-w-sm">
              We bring you the finest, safe lab innovations directly from Seoul, ensuring your skin receives the luxurious care it deserves.
            </p>
          </div>
        </div>
        
      </div>
    </main>

    <!-- Footer with English text -->
    <footer class="w-full py-8 px-8 bg-transparent text-center relative z-10">
      <p class="font-label-sm text-label-sm text-outline-variant uppercase">© 2026 Laurette Maison de Beauté. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script setup>
// Keep the logic from your original code
const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const remember = ref(true)
const errorMessage = ref('')
const isSubmitting = ref(false)

// State to toggle password visibility
const showPassword = ref(false)

const REGISTERED_USERS_KEY = 'laurette-users'

function getRegisteredUsers() {
  if (!import.meta.client) return {}
  try {
    return JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '{}')
  } catch {
    return {}
  }
}

function nameFromEmail(value) {
  const local = value.split('@')[0] || 'Guest'
  return local.charAt(0).toUpperCase() + local.slice(1)
}

const handleLogin = async () => {
  errorMessage.value = ''
  isSubmitting.value = true

  const normalizedEmail = email.value.trim().toLowerCase()
  const users = getRegisteredUsers()
  const registered = users[normalizedEmail]

  if (registered && registered.password !== password.value) {
    errorMessage.value = 'Incorrect password.'
    isSubmitting.value = false
    return
  }

  const displayName = registered?.name ?? nameFromEmail(normalizedEmail)

  auth.login({ name: displayName, email: normalizedEmail }, remember.value)
  await router.push('/')
  isSubmitting.value = false
}

// Update page title to English
useHead({
  title: 'Sign In | Laurette Maison de Beauté',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0' }
  ]
})

definePageMeta({
  layout: false, // Disables the default layout
})
</script>

<style scoped>
/* Custom styles from the reference code */
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