import React, { useState } from 'react';
import { Bot, X, Send, ChevronDown, HelpCircle, GitBranch } from 'lucide-react';

const playbooks = [
  {
    keywords: ['login', 'sign in', 'password', 'पासवर्ड'],
    answers: {
      hi: {
        text: 'लॉगिन की समस्या के लिए यह प्रक्रिया अपनाएँ:',
        flow: [
          '1. क्या ईमेल रजिस्टर्ड है? → नहीं: पहले अकाउंट रजिस्टर/प्रोविजन करवाएँ।',
          '2. सही पोर्टल और भूमिका चुनें।',
          '3. पासवर्ड दोबारा डालें → गलत हो तो रीसेट करें या Admin से मदद लें।',
          '4. CAPTCHA मिलाएँ → समस्या हो तो refresh करके फिर कोशिश करें।',
          '5. फिर भी समस्या हो? Admin से अकाउंट स्टेटस verify करवाएँ।'
        ]
      },
      en: {
        text: 'Follow these steps to resolve your login issue:',
        flow: [
          '1. Is your email registered? → If not, register or provision the account first.',
          '2. Select the correct portal and role.',
          '3. Re-enter your password → reset it or contact an Admin if it is incorrect.',
          '4. Match the CAPTCHA → refresh and retry if it does not match.',
          '5. Still having trouble? Ask an Admin to verify your account status.'
        ]
      }
    }
  },
  {
    keywords: ['challenge', 'tender', 'apply', 'proposal'],
    answers: {
      hi: {
        text: 'चैलेंज के लिए आवेदन करने के चरण:\n1. Marketplace में चैलेंज खोलें।\n2. विवरण, पात्रता और समय-सीमा पढ़ें।\n3. Apply Now चुनें।\n4. तकनीकी और व्यावसायिक प्रस्ताव पूरा करके जमा करें।'
      },
      en: {
        text: 'Steps to apply for a challenge:\n1. Open the challenge in the Marketplace.\n2. Review the details, eligibility, and deadline.\n3. Select Apply Now.\n4. Complete and submit the technical and commercial proposal.'
      }
    }
  },
  {
    keywords: ['profile', 'name', 'organization', 'प्रोफाइल'],
    answers: {
      hi: {
        text: 'प्रोफ़ाइल देखने या अपडेट करने के चरण:\n1. Sidebar से My Profile/Profile खोलें।\n2. अपनी रजिस्टर्ड जानकारी जाँचें।\n3. जानकारी गलत हो तो Admin या अधिकृत पोर्टल ओनर से संपर्क करें।'
      },
      en: {
        text: 'Steps to view or update your profile:\n1. Open My Profile/Profile from the sidebar.\n2. Verify your registered details.\n3. Contact an Admin or authorized portal owner if any detail is incorrect.'
      }
    }
  }
];

const faqs = [
  'Login mein problem aa rahi hai',
  'Challenge ke liye apply kaise karun?',
  'Mera profile kahan milega?',
  'AI match score kaise calculate hota hai?'
];

const hindiMarkers = [
  'मेरा', 'मेरी', 'मेरे', 'कैसे', 'कहाँ', 'क्या', 'चाहिए', 'करना', 'है',
  'नहीं', 'समस्या', 'कृपया', 'लॉगिन', 'प्रोफाइल', 'चैलेंज', 'पासवर्ड',
  'mera', 'meri', 'mere', 'kaise', 'kahan', 'kya', 'chahiye', 'karna',
  'hai', 'nahi', 'samasya', 'kripya', 'ke liye', 'mein', 'mujhe', 'bataiye'
];

const detectLanguage = (question) => {
  const normalized = question.toLowerCase();
  const hasDevanagari = /[\u0900-\u097f]/u.test(question);
  const hasHindiMarker = hindiMarkers.some(marker => normalized.includes(marker));
  return hasDevanagari || hasHindiMarker ? 'hi' : 'en';
};

const getAnswer = (question) => {
  const normalized = question.toLowerCase();
  const language = detectLanguage(question);
  const match = playbooks.find(playbook => playbook.keywords.some(keyword => normalized.includes(keyword)));
  if (match) return { ...match.answers[language], language };

  return {
    language,
    text: language === 'hi'
      ? 'मैं आपको चरण-दर-चरण सहायता दे सकता हूँ। Login, challenge apply, proposal, profile या notification के बारे में पूछें।'
      : 'I can help you step by step. Ask about login, applying for a challenge, proposals, profiles, or notifications.'
  };
};

export default function SupportChatbot() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I am the StartupSetu Support Bot. How can I help you?' }
  ]);

  const askQuestion = (text) => {
    if (!text.trim() || isTyping) return;
    const answer = getAnswer(text);
    setMessages(previous => [...previous, { from: 'user', text }]);
    setQuestion('');
    setIsTyping(true);
    window.setTimeout(() => {
      setMessages(previous => [...previous, { from: 'bot', text: answer.text, flow: answer.flow }]);
      setIsTyping(false);
    }, 1000);
  };

  const ask = (event) => {
    event.preventDefault();
    askQuestion(question);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-slate-900 px-4 py-3 text-white">
            <div className="flex items-center gap-2 text-sm font-bold"><Bot className="h-4 w-4 text-cyan-300" /> Support Bot</div>
            <button onClick={() => setOpen(false)} aria-label="Close support chatbot"><X className="h-4 w-4" /></button>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-3">
            <div className="space-y-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400"><HelpCircle className="h-3 w-3" /> FAQs</div>
              <div className="flex flex-wrap gap-1.5">
                {faqs.map(faq => <button key={faq} type="button" onClick={() => askQuestion(faq)} className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 hover:bg-blue-100">{faq}</button>)}
              </div>
            </div>
            {messages.map((message, index) => (
              <div key={`${message.from}-${index}`} className={`rounded-xl px-3 py-2 text-xs leading-relaxed ${message.from === 'user' ? 'ml-8 bg-blue-600 text-white' : 'mr-8 bg-slate-100 text-slate-700'}`}>
                <div className="whitespace-pre-line">{message.text}</div>
                {message.flow && (
                  <div className="mt-2 space-y-1.5 border-l-2 border-blue-400 pl-2">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-blue-700"><GitBranch className="h-3 w-3" /> Login troubleshooting flow</div>
                    {message.flow.map((step, stepIndex) => <div key={stepIndex} className="rounded bg-white/70 px-2 py-1 text-[10px]">{step}</div>)}
                  </div>
                )}
              </div>
            ))}
            {isTyping && <div className="mr-8 flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:120ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:240ms]" />
            </div>}
          </div>
          <form onSubmit={ask} className="flex gap-2 border-t border-slate-100 p-3">
            <input value={question} onChange={event => setQuestion(event.target.value)} placeholder="Apna issue type karein..." className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" aria-label="Send question" className="rounded-lg bg-blue-600 p-2 text-white"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen(previous => !previous)} className="flex items-center gap-2 rounded-full bg-blue-700 px-4 py-3 text-xs font-bold text-white shadow-lg hover:bg-blue-800">
        <Bot className="h-5 w-5" /> Help
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
