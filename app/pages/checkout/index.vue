<template>
  <main class="min-h-screen bg-background font-sans pt-36 pb-20 lg:pt-44" dir="ltr">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <!-- شاشة نجاح الطلب -->
      <div v-if="isOrderPlaced" class="text-center py-24 bg-white rounded-2xl border border-outline/50 max-w-2xl mx-auto shadow-sm p-8 animate-fade-in">
        <div class="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
          <Icon name="heroicons:check-circle" class="w-12 h-12" />
        </div>
        <h2 class="text-3xl font-serif text-text mb-2">Thank You For Your Order!</h2>
        <p class="text-sm text-primary font-semibold mb-4">Your Order ID: #LR-{{ orderNumber }}</p>
        <p class="text-muted text-sm max-w-sm mx-auto mb-8">
          We have received your pristine beauty request. Your order is registered in our dashboard and our team will contact you shortly.
        </p>
        <NuxtLink 
          to="/" 
          class="inline-flex bg-dark hover:bg-primary text-white font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full shadow-lg hover:shadow-primary/20 transition-all duration-300"
        >
          Back To Home
        </NuxtLink>
      </div>

      <!-- فورمة إدخال البيانات ومراجعة السلة -->
      <div v-else-if="cart.length > 0" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div class="lg:col-span-7 space-y-6">
          <div class="bg-white rounded-2xl border border-outline/50 shadow-sm p-6 md:p-8">
            <h2 class="text-2xl font-serif text-text mb-6 pb-3 border-b border-outline/50 flex items-center gap-2">
              <Icon name="heroicons:truck" class="w-6 h-6 text-primary" />
              Shipping & Delivery Information
            </h2>
            
            <form @submit.prevent="handlePlaceOrder" class="space-y-5">
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-text uppercase tracking-wider block">Full Name *</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  required
                  placeholder="Enter your first and last name"
                  class="w-full rounded-xl py-3 px-4 border border-outline focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm"
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-text uppercase tracking-wider block">Phone Number *</label>
                  <input 
                    v-model="form.phone" 
                    type="tel" 
                    required
                    placeholder="e.g., 01xxxxxxxxx"
                    class="w-full rounded-xl py-3 px-4 border border-outline focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-text uppercase tracking-wider block">Email Address *</label>
                  <input 
                    v-model="form.email" 
                    type="email" 
                    required
                    placeholder="name@example.com"
                    class="w-full rounded-xl py-3 px-4 border border-outline focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="sm:col-span-1 space-y-1.5">
                  <label class="text-xs font-bold text-text uppercase tracking-wider block">Region / City *</label>
                  <input 
                    v-model="form.region" 
                    type="text" 
                    required
                    placeholder="e.g., New Cairo, Maadi"
                    class="w-full rounded-xl py-3 px-4 border border-outline focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm"
                  />
                </div>
                <div class="sm:col-span-2 space-y-1.5">
                  <label class="text-xs font-bold text-text uppercase tracking-wider block">Detailed Address *</label>
                  <input 
                    v-model="form.address" 
                    type="text" 
                    required
                    placeholder="Street name, Building No, Apartment No"
                    class="w-full rounded-xl py-3 px-4 border border-outline focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div class="space-y-3 pt-4 border-t border-outline/50">
                <label class="text-xs font-bold text-text uppercase tracking-wider block mb-2">Select Payment Method *</label>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label 
                    class="border rounded-2xl p-4 flex items-start gap-3 cursor-pointer transition-all shadow-sm select-none"
                    :class="form.paymentMethod === 'cod' ? 'border-primary bg-primary/5 ring-2 ring-primary/10' : 'border-outline hover:border-gray-400 bg-white'"
                  >
                    <input 
                      type="radio" 
                      v-model="form.paymentMethod" 
                      value="cod" 
                      class="mt-1 accent-primary"
                    />
                    <div class="space-y-0.5">
                      <span class="text-sm font-bold text-text block">Cash on Delivery (COD)</span>
                      <span class="text-xs text-muted">Pay inside Egypt upon order arrival.</span>
                    </div>
                  </label>

                  <label 
                    class="border rounded-2xl p-4 flex items-start gap-3 cursor-pointer transition-all shadow-sm select-none"
                    :class="form.paymentMethod === 'transfer' ? 'border-primary bg-primary/5 ring-2 ring-primary/10' : 'border-outline hover:border-gray-400 bg-white'"
                  >
                    <input 
                      type="radio" 
                      v-model="form.paymentMethod" 
                      value="transfer" 
                      class="mt-1 accent-primary"
                    />
                    <div class="space-y-0.5">
                      <span class="text-sm font-bold text-text block">Bank / Wallet Transfer</span>
                      <span class="text-xs text-muted">InstaPay, Vodafone Cash.</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- قسم بيانات التحويل البنكي والـ Screenshot -->
              <div v-if="form.paymentMethod === 'transfer'" class="p-5 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-4 animate-fade-in text-sm text-amber-900">
                <div class="leading-relaxed">
                  <p class="font-bold mb-1">📌 Bank Transfer Instructions:</p>
                  <p>Please send the final total amount to our InstaPay Address: <span class="font-mono font-bold select-all text-primary">laurette@instapay</span> or via Vodafone Cash to: <span class="font-mono font-bold select-all text-primary">010xxxxxxx</span>.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-amber-200/60">
                  <div class="space-y-1.5">
                    <label class="text-xs font-bold uppercase tracking-wider block text-amber-950">Transfer Time *</label>
                    <input 
                      v-model="form.transferTime"
                      type="datetime-local"
                      :required="form.paymentMethod === 'transfer'"
                      class="w-full rounded-xl py-2.5 px-3 border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs text-text"
                    />
                  </div>

                  <div class="space-y-1.5">
                    <label class="text-xs font-bold uppercase tracking-wider block text-amber-950">Upload Receipt Screenshot *</label>
                    <input 
                      type="file"
                      accept="image/*"
                      :required="form.paymentMethod === 'transfer'"
                      @change="handleFileChange"
                      class="w-full text-xs text-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-100 file:text-amber-900 hover:file:bg-amber-200 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-dark hover:bg-primary disabled:bg-gray-400 text-white font-bold text-sm uppercase tracking-widest py-4 rounded-full shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 mt-6 active:scale-95"
              >
                <Icon v-if="isSubmitting" name="svg-spinners:ring-resize" class="w-4 h-4 animate-spin" />
                <span v-else>Confirm & Place Order ({{ totalAmount }} EGP)</span>
              </button>
            </form>
          </div>
        </div>

        <div class="lg:col-span-5 space-y-4 sticky top-40">
          <div class="bg-white rounded-2xl border border-outline/50 shadow-sm p-6 space-y-4">
            <h3 class="text-lg font-bold text-text border-b border-outline/50 pb-3">Review Your Bag</h3>
            
            <div class="max-h-48 overflow-y-auto space-y-3 pr-1">
              <div v-for="item in cart" :key="item.id" class="flex items-center gap-3 justify-between text-xs">
                <div class="flex items-center gap-3 min-w-0">
                  <img :src="item.image || item.image_url" :alt="item.name || item.title" class="w-10 h-10 object-contain border border-outline/30 rounded-lg p-1 bg-gray-50 flex-shrink-0" />
                  <div class="min-w-0">
                    <p class="font-semibold text-text truncate max-w-[180px]">{{ item.name || item.title }}</p>
                    <p class="text-muted">Qty: {{ item.quantity }}</p>
                  </div>
                </div>
                <span class="font-bold text-text whitespace-nowrap">{{ item.price * item.quantity }} EGP</span>
              </div>
            </div>

            <div class="border-t border-outline/50 pt-4 space-y-2.5 text-sm">
              <div class="flex justify-between text-muted">
                <span>Items Subtotal</span>
                <span class="font-semibold text-text">{{ subtotal }} EGP</span>
              </div>
              <div class="flex justify-between text-muted">
                <span>Shipping & Handling</span>
                <span class="font-semibold text-text">{{ shippingFee }} EGP</span>
              </div>
              <hr class="border-outline/30" />
              <div class="flex justify-between text-base font-bold text-text">
                <span>Grand Total</span>
                <span class="text-xl text-primary">{{ totalAmount }} EGP</span>
              </div>
            </div>
          </div>

          <NuxtLink to="/cart" class="text-xs font-bold text-muted/70 hover:text-primary transition-colors flex items-center justify-center gap-1 uppercase tracking-wider">
            <Icon name="heroicons:arrow-left" class="w-3 h-3" /> Edit Items inside Bag
          </NuxtLink>
        </div>

      </div>

      <div v-else class="text-center py-24 bg-white rounded-2xl border border-outline/50 max-w-2xl mx-auto p-8 shadow-sm">
        <h2 class="text-2xl font-serif text-text mb-4">No Items To Checkout</h2>
        <NuxtLink to="/products" class="inline-flex bg-dark text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-full">
          Shop Our Collections
        </NuxtLink>
      </div>

    </div>
  </main>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useState, useHead, useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()

