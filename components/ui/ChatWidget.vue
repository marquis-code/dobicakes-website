<template>
 <div class="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
 <!-- Contextual Engagement Tooltip -->
 <div v-if="!isOpen && showTooltip" 
 class="bg-white px-6 py-4 rounded-2xl shadow-2xl border border-slate-100 max-w-[280px] animate-bounce-subtle relative group cursor-pointer"
 @click="toggleChat">
 <p class="text-[11px] font-medium text-slate-600 leading-relaxed italic">
 {{ contextualMessage }}
 </p>
 <div class="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-slate-100"></div>
 <button @click.stop="showTooltip = false" class="absolute -top-2 -left-2 w-5 h-5 bg-slate-900 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
 <LucideX :size="10" />
 </button>
 </div>

 <!-- Main Container -->
 <div v-if="isOpen" 
 :class="[
 'bg-white shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-slide-up origin-bottom-right transition-all duration-500 z-[110]',
 isMobile 
   ? (activeChannel ? 'fixed inset-0 w-full h-full rounded-none' : 'fixed bottom-4 left-4 right-4 w-auto h-auto max-h-[85vh] rounded-[2.5rem]') 
   : 'w-[380px] h-[600px] rounded-3xl'
 ]">
 
 <!-- Engagement Hub (Selection) -->
 <div v-if="!activeChannel" class="flex-grow flex flex-col p-6 md:p-8 space-y-6 md:space-y-8">
 <div class="flex justify-end">
 <button @click="isOpen = false" class="p-2 hover:bg-slate-50 rounded-full transition-colors">
 <LucideX :size="20" class="text-slate-400" />
 </button>
 </div>
 <div class="text-center space-y-2">
 <h3 class="text-2xl md:text-3xl italic text-brand-charcoal">How can we help?</h3>
 <p class="text-[10px] text-slate-400 tracking-widest font-bold uppercase">Select your preferred channel</p>
 </div>

 <div class="space-y-3 pt-2">
 <button @click="activeChannel = 'chat'" class="w-full flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-slate-50 rounded-2xl hover:bg-brand-gold hover:text-white transition-all group shadow-sm hover:shadow-xl">
 <div class="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
 <LucideMessageSquare :size="18" class="text-brand-gold" />
 </div>
 <div class="text-left">
 <p class="text-[13px] md:text-sm font-bold tracking-tight">Live Concierge</p>
 <p class="text-[11px] md:text-sm opacity-60">Chat with our artisans in real-time</p>
 </div>
 </button>

 <a href="https://wa.me/2349000000000" target="_blank" class="w-full flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-slate-50 rounded-2xl hover:bg-[#25D366] hover:text-white transition-all group shadow-sm hover:shadow-xl">
 <div class="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
 <LucideMessageCircle :size="18" class="text-[#25D366]" />
 </div>
 <div class="text-left">
 <p class="text-[13px] md:text-sm font-bold tracking-tight">WhatsApp Business</p>
 <p class="text-[11px] md:text-sm opacity-60">Instant artisanal messaging</p>
 </div>
 </a>

 <a href="tel:+2349000000000" class="w-full flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-slate-50 rounded-2xl hover:bg-slate-900 hover:text-white transition-all group shadow-sm hover:shadow-xl">
 <div class="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
 <LucidePhone :size="18" class="text-slate-900" />
 </div>
 <div class="text-left">
 <p class="text-[13px] md:text-sm font-bold tracking-tight">Direct Call</p>
 <p class="text-[11px] md:text-sm opacity-60">Speak with our master bakers</p>
 </div>
 </a>
 </div>
 </div>

 <!-- Live Chat Channel -->
 <div v-else class="flex flex-col h-full relative">
 <!-- Header -->
 <div class="bg-brand-charcoal p-6 text-white flex justify-between items-center shrink-0">
 <div class="flex items-center gap-4">
 <button @click="activeChannel = null" class="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
 <LucideChevronLeft :size="22" />
 </button>
 <div class="relative">
 <div class="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center font-bold text-sm shadow-lg">A</div>
 <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-brand-charcoal rounded-full"></div>
 </div>
 <div>
 <h4 class="text-sm font-bold tracking-widest ">Live Concierge</h4>
 <p class="text-[9px] text-emerald-400 font-bold tracking-widest animate-pulse">Artisan Online</p>
 </div>
 </div>
 <button @click="isOpen = false" class="p-2 hover:bg-white/10 rounded-full transition-colors">
 <LucideX :size="22" />
 </button>
 </div>

 <!-- Connection State -->
 <div v-if="!isInitiated" class="flex-grow flex flex-col items-center justify-center p-8 space-y-6 text-center bg-slate-50/30">
 <div class="w-20 h-20 bg-white rounded-3xl flex items-center justify-center border border-slate-100">
 <LucideHeart :size="40" class="text-brand-gold" />
 </div>
 <div class="space-y-2">
 <h3 class="text-2xl italic text-brand-charcoal">Let's Get Started</h3>
 <p class="text-[11px] text-brand-muted leading-relaxed px-6">Tell us a bit about yourself so our artisans can help craft your perfect moment.</p>
 </div>
 <div class="w-full space-y-3 px-4">
 <input v-model="userForm.name" type="text" placeholder="Your Name" class="w-full bg-white border border-slate-200 rounded-xl py-4 px-6 outline-none focus:border-brand-gold text-sm transition-all shadow-none" />
 <input v-model="userForm.email" type="email" placeholder="Email Address" class="w-full bg-white border border-slate-200 rounded-xl py-4 px-6 outline-none focus:border-brand-gold text-sm transition-all shadow-none" />
 <button @click="initiateChat" :disabled="!userForm.name || !userForm.email" class="w-full bg-brand-charcoal text-white py-4 rounded-xl text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-gold transition-all disabled:opacity-30 active:scale-95 shadow-none">
 Start Conversing
 </button>
 </div>
 </div>

 <!-- Chat History -->
 <template v-else>
 <div class="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/30 custom-scrollbar" ref="messageContainer">
 <div v-for="(msg, i) in messages" :key="i" 
 :class="msg.senderType === 'USER' ? 'justify-end' : 'justify-start'"
 class="flex group">
 <div :class="[
 'max-w-[85%] rounded-3xl shadow-sm text-sm leading-relaxed relative overflow-hidden transition-all',
 msg.senderType === 'USER' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
 ]">
 <!-- Media Attachment -->
 <div v-if="msg.attachments && Array.isArray(msg.attachments) && msg.attachments.length > 0" class="p-1">
 <img v-for="url in msg.attachments" :key="url" :src="url" class="w-full rounded-2xl object-cover max-h-[300px] cursor-zoom-in" />
 </div>
 <!-- Text Content -->
 <div v-if="msg.message" class="px-5 py-4">
 <p>{{ msg.message }}</p>
 </div>
 <span class="text-[8px] opacity-40 px-5 pb-3 block text-right font-bold tracking-tighter">
 {{ new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
 </span>
 </div>
 </div>
 </div>

 <!-- Pending Media Preview -->
 <div v-if="pendingImage" class="absolute bottom-[80px] left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-brand-gold/30 shadow-2xl animate-slide-up z-20">
 <div class="relative aspect-video rounded-2xl overflow-hidden mb-4">
 <img :src="pendingImage" class="w-full h-full object-cover" />
 <button @click="pendingImage = null; pendingFile = null" class="absolute top-2 right-2 p-1.5 bg-slate-900/50 text-white rounded-full hover:bg-slate-900 transition-colors">
 <LucideX :size="16" />
 </button>
 <div v-if="isUploading" class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
 <div class="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
 </div>
 </div>
 <div class="flex gap-2">
 <input v-model="newMessage" type="text" placeholder="Add a caption..." class="flex-grow bg-slate-50 border-none px-5 py-3 rounded-xl text-xs outline-none focus:bg-white transition-all" />
 <button @click="uploadAndSend" :disabled="isUploading" class="bg-brand-gold text-white p-3 rounded-xl shadow-lg hover:scale-105 transition-all">
 <LucideSend :size="18" />
 </button>
 </div>
 </div>

 <!-- Interaction Area -->
 <div class="p-4 bg-white border-t border-slate-100 flex flex-col gap-3 shrink-0">
 <!-- Emoji Strip (Mobile Friendly) -->
 <div v-if="showEmojiPicker" class="flex gap-4 px-2 py-2 overflow-x-auto no-scrollbar animate-fade-in border-b border-slate-50">
 <button v-for="e in popularEmojis" :key="e" @click="newMessage += e; showEmojiPicker = false" class="text-xl hover:scale-125 transition-transform">{{ e }}</button>
 </div>

 <div class="flex gap-3 items-center">
 <div class="flex gap-2 shrink-0">
 <button @click="showEmojiPicker = !showEmojiPicker" :class="showEmojiPicker ? 'text-brand-gold bg-brand-gold/10' : 'text-slate-400 hover:text-brand-gold'" class="p-2.5 rounded-xl transition-all">
 <LucideSmile :size="22" />
 </button>
 <button @click="$refs.fileInput.click()" class="text-slate-400 hover:text-brand-gold p-2.5 rounded-xl transition-all">
 <LucideImage :size="22" />
 </button>
 <input type="file" ref="fileInput" hidden accept="image/*" @change="handleFileSelect" />
 </div>
 <input 
 v-model="newMessage" 
 @keyup.enter="sendMessage" 
 type="text" 
 placeholder="Express your needs..." 
 class="flex-grow bg-slate-50 border-none px-6 py-3.5 rounded-2xl outline-none text-sm focus:bg-white transition-all shadow-inner" 
 />
 <button @click="sendMessage" class="bg-brand-gold text-white p-4 rounded-2xl hover:scale-110 transition-transform shadow-xl shadow-brand-gold/20 active:scale-95">
 <LucideSend :size="20" />
 </button>
 </div>
 </div>
 </template>
 </div>
 </div>

 <!-- Main Toggle (Desktop Only) -->
 <button v-if="!isOpen || !isMobile" @click="toggleChat" 
 class="w-16 h-16 bg-brand-gold text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-brand-charcoal transition-all duration-500 group relative">
 <div v-if="!isOpen" class="relative">
 <LucideMessageSquare :size="28" />
 <span class="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75"></span>
 <span class="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-sm"></span>
 </div>
 <LucideX v-else :size="28" />
 </button>
 </div>
</template>

<script setup lang="ts">
import { 
 LucideMessageSquare, LucideX, LucideSend, LucideMessageCircle, 
 LucidePhone, LucideChevronLeft, LucideChevronRight, LucideHeart,
 LucideSmile, LucideImage, LucidePaperclip
} from 'lucide-vue-next';
import { io, Socket } from 'socket.io-client';

const route = useRoute();
const { uploadImage } = useCloudinary();
const isOpen = ref(false);
const activeChannel = ref<string | null>(null);
const isInitiated = ref(false);
const showTooltip = ref(true);
const showEmojiPicker = ref(false);
const isUploading = ref(false);
const isMobile = ref(false);

const newMessage = ref('');
const messages = ref<any[]>([]);
const userForm = ref({ name: '', email: '' });
const roomId = ref('');
const pendingImage = ref<string | null>(null);
const pendingFile = ref<File | null>(null);
const messageContainer = ref<HTMLElement | null>(null);

const popularEmojis = ['😊', '🎂', '🧁', '🍰', '❤️', '✨', '😋', '🎉', '🎁', '🙏'];

let socket: Socket;

const checkMobile = () => {
 if (typeof window !== 'undefined') {
 isMobile.value = window.innerWidth < 768;
 }
};

// Smart Contextual Messages
const contextualMessage = computed(() => {
 const path = route.path;
 if (path === '/') return "Finding the perfect cake? We're here to help!";
 if (path.includes('/shop')) return "Ask us about flavors, sizes, or custom orders!";
 if (path.includes('/cart')) return "Ready for your delivery? Any questions before checkout?";
 return "Welcome to Adaobi Cakes! How can our artisans assist you?";
});

const toggleChat = () => {
 isOpen.value = !isOpen.value;
 showTooltip.value = false;
 if (isOpen.value && isInitiated.value) {
 scrollToBottom();
 }
};

const handleFileSelect = (e: any) => {
 const file = e.target.files[0];
 if (file) {
 pendingFile.value = file;
 pendingImage.value = URL.createObjectURL(file);
 activeChannel.value = 'chat';
 isOpen.value = true;
 }
};

const uploadAndSend = async () => {
 if (!pendingFile.value || isUploading.value) return;
 
 if (!isInitiated.value) {
 alert("Please initiate chat first");
 return;
 }

 isUploading.value = true;
 try {
 const url = await uploadImage(pendingFile.value);
 const payload = {
 userName: userForm.value.name,
 userEmail: userForm.value.email,
 message: newMessage.value,
 roomId: roomId.value,
 senderType: 'USER',
 attachments: [url],
 createdAt: new Date()
 };
 socket.emit('sendMessage', payload);
 newMessage.value = '';
 pendingImage.value = null;
 pendingFile.value = null;
 } catch (e) {
 alert("Upload failed. Please try again.");
 } finally {
 isUploading.value = false;
 }
};

const initiateChat = () => {
 if (!userForm.value.name || !userForm.value.email) return;
 roomId.value = `room_${userForm.value.email.replace(/[^a-zA-Z0-9]/g, '_')}`;
 
 socket = io('https://dobicakes-backend.onrender.com'); // Ensure this matches your backend base
 
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
 } catch (e) {}
};

const sendMessage = () => {
 if (!newMessage.value.trim() || !socket) return;
 const payload = {
 userName: userForm.value.name,
 userEmail: userForm.value.email,
 message: newMessage.value,
 roomId: roomId.value,
 senderType: 'USER',
 attachments: [],
 createdAt: new Date()
 };
 socket.emit('sendMessage', payload);
 newMessage.value = '';
 showEmojiPicker.value = false;
};

const scrollToBottom = () => {
 nextTick(() => {
 if (messageContainer.value) {
 messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
 }
 });
};

onMounted(() => {
 checkMobile();
 window.addEventListener('resize', checkMobile);
 
 const savedUser = localStorage.getItem('dobi_chat_user');
 if (savedUser) {
 userForm.value = JSON.parse(savedUser);
 initiateChat();
 }
 
 setTimeout(() => { showTooltip.value = false; }, 15000);
});
</script>

<style scoped>
@keyframes slide-up {
 from { opacity: 0; transform: translateY(20px) scale(0.95); }
 to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes bounce-subtle {
 0%, 100% { transform: translateY(0); }
 50% { transform: translateY(-10px); }
}
@keyframes fade-in {
 from { opacity: 0; }
 to { opacity: 1; }
}
.animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
.animate-bounce-subtle { animation: bounce-subtle 4s ease-in-out infinite; }
.animate-fade-in { animation: fade-in 0.3s ease-out; }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
</style>


