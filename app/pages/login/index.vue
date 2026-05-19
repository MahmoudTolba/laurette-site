<template>
  <main class="min-h-screen bg-gray-50/60 font-sans pt-40 pb-20 flex items-center justify-center" dir="rtl">
    <div class="container mx-auto px-4 max-w-5xl flex rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100">
      <div class="w-full lg:w-1/2 p-8 md:p-14 flex flex-col justify-center">
        <div class="space-y-2 mb-8 text-right">
          <span class="text-xs font-bold tracking-widest uppercase text-pink-600 block">مرحباً بكِ مجدداً</span>
          <h1 class="text-3xl font-serif text-[#1F0D1C] font-bold">تسجيل الدخول</h1>
          <p class="text-gray-400 text-xs md:text-sm">اسعدنا عودتكِ، سجلي الدخول لمتابعة رحلة جمالكِ الفاخرة.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5 text-right">
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-gray-600 uppercase tracking-wide">البريد الإلكتروني</label>
            <div class="relative">
              <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                <Icon name="heroicons:envelope" class="w-5 h-5" />
              </span>
              <input
                v-model="email"
                type="email"
                required
                placeholder="yourname@example.com"
                class="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl pl-4 pr-11 py-3.5 outline-none focus:border-pink-500 focus:bg-white transition-all text-left"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <div class="flex justify-between items-center">
              <NuxtLink to="/forgot-password" class="text-xs text-pink-600 hover:underline">نسيتي كلمة المرور؟</NuxtLink>
              <label class="text-xs font-bold text-gray-600 uppercase tracking-wide">كلمة المرور</label>
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                <Icon name="heroicons:lock-closed" class="w-5 h-5" />
              </span>
              <input
                v-model="password"
                type="password"
                required
                placeholder="••••••••"
                class="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl pl-4 pr-11 py-3.5 outline-none focus:border-pink-500 focus:bg-white transition-all text-left"
              />
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-1">
            <label class="text-xs text-gray-500 cursor-pointer select-none" for="remember">تذكرني دائماً</label>
            <input
              v-model="remember"
              type="checkbox"
              id="remember"
              class="rounded text-pink-600 focus:ring-pink-500 w-4 h-4 border-gray-300 cursor-pointer"
            />
          </div>

          <p v-if="errorMessage" class="text-xs text-red-500 text-center">{{ errorMessage }}</p>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-[#1F0D1C] hover:bg-pink-600 disabled:opacity-60 text-white text-xs md:text-sm font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg hover:shadow-pink-500/10 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            تسجيل الدخول
          </button>
        </form>

        <div class="mt-8 text-center border-t border-gray-100 pt-6">
          <p class="text-xs md:text-sm text-gray-500">
            ليس لديكِ حساب حتى الآن؟
            <NuxtLink to="/register" class="text-pink-600 font-bold hover:underline mr-1">أنشئي حسابكِ الآن</NuxtLink>
          </p>
        </div>
      </div>

      <div class="hidden lg:block lg:w-1/2 bg-[#1F0D1C] relative p-12 overflow-hidden flex-col justify-between text-white">
        <div class="absolute inset-0 bg-gradient-to-t from-pink-950/60 via-[#1F0D1C]/40 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600"
          alt="Laurette Clean Beauty"
          class="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-45 transform scale-105"
        />

        <div class="relative z-20 flex flex-col h-full justify-between text-right">
          <div class="font-serif text-2xl tracking-widest font-bold text-pink-400">LAURETTE</div>

          <div class="space-y-4">
            <h2 class="text-3xl font-serif leading-snug">اكتشفي أسرار مستحضرات التجميل الكورية النظيفة</h2>
            <p class="text-gray-300 text-sm leading-relaxed font-light">
              نحن نجمع لكِ أرقى الابتكارات المعملية الآمنة مباشرة من سيول لتنعم بشرتكِ بالعناية الفاخرة التي تستحقها.
            </p>
          </div>

          <div class="text-xs text-gray-400">© 2026 متجر لوريت. جميع الحقوق محفوظة.</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const remember = ref(true)
const errorMessage = ref('')
const isSubmitting = ref(false)

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
    errorMessage.value = 'كلمة المرور غير صحيحة'
    isSubmitting.value = false
    return
  }

  const displayName = registered?.name ?? nameFromEmail(normalizedEmail)

  auth.login({ name: displayName, email: normalizedEmail }, remember.value)
  await router.push('/')
  isSubmitting.value = false
}

useHead({
  title: 'تسجيل الدخول | متجر لوريت الفاخر',
})

definePageMeta({
  layout: 'blank',
})
</script>
