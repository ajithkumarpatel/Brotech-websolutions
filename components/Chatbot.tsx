import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, X, Send, Trash2 } from 'lucide-react';
// Fix: Use static import for GoogleGenAI and type-only import for Chat, and remove prohibited import type for GoogleGenAI.
import { GoogleGenAI } from '@google/genai';
import type { Chat } from '@google/genai';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const getContextualWelcomeMessage = (pathname: string): Message => {
    let text = "Hello! I'm Tech Bro from BroTech Web Solutions. We specialize in web development, AI, and cybersecurity. How can I assist you today?";
    
    if (pathname.includes('/pricing')) {
        text = "Hey! Checking out our plans? I can help you pick the perfect one or break down the features. What's on your mind?";
    } else if (pathname.includes('/services')) {
        text = "Exploring our services? Awesome! From AI chatbots to cybersecurity, I can give you the full scoop. Which service are you curious about?";
    } else if (pathname.includes('/portfolio')) {
        text = "Cool projects, right? If a particular one catches your eye, let me know. We can build something just as awesome for you.";
    }

    return { text, sender: 'bot' };
};


const quickReplies = [
    "What services do you offer?",
    "Tell me about your portfolio",
    "How can I get a quote?"
];

const TypingIndicator = () => (
    <div className="flex mb-3 justify-start animate-[fadeInUp_0.4s_ease-out]">
        <div className="rounded-lg px-3 py-2 bg-gray-200 dark:bg-gray-700">
            <div className="flex items-center justify-center gap-1 p-1">
                <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></span>
            </div>
        </div>
    </div>
);

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const [messages, setMessages] = useState<Message[]>(() => {
      try {
        const savedMessages = localStorage.getItem('chatHistory');
        if (savedMessages) {
            const parsedMessages = JSON.parse(savedMessages);
            if (parsedMessages.length > 0) return parsedMessages;
        }
      } catch (e) {
        console.error("Failed to parse chat history from localStorage", e);
        localStorage.removeItem('chatHistory');
      }
      return [];
  });

  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
        setMessages([getContextualWelcomeMessage(location.pathname)]);
    }
  }, []); // Runs only on initial mount for new sessions

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (messages.length > 1) { // Only save if conversation has started
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
    setShowQuickReplies(messages.length === 1 && messages[0].sender === 'bot');
  }, [messages]);
  
  const initializeBot = () => {
    if (chatRef.current) return;
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are Tech Bro, a friendly, tech-savvy, and proactive sales assistant for BroTech Web Solutions. IMPORTANT: You must detect the user's language and respond in that same language, including slang and colloquialisms, to build rapport. Your primary goal is to convert visitors into customers by engaging them and guiding them to the contact page for a quote. Be knowledgeable about our services: web development (Business, E-commerce, Portfolios), AI Chatbots, Data Dashboards, and Cybersecurity. After answering 2-3 questions, your main objective is to pivot the conversation towards a sale. For example: 'This sounds like a project we'd love to work on. The best next step is to get a custom quote. Shall I guide you to our contact page?' Always be helpful, but remember to drive the conversation towards conversion.",
            },
        });
    } catch (error) {
        console.error("Failed to initialize Gemini AI:", error);
        setMessages(prev => [...prev, { text: "Sorry, the AI assistant is currently unavailable.", sender: 'bot' }]);
    }
  };

  useEffect(() => {
    if (isOpen) {
        initializeBot();
    }
  }, [isOpen]);

  const handleSendMessage = async (messageText: string) => {
    const trimmedInput = messageText.trim();
    if (trimmedInput === '' || isThinking) return;

    setShowQuickReplies(false);
    initializeBot();
    if (!chatRef.current) return;

    const userMessage: Message = { text: trimmedInput, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    try {
        const stream = await chatRef.current.sendMessageStream({ message: trimmedInput });
        
        let botResponseText = '';
        let isFirstChunk = true;

        for await (const chunk of stream) {
            if (isFirstChunk) {
                setIsThinking(false);
                setMessages(prev => [...prev, { text: '', sender: 'bot' }]);
                isFirstChunk = false;
            }
            botResponseText += chunk.text;
            setMessages(prev => {
                const newMessages = [...prev];
                if (newMessages[newMessages.length - 1]?.sender === 'bot') {
                    newMessages[newMessages.length - 1].text = botResponseText;
                }
                return newMessages;
            });
        }
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        const errorMessage: Message = { text: "Sorry, I encountered an error. Please try again.", sender: 'bot' };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsThinking(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value && showQuickReplies) {
        setShowQuickReplies(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };
  
  const handleClearHistory = () => {
    localStorage.removeItem('chatHistory');
    setMessages([getContextualWelcomeMessage(location.pathname)]);
    chatRef.current = null;
    if (isOpen) {
        initializeBot();
    }
  };


  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-hover transition-all duration-300 z-40 animate-pulse transform active:scale-90"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      <div className={`fixed bottom-24 left-8 w-80 h-96 bg-white dark:bg-dark-card rounded-lg shadow-2xl z-50 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <div className="flex flex-col h-full">
          <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-dark-bg border-b dark:border-gray-700 rounded-t-lg">
            <h3 className="font-bold text-gray-800 dark:text-white">BroTech Assistant</h3>
            <div className="flex items-center gap-2">
                <button onClick={handleClearHistory} className="text-gray-500 hover:text-gray-800 dark:hover:text-white" aria-label="Clear chat history">
                    <Trash2 size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white" aria-label="Close chat">
                    <X size={20} />
                </button>
            </div>
          </header>

          <main className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeInUp_0.4s_ease-out]`}>
                <div className={`rounded-lg px-3 py-2 max-w-[85%] break-words ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}>
                    <span className="whitespace-pre-wrap">{msg.text}</span>
                </div>
              </div>
            ))}
            
            {isThinking && <TypingIndicator />}

            {showQuickReplies && (
                <div className="flex flex-col items-start gap-2 mt-4 animate-[fadeInUp_0.4s_ease-out]">
                    {quickReplies.map((reply, index) => (
                        <button key={index} onClick={() => handleSendMessage(reply)} disabled={isThinking} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-full text-sm hover:bg-primary/20 dark:hover:bg-primary/30 transition-all transform active:scale-95">
                            {reply}
                        </button>
                    ))}
                </div>
            )}
            <div ref={chatEndRef} />
          </main>

          <form onSubmit={handleFormSubmit} className="p-4 border-t dark:border-gray-700 flex">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled={isThinking}
            />
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-hover transition-colors disabled:bg-primary/50 transform active:scale-95" disabled={isThinking || !inputValue.trim()}>
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;