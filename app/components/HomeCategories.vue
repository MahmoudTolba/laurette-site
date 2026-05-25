<template>
  <section class="py-16" dir="ltr">
    <div class="container mx-auto px-4">
      
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-text mb-2 bg-gradient-to-r from-[#C28E78] to-[#A67563] bg-clip-text text-transparent">
          Shop by Category
        </h2>
        <div class="w-20 h-1.5 bg-gradient-to-r from-[#C28E78] to-[#A67563] mx-auto rounded-full"></div>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center h-40">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C28E78]"></div>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 lg:gap-16">
        <NuxtLink 
          v-for="(category, index) in categories" 
          :key="index"
          :to="`/category/${category.name.toLowerCase().replace(/ /g, '-')}`"
          class="group flex flex-col items-center"
        >
          <div class="relative aspect-square w-full max-w-[260px] rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-2xl group-hover:border-primary/30 transition-all duration-500 transform group-hover:-translate-y-2 bg-zinc-50">
            
            <img 
              :src="category.image" 
              :alt="category.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center p-4">
              <h3 class="text-white text-lg md:text-2xl lg:text-3xl font-bold text-center leading-tight drop-shadow-md font-serif tracking-wide uppercase">
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
import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const categories = ref([])
const isLoading = ref(true)

// صور جمالية مخصصة للبراند بتشتغل لو منتجات الكاتيجوري لسه مرفعش ليها صور غلاف
const fallbackImages = {
  'skincare': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop',
  'makeup': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
  'fragrance': 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop',
  'hair care': 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop'
}

const fetchCategoriesFromProducts = async () => {
  try {
    isLoading.value = true
    
    // سحب الكاتيجوري وصور المنتجات مباشرة من جدول الـ products
    const { data, error } = await supabase
      .from('products')
      .select('category, image_url')
      
    if (error) throw error

    if (data) {
      const uniqueCategoriesMap = new Map()

      data.forEach(item => {
        if (item.category) {
          const trimmedCategory = item.category.trim()
          const lowerKey = trimmedCategory.toLowerCase()
          
          // لو الكاتيجوري مش مكررة بنثبتها وبناخد صورة أول منتج يخصها
          if (!uniqueCategoriesMap.has(lowerKey)) {
            uniqueCategoriesMap.set(lowerKey, {
              name: trimmedCategory,
              image: item.image_url || fallbackImages[lowerKey] || 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600'
            })
          }
        }
      })

      // تحويل الخريطة لـ Array جاهز للرندرة في الـ template
      categories.value = Array.from(uniqueCategoriesMap.values())
    }
  } catch (error) {
    console.error('Error fetching dynamic categories:', error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchCategoriesFromProducts()
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>