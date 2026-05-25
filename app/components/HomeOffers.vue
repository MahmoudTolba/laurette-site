<template>
  <section id="home-offers" class="py-16 bg-surface font-sans" dir="ltr">
    <div class="container mx-auto px-4">
      
      <div class="text-center mb-12 max-w-xl mx-auto space-y-3">
        <h2 class="text-4xl lg:text-5xl font-serif text-text">Offers</h2>
        <div class="w-20 h-1.5 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full"></div>

        <p class="text-muted text-[15px] leading-relaxed">
          Made using clean, non-toxic ingredients, our products are designed for everyone.
        </p>
      </div>

      <div v-if="isLoading" class="flex flex-col justify-center items-center py-20 space-y-4">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        <p class="text-muted text-xs">Loading exclusive offers...</p>
      </div>

      <div v-else>
        <div v-if="products.length === 0" class="text-center py-16 bg-white rounded-xl border border-outline/30">
          <Icon name="heroicons:tag" class="w-10 h-10 text-outline mx-auto mb-2" />
          <p class="text-muted text-base">No special products available right now.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 sm:px-0">
          <div 
            v-for="product in products" 
            :key="product.id" 
            class="flex flex-col group relative bg-white border border-outline/30 p-3 rounded-xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
          >
            <NuxtLink :to="`/products/${product.id}`" class="relative aspect-[4/5] w-full bg-background/50 rounded-lg overflow-hidden flex items-center justify-center p-4 block cursor-pointer">
              
              <span v-if="product.stock <= 2 && product.stock > 0" class="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider rounded-sm z-10">
                Low Stock
              </span>

              <img 
                :src="product.image_url" 
                :alt="product.title" 
                class="max-h-full max-w-full object-contain mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </NuxtLink>

            <div class="flex flex-col items-center text-center mt-4 flex-1 space-y-2">
              <NuxtLink :to="`/products/${product.id}`" class="block w-full">
                <h3 class="text-sm font-semibold text-text min-h-[44px] line-clamp-2 px-2 hover:text-primary transition-colors cursor-pointer">
                  {{ product.title }}
                </h3>
              </NuxtLink>

              <div class="flex items-center text-amber-400">
                <Icon 
                  v-for="star in 5" 
                  :key="star" 
                  name="material-symbols:star" 
                  class="w-3.5 h-3.5" 
                />
              </div>

              <div class="flex items-center justify-center gap-2 flex-wrap text-xs sm:text-sm font-bold">
                <span class="bg-surface text-text px-2 py-0.5 rounded border border-outline/50">
                  {{ formatPrice(product.price) }}
                </span>
              </div>

              <div class="w-full pt-3 mt-auto">
                <button 
                  @click="addToCart(product)"
                  :disabled="product.stock === 0"
                  class="w-full bg-dark hover:bg-primary text-white text-[11px] uppercase font-bold py-3 tracking-widest transition-all duration-300 rounded-lg shadow-sm active:scale-95 disabled:bg-zinc-300 disabled:cursor-not-allowed"
                >
                  {{ product.stock === 0 ? 'Out of Stock' : 'Add to Bag' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <NuxtLink to="/products" class="bg-dark text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-primary transition-colors duration-300">
          View All Products
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useState } from '#app'

const supabase = useSupabaseClient()
const products = ref([])
const isLoading = ref(true)

// استدعاء الـ State المشتركة الخاصة بالسلة لتحديثها فوراً في الـ Navbar/Sidebar
const cart = useState('cart', () => [])

// تنسيق الأسعار
const formatPrice = (amount) => {
  if (!amount) return '0 EGP'
  return `${Number(amount).toLocaleString('en-EG', { minimumFractionDigits: 0 })} EGP`
}

// جلب المنتجات الحقيقية المتوافقة مع أعمدة جدولك الحالي في Supabase
const fetchOfferProducts = async () => {
  try {
    isLoading.value = true
    
    // تم إلغاء فلتر الـ old_price تماماً لتجنب إيرور الـ 400
    const { data, error } = await supabase
      .from('products')
      .select('id, title, price, stock, image_url, created_at')
      .order('created_at', { ascending: false })
      .limit(5) // عرض أول 5 منتجات مضافة حديثاً
      
    if (error) throw error
    
    products.value = data || []
  } catch (error) {
    console.error('Error loading products:', error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchOfferProducts()
})

// دالة إضافة المنتج الحالي للسلة مع التحديث اللحظي الفوري للموقع
const addToCart = (product) => {
  const existingProduct = cart.value.find(item => item.id === product.id)
  if (existingProduct) {
    existingProduct.quantity += 1
  } else {
    cart.value.push({ 
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
      quantity: 1 
    })
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>