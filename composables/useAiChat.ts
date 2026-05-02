export const useAiChat = () => {
  const messages = useState('ai_messages', () => [
    { role: 'assistant', content: 'Hello! I am your Adaobi Cakes assistant. How can I help you today?' }
  ]);
  const loading = ref(false);

  const sendMessage = async (prompt: string) => {
    loading.value = true;
    messages.value.push({ role: 'user', content: prompt });
    
    try {
      // Logic for AI backend integration (OpenAI/Gemini/etc.)
      // For now, simple mock response
      setTimeout(() => {
        messages.value.push({ 
          role: 'assistant', 
          content: `That's a great question about our cakes! I recommend our signature ${prompt.toLowerCase().includes('chocolate') ? 'Belgian Truffle' : 'Velvet Rose Tier'}. Would you like to see our pricing?` 
        });
        loading.value = false;
      }, 1500);
    } catch (error) {
      console.error('AI Error:', error);
      loading.value = false;
    }
  };

  return {
    messages,
    loading,
    sendMessage
  };
};
