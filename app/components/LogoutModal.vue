<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')"></div>
      
      <div class="relative bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl transform transition-all border border-outline/30" dir="rtl">
        <div class="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <Icon name="uil:exclamation-triangle" class="w-8 h-8" />
        </div>
        
        <h3 class="text-lg font-bold text-text mb-2">تأكيد تسجيل الخروج</h3>
        <p class="text-sm text-muted mb-6">هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟</p>
        
        <div class="flex items-center gap-3">
          <button 
            @click="handleLogoutConfirm" 
            :disabled="isLoggingOut"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-red-500/10 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoggingOut">جاري الخروج...</span>
            <span v-else>تأكيد الخروج</span>
          </button>
          <button 
            @click="$emit('close')" 
            :disabled="isLoggingOut"
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-text font-bold py-3 px-4 rounded-xl transition-colors text-sm disabled:opacity-50"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'confirm'])
const auth = useAuthStore()
const isLoggingOut = ref(false)

// دالة معالجة تسجيل الخروج الفعلي وربطها بالـ Store وسوبابيز
const handleLogoutConfirm = async () => {
  try {
    isLoggingOut.value = true
    
    // 1. استدعاء أكشن تسجيل الخروج من الاستور (اللي بيمسح الـ session من سوبابيز والـ cookies)
    await auth.logout()
    
    // 2. إرسال حدث التأكيد للأب (لو محتاج تعمل حاجة إضافية في الـ Parent component)
    emit('confirm')
  } catch (error) {
    console.error('حدث خطأ أثناء تسجيل الخروج:', error)
  } finally {
    isLoggingOut.value = false
    emit('close') // قفل الموديول في كل الأحوال
  }
}
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