<template>
    <section class="py-16 " dir="">
      <div class="container mx-auto px-4">
        
        <!-- العنوان الرئيسي -->
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-text mb-2">تسوقي حسب الفئة</h2>
          <div class="w-20 h-1.5 bg-gradient-to-l from-secondary to-primary mx-auto rounded-full"></div>
        </div>
  
        <!-- شبكة التصنيفات -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 lg:gap-16">
          <NuxtLink 
            v-for="(category, index) in categories" 
            :key="index"
            :to="category.url"
            class="group flex flex-col items-center"
          >
            <!-- الدائرة الحاضنة للصورة -->
            <div class="relative aspect-square w-full max-w-[260px] rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-2xl group-hover:border-primary/30 transition-all duration-500 transform group-hover:-translate-y-2">
              
              <!-- الصورة المختارة بعناية لتناسب الفئة -->
              <img 
                :src="category.image" 
                :alt="category.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
  
              <!-- الطبقة الشفافة والنص -->
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center p-4">
                <h3 class="text-white text-lg md:text-2xl lg:text-3xl font-bold text-center leading-tight drop-shadow-md">
                  {{ category.name }}
                </h3>
              </div>
            </div>
          </NuxtLink>
        </div>
  
      </div>
    </section>
  </template>
  
  <script setup>
  // صور احترافية من Unsplash مخصصة لكل قسم
  const categories = [
    { 
      name: 'العناية بالبشرة', 
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop', 
      url: '/category/skin-care' 
    },
    { 
      name: 'العناية بالجسم', 
      image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=600&auto=format&fit=crop', 
      url: '/category/body-care' 
    },
    { 
      name: 'العناية بالشعر', 
      image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop', 
      url: '/category/hair-care' 
    },
    { 
      name: 'قسم الأطفال', 
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop', 
      url: '/category/baby-care' 
    },
    { 
      name: 'المنتجات الكورية', 
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600&auto=format&fit=crop', 
      url: '/category/korean-care' 
    },
    { 
      name: 'المكياج', 
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop', 
      url: '/category/makeup' 
    },
  ];
  </script>
  
  <style scoped>
  /* لضمان تناسق الدوائر في كل الشاشات */
  .container {
    max-width: 1200px;
  }
  </style>