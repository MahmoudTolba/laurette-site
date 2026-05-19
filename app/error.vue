<template>
    <div class="min-h-screen bg-background font-sans flex flex-col justify-center items-center px-4 relative overflow-hidden" dir="ltr">
      
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
  
      <div class="max-w-md w-full text-center space-y-8 relative z-10">
        
        <div class="relative inline-block">
          <div class="w-32 h-32 bg-white rounded-full border border-outline/50 shadow-soft flex items-center justify-center mx-auto transform hover:rotate-12 transition-transform duration-500">
            <Icon name="uil:heart-break" class="w-16 h-16 text-primary/80 animate-pulse-slow" />
          </div>
          <span class="absolute -bottom-2 right-1/2 translate-x-1/2 bg-dark text-white font-serif text-xs px-3 py-1 rounded-full shadow-md tracking-wider">
            {{ error.statusCode || 404 }}
          </span>
        </div>
  
        <div class="space-y-3">
          <h1 class="text-3xl md:text-4xl font-serif text-text leading-tight">
            {{ is404 ? 'Beauty Lost in Transit' : 'Something Went Wrong' }}
          </h1>
          <p class="text-muted text-sm md:text-base leading-relaxed max-w-sm mx-auto">
            {{ is404 
              ? "The exquisite page you are looking for might have been misplaced or gently moved into our archive." 
              : "Our pristine servers encountered a temporary issue. Rest assured, our care team is polishing it up right now." 
            }}
          </p>
        </div>
  
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            @click="handleClearError" 
            class="w-full sm:w-auto bg-dark hover:bg-primary text-white font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
          >
            <Icon name="heroicons:home" class="w-4 h-4" />
            Back to Home
          </button>
          
          <NuxtLink 
            to="/products" 
            class="w-full sm:w-auto bg-white hover:bg-gray-50 text-text font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full border border-outline shadow-sm text-center transition-all duration-300 active:scale-95"
          >
            Explore Products
          </NuxtLink>
        </div>
  
        <div class="pt-8 border-t border-outline/30 text-xs text-muted/60">
          Need immediate support? Contact our beauty care at 
          <NuxtLink to="/ContactUs" class="text-primary hover:underline font-semibold">Support Channel</NuxtLink>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  // تعريف البروبس الخاص بالخطأ الذي يمرره Nuxt تلقائياً لهذه الصفحة
  const props = defineProps({
    error: Object
  })
  
  // التحقق مما إذا كان الخطأ هو 404 (صفحة غير موجودة)
  const is404 = computed(() => props.error?.statusCode === 404)
  
  // 🔵 الدالة السحرية لتصفير الخطأ في الـ Router وإعادة العميل لصفحة الأمان (الرئيسية)
  const handleClearError = () => {
    clearError({ redirect: '/' })
  }
  
  useHead({
    title: props.error?.statusCode === 404 ? 'Page Not Found | Laurette Store' : 'Error Occurred | Laurette Store'
  })
  </script>
  
  <style scoped>
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); opacity: 0.9; }
    50% { transform: scale(1.05); opacity: 1; }
  }
  .animate-pulse-slow {
    animation: pulse-slow 3s infinite ease-in-out;
  }
  
  .active\:scale-95:active {
    transform: scale(0.95);
  }
  </style>