<template>
  <main class="min-h-screen bg-background font-sans pt-40 pb-20 flex items-center justify-center" dir=" ltr">
    <!-- استخدام نصف القطر المخصص من الاستايل luxury والتأثير الظلي soft -->
    <div class="container mx-auto px-4 max-w-5xl flex rounded-luxury overflow-hidden bg-surface shadow-luxury border border-outline/30">
      
      <!-- نموذج تسجيل الدخول -->
      <div class="w-full lg:w-1/2 p-8 md:p-14 flex flex-col justify-center">
        <div class="space-y-2 mb-8 text-right">
          <span class="text-xs font-bold tracking-widest uppercase text-primary block">مرحباً بكِ مجدداً</span>
          <h1 class="text-3xl font-serif text-text font-bold">تسجيل الدخول</h1>
          <p class="text-muted text-xs md:text-sm">اسعدنا عودتكِ، سجلي الدخول لمتابعة رحلة جمالكِ الفاخرة.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5 text-right">
          <!-- حقل البريد الإلكتروني -->
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-muted uppercase tracking-wide">البريد الإلكتروني</label>
            <div class="relative">
              <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-outline">
                <Icon name="heroicons:envelope" class="w-5 h-5" />
              </span>
              <input
                v-model="email"
                type="email"
                required
                placeholder="yourname@example.com"
                class="w-full bg-background border border-outline text-text text-sm rounded-xl pl-4 pr-11 py-3.5 outline-none focus:border-primary focus:bg-surface transition-all text-left"
              />
            </div>
          </div>

          <!-- حقل كلمة المرور -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center">
              <NuxtLink to="/forgot-password" class="text-xs text-primary hover:text-secondary transition-colors hover:underline">نسيتي كلمة المرور؟</NuxtLink>
              <label class="text-xs font-bold text-muted uppercase tracking-wide">كلمة المرور</label>
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-outline">
                <Icon name="heroicons:lock-closed" class="w-5 h-5" />
              </span>
              <input
                v-model="password"
                type="password"
                required
                placeholder="••••••••"
                class="w-full bg-background border border-outline text-text text-sm rounded-xl pl-4 pr-11 py-3.5 outline-none focus:border-primary focus:bg-surface transition-all text-left"
              />
            </div>
          </div>

          <!-- تذكرني -->
          <div class="flex items-center justify-end gap-2 pt-1">
            <label class="text-xs text-muted cursor-pointer select-none" for="remember">تذكرني دائماً</label>
            <input
              v-model="remember"
              type="checkbox"
              id="remember"
              class="accent-primary rounded text-primary focus:ring-primary w-4 h-4 border-outline cursor-pointer"
            />
          </div>

          <!-- رسالة الخطأ -->
          <p v-if="errorMessage" class="text-xs text-red-500 text-center">{{ errorMessage }}</p>

          <!-- زر الارسال بالخلفية المتدرجة الفاخرة المحددة في ملف التكوين -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-primary-gradient disabled:opacity-60 text-white text-xs md:text-sm font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-secondary/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            تسجيل الدخول
          </button>
        </form>

        <!-- إنشاء حساب جديد -->
        <div class="mt-8 text-center border-t border-outline/30 pt-6">
          <p class="text-xs md:text-sm text-muted">
            ليس لديكِ حساب حتى الآن؟
            <NuxtLink to="/register" class="text-primary font-bold hover:text-secondary transition-colors hover:underline mr-1">أنشئي حسابكِ الآن</NuxtLink>
          </p>
        </div>
      </div>

      <!-- القسم الجانبي (الصورة المعروضة في الشاشات الكبيرة) -->
      <div class="hidden lg:block lg:w-1/2 bg-dark relative p-12 overflow-hidden flex-col justify-between text-white">
        <!-- تدرج لوني ناعم يبدأ من درجات البني الداكن المتناسق مع الهوية الفاخرة -->
        <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600"
          alt="Laurette Clean Beauty"
          class="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-35 transform scale-105"
        />

        <div class="relative z-20 flex flex-col h-full justify-between text-right">
          <div class="font-serif text-2xl tracking-widest font-bold text-primary">LAURETTE</div>

          <div class="space-y-4">
            <h2 class="text-3xl font-serif leading-snug">اكتشفي أسرار مستحضرات التجميل الكورية النظيفة</h2>
            <p class="text-surface/80 text-sm leading-relaxed font-light">
              نحن نجمع لكِ أرقى الابتكارات المعملية الآمنة مباشرة من سيول لتنعم بشرتكِ بالعناية الفاخرة التي تستحقها.
            </p>
          </div>

          <div class="text-xs text-outline/70">© 2026 متجر لوريت. جميع الحقوق محفوظة.</div>
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