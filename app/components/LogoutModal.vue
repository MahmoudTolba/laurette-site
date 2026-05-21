<template>
    <Transition name="modal-fade">
      <div v-if="isOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <!-- الخلفية المضببة المعتمة -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')"></div>
        
        <!-- صندوق الموديول -->
        <div class="relative bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl transform transition-all border border-outline/30" dir="rtl">
          <!-- أيقونة التحذير -->
          <div class="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
            <Icon name="uil:exclamation-triangle" class="w-8 h-8" />
          </div>
          
          <!-- النصوص -->
          <h3 class="text-lg font-bold text-text mb-2">تأكيد تسجيل الخروج</h3>
          <p class="text-sm text-muted mb-6">هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟</p>
          
          <!-- الأزرار -->
          <div class="flex items-center gap-3">
            <button 
              @click="$emit('confirm')" 
              class="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-red-500/10 text-sm"
            >
              تأكيد الخروج
            </button>
            <button 
              @click="$emit('close')" 
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-text font-bold py-3 px-4 rounded-xl transition-colors text-sm"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  defineProps({
    isOpen: {
      type: Boolean,
      required: true
    }
  })
  
  defineEmits(['close', 'confirm'])
  </script>
  
  <style scoped>
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: all 0.3s ease;
  }
  
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }
  
  .modal-fade-enter-from .relative,
  .modal-fade-leave-to .relative {
    transform: scale(0.9) translateY(10px);
  }
  </style>