const cart = useState('cart', () => []);
const shippingFee = ref(50);
const isSubmitting = ref(false);
const isOrderPlaced = ref(false);
const orderNumber = ref('');
const selectedFile = ref(null);

const form = reactive({
  name: '',
  phone: '',
  email: '',
  region: '',
  address: '',
  paymentMethod: 'cod',
  transferTime: ''
});

const subtotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const totalAmount = computed(() => {
  return subtotal.value > 0 ? subtotal.value + shippingFee.value : 0;
});

// إجمالي عدد القطع المطلوبة بالسلة لعمود required_pieces
const totalPieces = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

// تجميع أسماء المنتجات لعمود product_line
const productLineSummary = computed(() => {
  return cart.value.map(item => `${item.name || item.title} (x${item.quantity})`).join(', ');
});

// التقاط الملف المرفوع عند التغيير
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
  }
};

// الدالة المسؤولة عن رفع الإيصال وجلب الرابط العام له
const uploadReceipt = async (fileName) => {
  if (!selectedFile.value) return null;
  
  const fileExt = selectedFile.value.name.split('.').pop();
  const filePath = `${fileName}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('receipts')
    .upload(filePath, selectedFile.value);

  if (uploadError) {
    throw uploadError;
  }

  // جلب الرابط العام المباشر للملف المرفوع
  const { data } = supabase.storage.from('receipts').getPublicUrl(filePath);
  return data?.publicUrl || null;
};

// دالة تأكيد وإنشاء الطلب النهائي وربطه بـ Supabase
const handlePlaceOrder = async () => {
  isSubmitting.value = true;
  const generatedOrderNum = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    let receiptUrl = null;

    // إذا كان نوع الدفع تحويل، نقوم برفع الـ Screenshot أولاً
    if (form.paymentMethod === 'transfer' && selectedFile.value) {
      receiptUrl = await uploadReceipt(`receipt_${generatedOrderNum}_${Date.now()}`);
    }

    // بناء كائن البيانات تماماً مثل أعمدة جدول orders الخاص بك
    const orderData = {
      order_number: `LR-${generatedOrderNum}`,
      customer_name: form.name,
      customer_phone: form.phone,
      customer_avatar: null, // يمكن ربطه بصورة العميل لاحقاً إن وجد نظام مستخدمين
      product_line: productLineSummary.value,
      required_pieces: totalPieces.value,
      amount: totalAmount.value,
      status: 'pending', // الحالة الافتراضية للطلب عند وصوله للداشبورد
      payment_receipt_url: receiptUrl // رابط الإيصال المرفوع أو null في حالة الـ COD
    };

    // إدخال الصف الجديد في جدول orders
    const { error } = await supabase
      .from('orders')
      .insert([orderData]);

    if (error) throw error;

    // نجاح العملية: تحديث الواجهة وتصفير السلة
    orderNumber.value = generatedOrderNum;
    isOrderPlaced.value = true;
    cart.value = [];
    localStorage.removeItem('laurette_cart'); // حذف السلة من الكاش المحلى أيضاً

  } catch (err) {
    console.error('Error placing order:', err);
    alert('An error occurred while finalizing your order. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};

useHead({
  title: 'Secure Checkout | Laurette Store'
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>