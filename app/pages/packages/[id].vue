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

      <div v-if="isLoading" class="text-center py-32 bg-white rounded-2xl border border-outline/50 shadow-sm">
        <Icon name="svg-spinners:ring-resize" class="w-10 h-10 text-primary mx-auto mb-3 animate-spin" />
        <p class="text-muted font-medium">Fetching exclusive bundle details...</p>
      </div>

      <div v-else-if="errorMessage || !currentPackage" class="text-center py-24 bg-white rounded-2xl border border-outline/50 shadow-sm max-w-xl mx-auto">
        <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 class="text-lg font-bold text-text mb-2">Package Not Found</h3>
        <p class="text-muted text-sm mb-6">{{ errorMessage || "The bundle you are looking for might have expired or been removed." }}</p>
        <NuxtLink to="/packages" class="px-6 py-2.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-dark transition-colors shadow-sm">
          Back to Value Packages
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-5 space-y-4">
          <div class="relative aspect-square w-full bg-white rounded-2xl border border-outline/50 shadow-sm flex items-center justify-center p-8 overflow-hidden group">
            <span v-if="currentPackage.available_limit > 0 || currentPackage.status === 'Active'" class="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm z-10">
              Offer
            </span>
            <span v-if="currentPackage.duration" class="absolute top-4 right-4 bg-dark text-white text-[10px] font-bold px-2 py-0.5 rounded-sm z-10">
              Limited: {{ currentPackage.duration }} Days
            </span>
            <img 
              :src="activeImage || currentPackage.image" 
              :alt="currentPackage.name" 
              class="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div v-if="packageGallery.length > 1" class="flex gap-3 overflow-x-auto pb-2">
            <button 
              v-for="(img, idx) in packageGallery" 
              :key="idx"
              @click="activeImage = img"
              class="w-20 h-20 bg-white border rounded-xl p-2 flex items-center justify-center overflow-hidden flex-shrink-0 transition-all shadow-sm"
              :class="(activeImage === img) || (!activeImage && idx === 0) ? 'border-primary ring-2 ring-primary/10' : 'border-outline opacity-70 hover:opacity-100'"
            >
              <img :src="img" :alt="`${currentPackage.name} gallery ${idx + 1}`" class="max-h-full max-w-full object-contain" />
            </button>
          </div>
        </div>

        <div class="lg:col-span-7 space-y-6">
          <div class="space-y-2">
            <span class="text-xs uppercase font-bold text-primary tracking-widest block">{{ currentPackage.category || 'Package Deal' }}</span>
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
            <span class="text-2xl md:text-3xl font-bold text-text bg-surface border border-outline/50 px-3 py-1 rounded-lg">
              {{ formatPrice(currentPackage.price) }}
            </span>
          </div>

          <p class="text-gray-600 text-sm md:text-base leading-relaxed">
            {{ currentPackage.description || 'No summary description available for this package bundle.' }}
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
              <div v-if="activeTab === 'desc'">
                <p>{{ currentPackage.description || 'No detailed overview provided for this bundle offer.' }}</p>
              </div>
              <div v-if="activeTab === 'includes'">
                <p class="italic text-xs text-muted/80 mb-2">Items included in this package:</p>
                <p class="font-medium text-text">— {{ currentPackage.name }}</p>
              </div>
              <div v-if="activeTab === 'usage'">
                <p>Apply items safely as indicated per individual container directives. Keep in cool ambient storage areas away from bright direct sunlight.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter, useState, useSeoMeta, useSupabaseClient } from '#imports';

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();
const packageId = route.params.id;

const quantity = ref(1);
const activeImage = ref('');
const activeTab = ref('desc');

const cart = useState('cart', () => []);

const tabs = [
  { id: 'desc', name: 'Overview' },
  { id: 'includes', name: 'Package Includes' },
  { id: 'usage', name: 'How to Use' }
];

// الحالات الخاصة بالتحميل والاتصال بقاعدة البيانات
const currentPackage = ref(null);
const isLoading = ref(true);
const errorMessage = ref(null);

// دالة جلب تفاصيل الباكدج من جدول الـ packages بواسطة الـ ID مباشرة من الـ Supabase Client
const fetchPackageDetails = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = null;

    const { data, error } = await supabase
      .from('packages')
      .select('id, name, description, category, price, available_limit, duration, image, status')
      .eq('id', packageId)
      .single(); // جلب سطر واحد فقط متطابق مع الـ ID

    if (error) throw error;
    
    currentPackage.value = data;
    // إعادة ضبط الصورة النشطة لتكون هي الصورة الافتراضية للباكدج فور تحميله
    if (data?.image) {
      activeImage.value = data.image;
    }
  } catch (err) {
    console.error('Error loading package dynamic details:', err.message);
    errorMessage.value = "We couldn't retrieve this specific package bundle data.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPackageDetails();
});

// مصفوفة الصور لمعرض الباكدج
const packageGallery = computed(() => {
  if (!currentPackage.value || !currentPackage.value.image) return [];
  return [currentPackage.value.image];
});

// تنسيق طباعة الأسعار بالعملة المصرية بالتوافق مع الملفات السابقة
const formatPrice = (amount) => {
  if (!amount) return '0.00 EGP';
  return `${Number(amount).toLocaleString('en-EG', { minimumFractionDigits: 2 })} EGP`;
};

// دالة معالج الإضافة والدمج بداخل الـ Cart State المشتركة
const handleAddToCart = () => {
  if (!currentPackage.value) return;

  const existingProduct = cart.value.find(item => item.id === currentPackage.value.id);
  
  if (existingProduct) {
    existingProduct.quantity += quantity.value;
  } else {
    cart.value.push({ 
      id: currentPackage.value.id,
      title: currentPackage.value.name,
      price: currentPackage.value.price,
      image_url: currentPackage.value.image,
      category: 'Package Deal',
      quantity: quantity.value 
    });
  }

  // تصفير العداد لـ 1 مجدداً بعد الإضافة الناجحة
  quantity.value = 1;
};

// تهيئة وضبط الـ Dynamic SEO Meta لقراءة بيانات الباكدج من الـ Database فوراً ومباشرة
useSeoMeta({
  title: () => currentPackage.value ? `${currentPackage.value.name} - Premium Beauty Offer | Laurette` : 'Exclusive Value Package | Laurette Store',
  description: () => currentPackage.value ? `${currentPackage.value.description || currentPackage.value.name}. Discover exclusive benefits and savings on Laurette premium packages.` : 'Explore custom skincare and beauty package savings available at Laurette Store.',
  ogTitle: () => currentPackage.value ? `${currentPackage.value.name} - Bundle Deal` : 'Exclusive Value Package | Laurette Store',
  ogDescription: () => currentPackage.value ? currentPackage.value.description : 'Get premium package savings customized entirely to your beauty routine.',
  ogImage: () => currentPackage.value?.image || '/images/packages-og-banner.jpg',
  twitterCard: 'summary_large_image',
  keywords: () => {
    if (!currentPackage.value) return 'beauty offers, skincare packages, bundle discounts Egypt';
    return `${currentPackage.value.name.toLowerCase()}, ${currentPackage.value.category || 'packages'}, beauty bundle Egypt, laurette exclusive offer`;
  }
});
</script>

<style scoped>
/* إضافة نمط سلس للـ Tabs والمعرض لمنع الـ layout shift */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>