<template>
    <main class="min-h-screen bg-gray-50/60 font-sans pt-40 pb-20 flex items-center justify-center" dir="rtl">
      <div class="container mx-auto px-4 max-w-5xl flex rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100">
        
        <div class="hidden lg:block lg:w-1/2 bg-[#1F0D1C] relative p-12 overflow-hidden flex-col justify-between text-white">
          <div class="absolute inset-0 bg-gradient-to-t from-pink-950/60 via-[#1F0D1C]/40 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600" 
            alt="Natural Skincare textures" 
            class="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-45 transform scale-105"
          />
          
          <div class="relative z-20 flex flex-col h-full justify-between text-right">
            <div class="font-serif text-2xl tracking-widest font-bold text-pink-400">LAURETTE</div>
            
            <div class="space-y-4">
              <h2 class="text-3xl font-serif leading-snug">ابدئي طقوس العناية والجمال الخاصة بكِ اليوم</h2>
              <p class="text-gray-300 text-sm leading-relaxed font-light">
                انضمامكِ إلينا يمنحكِ وصولاً حصرياً لأحدث المنتجات غير السامة والمصممة خصيصاً لتناسب حيوية وتألق بشرتكِ.
              </p>
            </div>
            
            <div class="text-xs text-gray-400">© 2026 متجر لوريت. جميع الحقوق محفوظة.</div>
          </div>
        </div>
  
        <div class="w-full lg:w-1/2 p-8 md:p-14 flex flex-col justify-center">
          <div class="space-y-2 mb-8 text-right">
            <span class="text-xs font-bold tracking-widest uppercase text-pink-600 block">انضمي لعائلتنا</span>
            <h1 class="text-3xl font-serif text-[#1F0D1C] font-bold">إنشاء حساب جديد</h1>
            <p class="text-gray-400 text-xs md:text-sm">سجلي بياناتكِ لتجربة تسوق مخصصة وسلسة.</p>
          </div>
  
          <form @submit.prevent="handleRegister" class="space-y-4 text-right">
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-600 uppercase tracking-wide">الاسم الكامل</label>
              <div class="relative">
                <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                  <Icon name="heroicons:user" class="w-5 h-5" />
                </span>
                <input 
                  type="text" 
                  required
                  placeholder="أدخلِ اسمكِ الكامل"
                  class="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl pl-4 pr-11 py-3.5 outline-none focus:border-pink-500 focus:bg-white transition-all text-right"
                />
              </div>
            </div>
  
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-600 uppercase tracking-wide">البريد الإلكتروني</label>
              <div class="relative">
                <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                  <Icon name="heroicons:envelope" class="w-5 h-5" />
                </span>
                <input 
                  type="email" 
                  required
                  placeholder="yourname@example.com"
                  class="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl pl-4 pr-11 py-3.5 outline-none focus:border-pink-500 focus:bg-white transition-all text-left"
                />
              </div>
            </div>
  
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-gray-600 uppercase tracking-wide">كلمة المرور</label>
              <div class="relative">
                <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                  <Icon name="heroicons:lock-closed" class="w-5 h-5" />
                </span>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  class="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl pl-4 pr-11 py-3.5 outline-none focus:border-pink-500 focus:bg-white transition-all text-left"
                />
              </div>
            </div>
  
            <div class="flex items-start justify-end gap-2 pt-2">
              <label class="text-xs text-gray-500 cursor-pointer select-none text-right leading-relaxed" for="terms">
                أوافق على <span class="text-pink-600 hover:underline">الشروط والأحكام</span> وسياسة الخصوصية الخاصة بالمتجر.
              </label>
              <input 
                type="checkbox" 
                id="terms"
                required
                class="rounded text-pink-600 focus:ring-pink-500 w-4 h-4 border-gray-300 cursor-pointer mt-0.5"
              />
            </div>
  
            <button 
              type="submit"
              class="w-full bg-[#1F0D1C] hover:bg-pink-600 text-white text-xs md:text-sm font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg hover:shadow-pink-500/10 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              تأكيد إنشاء الحساب
            </button>
          </form>
  
          <div class="mt-6 text-center border-t border-gray-100 pt-6">
            <p class="text-xs md:text-sm text-gray-500">
              لديكِ حساب بالفعل؟
              <NuxtLink to="/login" class="text-pink-600 font-bold hover:underline mr-1">سجلي الدخول من هنا</NuxtLink>
            </p>
          </div>
        </div>
  
      </div>
    </main>
  </template>
  
  <script setup>
  const handleRegister = () => {
    alert('تهانينا! تم إنشاء حسابكِ بنجاح في متجر لوريت وجاري تحضير روتينك الخاص.');
  };
  
  useHead({
    title: 'إنشاء حساب جديد | متجر لوريت الفاخر'
  });
  definePageMeta({
    layout: 'blank',
  });
  </script>