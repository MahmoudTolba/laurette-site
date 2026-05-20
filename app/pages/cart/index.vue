<template>
    <main class="min-h-screen bg-background font-sans pt-36 pb-20 lg:pt-44" dir="ltr">
      <div class="container mx-auto px-4 max-w-6xl">
        
        <h1 class="text-3xl md:text-4xl font-serif text-text mb-8" > Your Shopping Bag </h1 >
  
        <div v-if="cart.length > 0" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div class="lg:col-span-8 space-y-4">
            <div class="bg-white rounded-2xl border border-outline/50 shadow-sm p-4 md:p-6 space-y-6">
              
              <div 
                v-for="item in cart" 
                :key="item.id" 
                class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-outline/50 last:border-0 last:pb-0"
              >
                <div class="flex items-center gap-4 flex-1 min-w-0">
                  <div class="w-20 h-20 bg-gray-50 rounded-xl p-2 border border-outline/30 flex items-center justify-center flex-shrink-0">
                    <img :src="item.image" :alt="item.name" class="max-h-full max-w-full object-contain" />
                  </div>
                  <div class="space-y-1 min-w-0">
                    <span class="text-[10px] uppercase font-bold text-primary tracking-wider block">{{ item.category }}</span>
                    <NuxtLink :to="`/products/${item.id}`" class="text-sm md:text-base font-semibold text-text hover:text-primary transition-colors block truncate pr-2">
                      {{ item.name }}
                    </NuxtLink>
                    <span class="text-sm font-bold text-gray-500 block">{{ item.price }} EGP</span>
                  </div>
                </div>
  
                <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0">
                  
                  <div class="flex items-center justify-between border border-outline rounded-full bg-white px-1.5 py-0.5 w-28 shadow-sm">
                    <button 
                      @click="updateQuantity(item.id, -1)"
                      class="w-7 h-7 rounded-full flex items-center justify-center text-muted hover:bg-background active:scale-95 transition-all font-bold text-sm"
                    >
                      &minus;
                    </button>
                    <span class="text-xs font-bold text-text w-6 text-center select-none">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.id, 1)"
                      class="w-7 h-7 rounded-full flex items-center justify-center text-muted hover:bg-background active:scale-95 transition-all font-bold text-sm"
                    >
                      &plus;
                    </button>
                  </div>
  
                  <div class="text-right min-w-[80px]">
                    <span class="text-sm md:text-base font-bold text-text">
                      {{ item.price * item.quantity }} EGP
                    </span>
                  </div>
  
                  <button 
                    @click="removeFromCart(item.id)"
                    class="p-2 text-muted/60 hover:text-secondary hover:bg-secondary/5 rounded-full transition-colors"
                    title="Remove Item"
                  >
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
  
                </div>
              </div>
  
            </div>
  
            <div class="flex justify-between items-center px-2">
              <NuxtLink to="/products" class="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                <Icon name="heroicons:arrow-left" class="w-4 h-4" /> Continue Shopping
              </NuxtLink>
              <button 
                @click="clearCart"
                class="text-xs font-bold text-muted/70 hover:text-secondary transition-colors uppercase tracking-wider"
              >
                Clear Bag
              </button>
            </div>
          </div>
  
          <div class="lg:col-span-4">
            <div class="bg-white rounded-2xl border border-outline/50 shadow-sm p-6 space-y-6 sticky top-40">
              <h3 class="text-lg font-bold text-text border-b border-outline/50 pb-3">Order Summary</h3>
              
              <div class="space-y-3 text-sm">
                <div class="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span class="font-semibold text-text">{{ subtotal }} EGP</span>
                </div>
                <div class="flex justify-between text-muted">
                  <span>Shipping Fee</span>
                  <span v-if="subtotal > 0" class="font-semibold text-text">{{ shippingFee }} EGP</span>
                  <span v-else class="font-semibold text-text">0 EGP</span>
                </div>
             
                <hr class="border-outline/50 my-2" />
                
                <div class="flex justify-between text-base font-bold text-text">
                  <span>Total Amount</span>
                  <span class="text-xl text-primary">{{ totalAmount }} EGP</span>
                </div>
              </div>
  
              <button 
                @click="navigateTo('/checkout')"
                class="w-full bg-dark hover:bg-primary text-white font-bold text-sm uppercase tracking-widest py-4 rounded-full shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                Proceed to Checkout
                <Icon name="heroicons:arrow-right" class="w-4 h-4" />
              </button>
  
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-outline/30 text-xs text-muted/80">
                <Icon name="heroicons:shield-check" class="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <p>Secure Checkout Guaranteed. Your pristine personal beauty data is completely shielded.</p>
              </div>
            </div>
          </div>    
  
        </div>
  
        <div v-else class="text-center py-24 bg-white rounded-2xl border border-outline/50 max-w-2xl mx-auto shadow-sm p-8">
          <div class="w-20 h-20 bg-primary/5 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="uil:shopping-bag" class="w-10 h-10" />
          </div>
          <h2 class="text-2xl font-serif text-text mb-2">Your Bag is Empty</h2>
          <p class="text-muted text-sm max-w-sm mx-auto mb-8">
            Looks like you haven't added any luxury beauty pieces yet. Explore our selections to fill it up!
          </p>
          <NuxtLink 
            to="/products" 
            class="inline-flex bg-dark hover:bg-primary text-white font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            Discover Products
          </NuxtLink>
        </div>
  
      </div>
    </main>
  </template>
  
  <script setup>
  // 🔵 استدعاء السلة المشتركة ذاتها
  const cart = useState('cart', () => []);
  
  // تكلفة الشحن الثابتة كمثال
  const shippingFee = ref(50);
  
  // 🔵 حساب المجموع الفرعي للمنتجات ديناميكياً
  const subtotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });
  
  // 🔵 حساب الإجمالي النهائي (المنتجات + الشحن)
  const totalAmount = computed(() => {
    if (subtotal.value === 0) return 0;
    return subtotal.value + shippingFee.value;
  });
  
  // 🔵 دالة تحديث الكمية (زيادة أو نقصان) من داخل السلة مباشرة
  const updateQuantity = (id, change) => {
    const item = cart.value.find(p => p.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        item.quantity = newQuantity;
      } else {
        // إذا نزلت الكمية عن 1 يتم حذف المنتج تلقائياً
        removeFromCart(id);
      }
    }
  };
  
  // 🔵 دالة حذف منتج معين بالـ ID
  const removeFromCart = (id) => {
    cart.value = cart.value.filter(item => item.id !== id);
  };
  
  // 🔵 دالة مسح السلة بالكامل
  const clearCart = () => {
    if (confirm('Are you sure you want to empty your shopping bag?')) {
      cart.value = [];
    }
  };
  
  // دالة محاكاة الانتقال لصفحة الدفع والتوصيل
  const checkout = () => {
    alert(`Proceeding to checkout with total value: ${totalAmount.value} EGP`);
    // هنا يمكنك التوجيه لصفحة الدفع الحقيقية: navigateTo('/checkout')
  };
  
  // إعدادات الـ SEO لعنوان الصفحة
  useHead({
    title: 'Your Shopping Bag | Laurette Store'
  });
  </script>
  
  <style scoped>
  /* حركات لطيفة وتأثيرات انتقال مرنة داخل الصفحة */
  .active\:scale-95:active {
    transform: scale(0.95);
  }
  </style>