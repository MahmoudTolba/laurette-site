<template>
  <main class="min-h-screen bg-background font-sans pt-40 pb-20 flex items-center justify-center" dir=" ltr">
    <!-- تطبيق الحواف المخصصة rounded-luxury والظل الفخم shadow-luxury ولون السطح bg-surface -->
    <div class="container mx-auto px-4 max-w-5xl flex rounded-luxury overflow-hidden bg-surface shadow-luxury border border-outline/30">
      
      <!-- القسم الجانبي (الصورة المعروضة في الشاشات الكبيرة) -->
      <div class="hidden lg:block lg:w-1/2 bg-dark relative p-12 overflow-hidden flex-col justify-between text-white">
        <!-- تدرج لوني ناعم يبدأ من درجات البني الداكن الفاخر -->
        <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600" 
          alt="Natural Skincare textures" 
          class="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-35 transform scale-105"
        />
        
        <div class="relative z-20 flex flex-col h-full justify-between text-right">
          <div class="font-serif text-2xl tracking-widest font-bold text-primary">LAURETTE</div>
          
          <div class="space-y-4">
            <h2 class="text-3xl font-serif leading-snug">ابدئي طقوس العناية والجمال الخاصة بكِ اليوم</h2>
            <p class="text-surface/80 text-sm leading-relaxed font-light">
              انضمامكِ إلينا يمنحكِ وصولاً حصرياً لأحدث المنتجات غير السامة والمصممة خصيصاً لتناسب حيوية وتألق بشرتكِ.
            </p>
          </div>
          
          <div class="text-xs text-outline/70">© 2026 متجر لوريت. جميع الحقوق محفوظة.</div>
        </div>
      </div>

      <!-- نموذج إنشاء الحساب -->
      <div class="w-full lg:w-1/2 p-8 md:p-14 flex flex-col justify-center">
        <div class="space-y-2 mb-8 text-right">
          <span class="text-xs font-bold tracking-widest uppercase text-primary block">انضمي لعائلتنا</span>
          <h1 class="text-3xl font-serif text-text font-bold">إنشاء حساب جديد</h1>
          <p class="text-muted text-xs md:text-sm">سجلي بياناتكِ لتجربة تسوق مخصصة وسلسة.</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4 text-right">
          <!-- حقل الاسم الكامل -->
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-muted uppercase tracking-wide">الاسم الكامل</label>
            <div class="relative">
              <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-outline">
                <Icon name="heroicons:user" class="w-5 h-5" />
              </span>
              <input
                v-model="fullName"
                type="text"
                required
                placeholder="أدخلِ اسمكِ الكامل"
                class="w-full bg-background border border-outline text-text text-sm rounded-xl pl-4 pr-11 py-3.5 outline-none focus:border-primary focus:bg-surface transition-all text-right"
              />
            </div>
          </div>

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
            <label class="text-xs font-bold text-muted uppercase tracking-wide">كلمة المرور</label>
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

          <!-- الشروط والأحكام -->
          <div class="flex items-start justify-end gap-2 pt-2">
            <label class="text-xs text-muted cursor-pointer select-none text-right leading-relaxed" for="terms">
              أوافق على <span class="text-primary hover:text-secondary hover:underline transition-colors">الشروط والأحكام</span> وسياسة الخصوصية الخاصة بالمتجر.
            </label>
            <input 
              type="checkbox" 
              id="terms"
              required
              class="accent-primary rounded text-primary focus:ring-primary w-4 h-4 border-outline cursor-pointer mt-0.5"
            />
          </div>

          <!-- زر التاكيد بالخلفية المتدرجة الفاخرة المحددة في التكوين -->
          <button 
            type="submit"
            class="w-full bg-primary-gradient text-white text-xs md:text-sm font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-secondary/30 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            تأكيد إنشاء الحساب
          </button>
        </form>

        <!-- العودة لصفحة تسجيل الدخول -->
        <div class="mt-6 text-center border-t border-outline/30 pt-6">
          <p class="text-xs md:text-sm text-muted">
            لديكِ حساب بالفعل؟
            <NuxtLink to="/login" class="text-primary font-bold hover:text-secondary hover:underline transition-colors mr-1">سجلي الدخول من هنا</NuxtLink>
          </p>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
const auth = useAuthStore()
const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')

const REGISTERED_USERS_KEY = 'laurette-users'

const handleRegister = async () => {
  const normalizedEmail = email.value.trim().toLowerCase()
  const users = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || '{}')

  users[normalizedEmail] = {
    name: fullName.value.trim(),
    password: password.value,
  }

  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users))
  auth.login({ name: fullName.value.trim(), email: normalizedEmail })
  await router.push('/')
};

useHead({
  title: 'إنشاء حساب جديد | متجر لوريت الفاخر'
});
definePageMeta({
  layout: 'blank',
});
</script>