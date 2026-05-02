<template>
  <div class="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
    <!-- Chat Window -->
    <div v-if="isOpen" class="w-[350px] h-[550px] bg-white rounded-lg shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-slide-up origin-bottom-right">
      <!-- Header -->
      <div class="bg-brand-charcoal p-6 text-white flex justify-between items-center shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center font-bold text-xs ">A</div>
          <div>
            <h4 class="text-xs font-bold  tracking-widest">Adaobi Support</h4>
            <p class="text-[8px] text-emerald-400 font-bold  tracking-widest">• Online</p>
          </div>
        </div>
        <button @click="isOpen = false" class="text-white/50 hover:text-white transition-colors">
          <LucideX :size="18" />
        </button>
      </div>

      <!-- Initial Info Form -->
      <div v-if="!isInitiated" class="flex-grow flex flex-col items-center justify-center p-8 space-y-6 text-center">
        <div class="space-y-2">
          <h3 class="text-sm font-bold  tracking-widest text-brand-charcoal">Begin Conversation</h3>
          <p class="text-[10px] text-brand-muted  tracking-widest">Please provide your details so we can best assist you.</p>
        </div>
        <div class="w-full space-y-4">
          <div class="space-y-1 text-left">
            <label class="text-[9px] font-bold  tracking-widest text-gray-400">Full Name</label>
            <input v-model="userForm.name" type="text" placeholder="e.g. Grace Jones" class="w-full bg-gray-50 border-b border-gray-100 py-3 px-4 outline-none focus:border-brand-gold text-xs transition-all" />
          </div>
          <div class="space-y-1 text-left">
            <label class="text-[9px] font-bold  tracking-widest text-gray-400">Email Address</label>
            <input v-model="userForm.email" type="email" placeholder="e.g. grace@gmail.com" class="w-full bg-gray-50 border-b border-gray-100 py-3 px-4 outline-none focus:border-brand-gold text-xs transition-all" />
          </div>
          <button @click="initiateChat" :disabled="!userForm.name || !userForm.email" class="w-full bg-brand-charcoal text-white py-4 text-[10px] font-bold  tracking-[0.2em] hover:bg-brand-gold transition-all disabled:opacity-50">
            Start Chat
          </button>
        </div>
      </div>

      <!-- Active Chat Messages -->
      <template v-else>
        <div class="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50/50" ref="messageContainer">
          <div v-for="(msg, i) in messages" :key="i" 
               :class="msg.senderType === 'USER' ? 'justify-end' : 'justify-start'"
               class="flex">
            <div :class="msg.senderType === 'USER' ? 'bg-brand-gold text-white' : 'bg-white border border-gray-100 text-brand-charcoal'"
                 class="max-w-[80%] p-3 rounded-sm shadow-sm text-[11px] leading-relaxed relative">
              <p>{{ msg.message }}</p>
              <span class="text-[7px] opacity-60 absolute bottom-1 right-2">{{ new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-gray-100 flex gap-2 shrink-0">
          <input v-model="newMessage" @keyup.enter="sendMessage" type="text" placeholder="Type a message..." class="flex-grow bg-gray-50 border-none px-4 py-2 rounded-sm outline-none text-xs focus:bg-white transition-all" />
          <button @click="sendMessage" class="bg-brand-gold text-white p-2 rounded-sm hover:scale-110 transition-transform">
            <LucideSend :size="16" />
          </button>
        </div>
      </template>
    </div>

    <!-- Toggle Button -->
    <button @click="toggleChat" class="w-14 h-14 bg-brand-gold text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:bg-brand-charcoal transition-all duration-300">
      <LucideMessageSquare v-if="!isOpen" :size="24" />
      <LucideX v-else :size="24" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { LucideMessageSquare, LucideX, LucideSend } from 'lucide-vue-next';
import { io, Socket } from 'socket.io-client';

const isOpen = ref(false);
const isInitiated = ref(false);
const newMessage = ref('');
const messages = ref<any[]>([]);
const userForm = ref({ name: '', email: '' });
const roomId = ref('');
const messageContainer = ref<HTMLElement | null>(null);

let socket: Socket;

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && isInitiated.value) {
    scrollToBottom();
  }
};

const initiateChat = () => {
  if (!userForm.value.name || !userForm.value.email) return;
  
  // Use email as roomId for persistent history
  roomId.value = `room_${userForm.value.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
  
  // Initialize socket
  socket = io('http://localhost:4000');
  
  socket.on('connect', () => {
    socket.emit('joinRoom', roomId.value);
    isInitiated.value = true;
    localStorage.setItem('dobi_chat_user', JSON.stringify(userForm.value));
    fetchHistory();
  });

  socket.on('message', (msg: any) => {
    messages.value.push(msg);
    scrollToBottom();
  });
};

const fetchHistory = async () => {
  try {
    const { fetchApi } = useApiFactory();
    const data = await fetchApi(`/chat/history/${roomId.value}`);
    messages.value = data;
    scrollToBottom();
  } catch (e) {
    console.error('History fetch failed', e);
  }
};

const sendMessage = () => {
  if (!newMessage.value.trim() || !socket) return;
  
  const payload = {
    userName: userForm.value.name,
    userEmail: userForm.value.email,
    message: newMessage.value,
    roomId: roomId.value,
    senderType: 'USER',
    createdAt: new Date()
  };

  socket.emit('sendMessage', payload);
  newMessage.value = '';
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
};

onMounted(() => {
  const savedUser = localStorage.getItem('dobi_chat_user');
  if (savedUser) {
    userForm.value = JSON.parse(savedUser);
    initiateChat();
  }
});
</script>

<style scoped>
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-slide-up {
  animation: slide-up 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
</style>


<style scoped>
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-slide-up {
  animation: slide-up 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
</style>
