<template>
    <section id="home-packages" class="py-16 bg-surface font-sans" dir="ltr">
      <div class="container mx-auto px-4">
        
        <div class="text-center mb-12 max-w-xl mx-auto space-y-3">
          <h2 class="text-4xl lg:text-5xl font-serif text-text">Packages</h2>
          <div class="w-20 h-1.5 bg-gradient-to-l from-secondary to-primary mx-auto rounded-full"></div>
  
          <p class="text-muted text-[15px] leading-relaxed">
            Exclusive value bundles curated just for you using our finest clean beauty products.
          </p>
        </div>
  
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-9">
          <div 
            v-for="pkg in packages" 
            :key="pkg.id" 
            class="flex flex-col group relative bg-surface rounded-lg transition-all duration-300"
          >
            <div class="relative aspect-[4/5] w-full bg-background rounded-md overflow-hidden flex items-center justify-center p-4">
              
              <span v-if="pkg.onSale" class="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-3 py-1 uppercase z-10">
                Sale
              </span>
  
              <span class="absolute top-3 right-3 bg-dark text-white text-[11px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 z-10" dir="rtl">
                <span>خصم {{ calculateDiscount(pkg.oldPrice, pkg.price) }}%</span>
              </span>
  
              <img 
                :src="pkg.image" 
                :alt="pkg.name" 
                class="max-h-full max-w-full object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
  
            <div class="flex flex-col items-center text-center mt-4 flex-1 space-y-2">
              <h3 class="text-sm md:text-base font-semibold text-text min-h-[44px] line-clamp-2 px-2 hover:text-secondary transition-colors cursor-pointer">
                {{ pkg.name }}
              </h3>
  
              <div class="flex items-center gap-0.5 text-gray-200">
                <Icon 
                  v-for="star in 5" 
                  :key="star" 
                  name="material-symbols:star" 
                  class="w-4 h-4 text-gray-300" 
                />
              </div>
  
              <div class="flex items-center justify-center gap-2 flex-wrap text-sm font-bold">
                <span class="text-gray-400 line-through font-normal">
                  {{ formatPrice(pkg.oldPrice) }}
                </span>
                <span class="bg-surface text-text px-1.5 py-0.5 rounded border border-outline/50">
                  {{ formatPrice(pkg.price) }}
                </span>
              </div>
  
              <div class="w-full pt-2 mt-auto">
                <button 
                  @click="addToCart(pkg)"
                  class="w-full bg-dark hover:bg-primary text-white text-xs uppercase font-bold py-3 tracking-wider transition-colors duration-300 shadow-sm rounded-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <div class="text-center mt-12">
          <NuxtLink to="/packages" class="bg-dark text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-primary transition-colors duration-300">
            View All Packages
          </NuxtLink>
        </div>
  
      </div>
    </section>
  </template>
  
  <script setup>
  // استدعاء السلة المشتركة لمزامنة الحفظ التلقائي
  const cart = useState('cart', () => [])
  
  // قاعدة بيانات الباكدجات المهيأة بالكامل بالمتغيرات الجديدة للتوافق مع الكود المرجعي
  const packages = ref([
    {
      id: 101,
      name: 'Feel Good Offer ( Cleanser + Spray )',
      price: 225.00,
      oldPrice: 445.00,
      image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400', 
      onSale: true
    },
    {
      id: 102,
      name: 'Ecobel Offer ( Body Milk + Urea )',
      price: 300.00,
      oldPrice: 600.00,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400', 
      onSale: true
    }
  ])
  
  // دالة تفقيط الأسعار المرجعية الموحدة بالكامل
  const formatPrice = (amount) => {
    return `${amount.toLocaleString('en-EG', { minimumFractionDigits: 2 })} EGP`;
  };
  
  // دالة حساب نسبة الخصم الذكية لتغذية شارات العرض الجانبية
  const calculateDiscount = (oldPrice, newPrice) => {
    if (!oldPrice) return 0
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100)
  }
  
  // دالة إضافة الباكدج للسلة مع دعم التحديث التلقائي الفوري
  const addToCart = (product) => {
    const existingItem = cart.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: 'Package Deal',
        quantity: 1
      })
    }
  }
  </script>
  
  <style scoped>
  /* الحفاظ على ميزة كسر النصوص الطويلة بأناقة عند السطور الثنائية */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
  </style>