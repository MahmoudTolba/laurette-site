<template>
    <main class="min-h-screen bg-background font-sans pt-36 pb-20 lg:pt-44" dir="ltr">
      <div class="container mx-auto px-4 max-w-6xl">
        
        <nav class="flex items-center space-x-2 text-xs md:text-sm text-muted/70 mb-8">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
          <Icon name="heroicons:chevron-right" class="w-3 h-3" />
          <NuxtLink to="/packages" class="hover:text-primary transition-colors">Packages</NuxtLink>
          <Icon name="heroicons:chevron-right" class="w-3 h-3" />
          <span class="text-gray-600 font-medium truncate">{{ currentPackage?.name || 'Package Details' }}</span>
        </nav>
  
        <div v-if="currentPackage" class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div class="lg:col-span-5 space-y-4">
            <div class="relative aspect-square w-full bg-white rounded-2xl border border-outline/50 shadow-sm flex items-center justify-center p-8 overflow-hidden group">
              <span v-if="currentPackage.onSale" class="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm z-10">
                Sale
              </span>
              <span class="absolute top-4 right-4 bg-dark text-white text-[10px] font-bold px-2 py-0.5 rounded-sm z-10">
                Save {{ calculateDiscount(currentPackage.oldPrice, currentPackage.price) }}%
              </span>
              <img 
                :src="activeImage || currentPackage.image" 
                :alt="currentPackage.name" 
                class="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
  
            <div class="flex gap-3 overflow-x-auto pb-2">
              <button 
                v-for="(img, idx) in packageGallery" 
                :key="idx"
                @click="activeImage = img"
                class="w-20 h-20 bg-white border rounded-xl p-2 flex items-center justify-center overflow-hidden flex-shrink-0 transition-all shadow-sm"
                :class="activeImage === img || (!activeImage && idx === 0) ? 'border-primary ring-2 ring-primary/10' : 'border-outline opacity-70 hover:opacity-100'"
              >
                <img :src="img" class="max-h-full max-w-full object-contain" />
              </button>
            </div>
          </div>
  
          <div class="lg:col-span-7 space-y-6">
            <div class="space-y-2">
              <span class="text-xs uppercase font-bold text-primary tracking-widest">{{ currentPackage.category }}</span>
              <h1 class="text-3xl md:text-4xl font-serif text-text leading-tight">
                {{ currentPackage.name }}
              </h1>
              
              <div class="flex items-center gap-3 pt-1">
                <div class="flex items-center text-amber-400">
                  <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="w-4 h-4" />
                </div>
                <span class="text-xs text-muted/70 font-semibold">(Exclusive Bundle Deal)</span>
              </div>
            </div>
  
            <div class="flex items-center gap-3 py-3 border-y border-outline/50">
              <span v-if="currentPackage.oldPrice" class="text-lg text-muted/70 line-through font-normal">
                {{ formatPrice(currentPackage.oldPrice) }}
              </span>
              <span class="text-2xl md:text-3xl font-bold text-text bg-surface border border-outline/50 px-3 py-1 rounded-lg">
                {{ formatPrice(currentPackage.price) }}
              </span>
            </div>
  
            <p class="text-gray-600 text-sm md:text-base leading-relaxed">
              {{ currentPackage.shortDescription }}
            </p>
  
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <div class="flex items-center justify-between border border-outline rounded-full bg-white px-2 py-1 max-w-[140px] w-full self-center sm:self-auto shadow-sm">
                <button 
                  @click="quantity > 1 ? quantity-- : null"
                  class="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:bg-background active:scale-95 transition-all text-lg font-bold"
                >
                  &minus;
                </button>
                <span class="text-sm font-bold text-text w-8 text-center select-none">{{ quantity }}</span>
                <button 
                  @click="quantity++"
                  class="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:bg-background active:scale-95 transition-all text-lg font-bold"
                >
                  &plus;
                </button>
              </div>
  
              <button 
                @click="handleAddToCart"
                class="flex-1 bg-dark hover:bg-primary text-white font-bold text-sm uppercase tracking-widest py-4 px-8 rounded-full shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
              >
                <Icon name="uil:shopping-bag" class="w-5 h-5" />
                Add Bundle to Bag
              </button>
            </div>
  
            <div class="pt-8 space-y-4">
              <div class="flex border-b border-outline text-sm overflow-x-auto">
                <button 
                  v-for="tab in tabs" 
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  class="py-3 px-4 font-bold tracking-wide uppercase transition-colors relative flex-shrink-0"
                  :class="activeTab === tab.id ? 'text-primary' : 'text-muted/70 hover:text-muted'"
                >
                  {{ tab.name }}
                  <span v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                </button>
              </div>
              
              <div class="text-sm text-muted leading-relaxed min-h-[100px] bg-white p-4 rounded-xl border border-outline/30 shadow-sm">
                <p v-if="activeTab === 'desc'">{{ currentPackage.longDescription }}</p>
                <p v-if="activeTab === 'includes'">{{ currentPackage.packageIncludes }}</p>
                <p v-if="activeTab === 'usage'">{{ currentPackage.howToUse }}</p>
              </div>
            </div>
  
          </div>
        </div>
  
        <div v-else class="text-center py-32 bg-white rounded-2xl border border-outline/50">
          <Icon name="svg-spinners:ring-resize" class="w-10 h-10 text-primary mx-auto mb-3 animate-spin" />
          <p class="text-muted">Fetching exclusive bundle details...</p>
        </div>
  
      </div>
    </main>
  </template>
  
  <script setup>
  const route = useRoute();
  const packageId = route.params.id;
  
  const quantity = ref(1);
  const activeImage = ref('');
  const activeTab = ref('desc');
  
  // استدعاء نفس الـ Shared Cart State لمزامنة وحفظ المنتجات برمجياً بالسلة
  const cart = useState('cart', () => []);
  
  const tabs = [
    { id: 'desc', name: 'Overview' },
    { id: 'includes', name: 'Package Includes' },
    { id: 'usage', name: 'How to Use' }
  ];
  
  // قاعدة بيانات الباكدجات المتطابقة لربط وحفظ الـ id الفريد لكل باكدج
  const packagesMockDatabase = [
    {
      id: '101',
      name: 'Feel Good Offer ( Cleanser + Spray )',
      category: 'Skin Care Offers',
      price: 225.00,
      oldPrice: 445.00,
      onSale: true,
      image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600',
      shortDescription: 'Get the perfect radiant glow with this duo designed to completely purify your skin cells and lock in deep moisture layers all day.',
      longDescription: 'This exclusive combo features our highest rated botanical pore cleanser along with our skin-barrier restoring spray. Formulated with zero non-toxic chemicals to ensure complete balance for sensitive and dry skin structures.',
      packageIncludes: '1x Topface Micellar Cleansing Water (150ml), 1x Capixy Intense Tonic Spray.',
      howToUse: 'Cleanse your face thoroughly using the micellar water on a dry cotton pad. Right after, mist the tonic spray evenly across your face and neck from a 20cm distance. Repeat every morning and night.'
    },
    {
      id: '102',
      name: 'Ecobel Offer ( Body Milk + Urea )',
      category: 'Body Care Offers',
      price: 300.00,
      oldPrice: 600.00,
      onSale: true,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600',
      shortDescription: 'Unmatched deep cellular body moisture and skin peeling restoration packed into one intense hydrating value deal.',
      longDescription: 'Specially engineered for rough skin structures and extreme dryness. Our Ecobel bundle brings together high-fraction Urea complexes alongside luxurious soothing elements to reveal a silky smooth layer.',
      packageIncludes: '1x Ecobel Intense Body Milk (250ml), 1x Skin-Smoothing Urea Cream (50ml).',
      howToUse: 'Apply the body milk generously over your entire body post-showering. For tough areas like elbows, heels, or knees, layer the specialized Urea cream directly and massage until completely integrated.'
    }
  ];
  
  // دالة العثور الديناميكي على الباكدج المطلوب عن طريق الـ id في الرابط
  const currentPackage = computed(() => {
    return packagesMockDatabase.find(p => p.id === String(packageId)) || packagesMockDatabase[0];
  });
  
  // مصفوفة معرض الصور المتقدم للباكدج
  const packageGallery = computed(() => {
    if (!currentPackage.value) return [];
    return [
      currentPackage.value.image,
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=400'
    ];
  });
  
  // تنسيق وتفقيط السعر بالـ EGP متطابقاً مع كود الصفحات الأصلي
  const formatPrice = (amount) => {
    return `${amount.toLocaleString('en-EG', { minimumFractionDigits: 2 })} EGP`;
  };
  
  // دالة حساب نسبة الخصم الإجمالية للباكدج
  const calculateDiscount = (oldPrice, newPrice) => {
    if (!oldPrice || oldPrice <= newPrice) return 0;
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };
  
  // معالج الإضافة المباشر والذكي للسلة مع حفظ وتراكم الكميات المطلوبة بدقة
  const handleAddToCart = () => {
    if (!currentPackage.value) return;
  
    const existingProduct = cart.value.find(item => item.id === currentPackage.value.id);
    
    if (existingProduct) {
      existingProduct.quantity += quantity.value;
    } else {
      cart.value.push({ 
        id: currentPackage.value.id,
        name: currentPackage.value.name,
        price: currentPackage.value.price,
        image: currentPackage.value.image,
        category: 'Package Deal',
        quantity: quantity.value 
      });
    }
  
    // إعادة تعيين كمية العداد إلى 1 بعد نجاح عملية الحفظ بالسلة
    quantity.value = 1;
  };
  
  useHead({
    title: currentPackage.value ? `${currentPackage.value.name} | Laurette Store` : 'Package Details'
  });
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }
  
  .slide-enter-active, .slide-leave-active { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
  </style>