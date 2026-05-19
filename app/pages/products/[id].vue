<template>
    <main class="min-h-screen bg-background font-sans pt-36 pb-20 lg:pt-44" dir="ltr">
      <div class="container mx-auto px-4 max-w-6xl">
        
        <nav class="flex items-center space-x-2 text-xs md:text-sm text-muted/70 mb-8">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
          <Icon name="heroicons:chevron-right" class="w-3 h-3" />
          <NuxtLink to="/products" class="hover:text-primary transition-colors">Products</NuxtLink>
          <Icon name="heroicons:chevron-right" class="w-3 h-3" />
          <span class="text-gray-600 font-medium truncate">{{ product?.name || 'Product Details' }}</span>
        </nav>
  
        <div v-if="product" class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div class="lg:col-span-5 space-y-4">
            <div class="relative aspect-square w-full bg-white rounded-2xl border border-outline/50 shadow-sm flex items-center justify-center p-8 overflow-hidden group">
              <span v-if="product.onSale" class="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm z-10">
                Sale
              </span>
              <img 
                :src="activeImage || product.image" 
                :alt="product.name" 
                class="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
  
            <div class="flex gap-3 overflow-x-auto pb-2">
              <button 
                v-for="(img, idx) in productGallery" 
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
              <span class="text-xs uppercase font-bold text-primary tracking-widest">{{ product.category }}</span>
              <h1 class="text-3xl md:text-4xl font-serif text-text leading-tight">
                {{ product.name }}
              </h1>
              
              <div class="flex items-center gap-3 pt-1">
                <div class="flex items-center text-amber-400">
                  <Icon v-for="i in 5" :key="i" name="material-symbols:star" class="w-4 h-4" />
                </div>
                <span class="text-xs text-muted/70 font-semibold">(24 Customer Reviews)</span>
              </div>
            </div>
  
            <div class="flex items-center gap-3 py-3 border-y border-outline/50">
              <span v-if="product.oldPrice" class="text-lg text-muted/70 line-through font-normal">
                {{ product.oldPrice }} EGP
              </span>
              <span class="text-2xl md:text-3xl font-bold text-text bg-surface border border-outline/50 px-3 py-1 rounded-lg">
                {{ product.price }} EGP
              </span>
            </div>
  
            <p class="text-gray-600 text-sm md:text-base leading-relaxed">
              {{ product.shortDescription }}
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
                @click="addToCart"
                class="flex-1 bg-dark hover:bg-primary text-white font-bold text-sm uppercase tracking-widest py-4 px-8 rounded-full shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
              >
                <Icon name="uil:shopping-bag" class="w-5 h-5" />
                Add to Bag
              </button>
            </div>
  
            <div class="pt-8 space-y-4">
              <div class="flex border-b border-outline text-sm">
                <button 
                  v-for="tab in tabs" 
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  class="py-3 px-4 font-bold tracking-wide uppercase transition-colors relative"
                  :class="activeTab === tab.id ? 'text-primary' : 'text-muted/70 hover:text-muted'"
                >
                  {{ tab.name }}
                  <span v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                </button>
              </div>
              
              <div class="text-sm text-muted leading-relaxed min-h-[100px] bg-white p-4 rounded-xl border border-outline/30 shadow-sm">
                <p v-if="activeTab === 'desc'">{{ product.longDescription }}</p>
                <p v-if="activeTab === 'usage'">{{ product.howToUse }}</p>
                <p v-if="activeTab === 'ingredients'" class="italic font-light">{{ product.ingredients }}</p>
              </div>
            </div>
  
          </div>
        </div>
  
        <div v-else class="text-center py-32 bg-white rounded-2xl border border-outline/50">
          <Icon name="svg-spinners:ring-resize" class="w-10 h-10 text-primary mx-auto mb-3 animate-spin" />
          <p class="text-muted">Fetching pristine beauty details...</p>
        </div>
  
      </div>
    </main>
  </template>
  
  <script setup>
  const route = useRoute();
  const productId = route.params.id;
  
  const quantity = ref(1);
  const activeImage = ref('');
  const activeTab = ref('desc');
  
  // 🔵 استدعاء نفس السلة المشتركة (Shared Cart State) ليسمع فيها التحديث فوراً
  const cart = useState('cart', () => []);
  
  const tabs = [
    { id: 'desc', name: 'Description' },
    { id: 'usage', name: 'How to Use' },
    { id: 'ingredients', name: 'Ingredients' }
  ];
  
  // Mock Fetching system simulating structural fetching maps
  const productsMockDatabase = [
    {
      id: '1',
      name: 'Topface Instyle Creamy Lipstick 001.',
      category: 'Make Up',
      price: 188,
      oldPrice: 375,
      onSale: true,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600',
      shortDescription: 'Formulated with luxury clean emollients, this ultra-creamy lipstick delivers intense moisture and highly pigmented velvety coverage in a single stroke.',
      longDescription: 'The Topface Instyle Creamy Lipstick guarantees crisp contouring and vibrant depth. Infused with organic plant seed extracts, it shields your lips from atmospheric moisture depletion while maintaining a featherlight weight on the lips all day long.',
      howToUse: 'Glide softly directly over dry exfoliated lips starting outward from the center cupid’s bow. Layer twice to amplify depth pigment saturation.',
      ingredients: 'Caprylic Triglyceride, Ricinus Communis Seed Oil, Clean Microcrystalline Wax, Synthetic Beeswax, Hydrogenated Vegetable Oil, Pink Mica Pearl Dust, Iron Oxides.'
    },
    {
      id: '3',
      name: 'Soralone Hydra Cream Gel 100ml Offer (1+1)',
      category: 'Korean Care',
      price: 275,
      oldPrice: 550,
      onSale: true,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600',
      shortDescription: 'An ultra-light, refreshing Korean hydration gel loaded with oceanic specialized moisture binding clusters.',
      longDescription: 'Soralone Hydra Gel bypasses the heavy surface barrier issues of normal creams by instantly absorbing into skin cellular strata. Perfect under heavy humid conditions or for standard multi-step daily routing maps.',
      howToUse: 'Dab standard clean bean-sized quantities across forehead and cheeks right after morning toning routines. Tap smoothly for quick maximum integration.',
      ingredients: 'Authentic Seoul Hyaluronic Acid Extracts, Centella Asiatica Compound Fractions, Aloe Leaf Botanical Water matrices.'
    }
  ];
  
  // Reactive data bindings computed from route IDs
  const product = computed(() => {
    return productsMockDatabase.find(p => p.id === productId) || productsMockDatabase[0];
  });
  
  // Mock secondary imagery layers fallback generators
  const productGallery = computed(() => {
    if (!product.value) return [];
    return [
      product.value.image,
      'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=400',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400'
    ];
  });
  
  // 🔵 تحديث دالة الإضافة لتعديل عدد المنتجات الحقيقي داخل الـ State المشترك
  const addToCart = () => {
    if (!product.value) return;
  
    const existingProduct = cart.value.find(item => item.id === product.value.id);
    
    if (existingProduct) {
      // زيادة الكمية بناءً على العدد الذي حدده المستخدم من العداد
      existingProduct.quantity += quantity.value;
    } else {
      // إضافة منتج جديد بالكمية المحددة
      cart.value.push({ ...product.value, quantity: quantity.value });
    }
  
    // اختياري: إعادة تعيين العداد إلى 1 بعد الإضافة الناجحة
    quantity.value = 1;
  };
  
  useHead({
    title: product.value ? `${product.value.name} | Laurette Store` : 'Product Details'
  });
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
  .fade-enter-from, .fade-leave-to { opacity: 0; }
  
  .slide-enter-active, .slide-leave-active { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
  </style>