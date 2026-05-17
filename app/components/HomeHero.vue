<template>
    <section class="relative h-[60vh] md:h-[80vh] w-full overflow-hidden font-['Cairo']" dir="rtl">
      <!-- الخلفية: صورة احترافية مع Overlay متدرج -->
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero Background" 
          class="w-full h-full object-cover object-center transform scale-105 animate-slow-zoom"
        />
        <!-- طبقة تظليل لجعل النص مقروءاً (Gradient Overlay) -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      </div>
  
      <!-- المحتوى -->
      <div class="container mx-auto px-4 h-full relative z-10 flex items-center">
        <div class="max-w-2xl text-white space-y-6 md:space-y-8">
          
          <!-- Badge صغير -->
          <span class="inline-block bg-pink-600/90 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider animate-fade-in-down">
            وصل حديثاً: المنتجات الكورية الأصلية
          </span>
  
          <!-- العنوان الرئيسي -->
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight animate-fade-in-right">
            أهلاً بك في <span class="text-pink-500">لوريت ستور</span>
            <br />
            جمالك يبدأ من هنا
          </h1>
  
          <!-- الوصف -->
          <p class="text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed animate-fade-in-up delay-200">
            اكتشفي أحدث صيحات العناية بالبشرة، المكياج، ومنتجات العناية الكورية المختارة بعناية لتناسب روتينك اليومي.
          </p>
  
          <!-- الأزرار -->
          <div class="flex flex-wrap gap-4 animate-fade-in-up delay-500">
            <NuxtLink 
              to="/products" 
              class="group relative overflow-hidden bg-white text-purple-900 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-pink-500/20 transition-all duration-300"
            >
              <span class="relative z-10">تسوقي الآن</span>
              <div class="absolute inset-0 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <span class="absolute inset-0 group-hover:text-white transition-colors duration-300"></span>
            </NuxtLink>
  
            <NuxtLink 
              to="/contact" 
              class="border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all"
            >
              تواصل معنا
            </NuxtLink>
          </div>
        </div>
      </div>
  
      <!-- مؤشر تمرير سفلي (Scroll Indicator) -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div class="w-1 h-2 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
  /* انيميشن الزوم الهادئ للخلفية */
  @keyframes slow-zoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }
  .animate-slow-zoom {
    animation: slow-zoom 20s infinite alternate ease-in-out;
  }
  
  /* انيميشن النصوص */
  .animate-fade-in-right {
    animation: fadeInRight 1s ease-out forwards;
  }
  .animate-fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
    opacity: 0;
  }
  .animate-fade-in-down {
    animation: fadeInDown 0.8s ease-out forwards;
  }
  
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .delay-200 { animation-delay: 0.2s; }
  .delay-500 { animation-delay: 0.5s; }
  </style>