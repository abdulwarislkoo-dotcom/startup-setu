import React, { useState } from 'react';
import Logo from './Logo';
import { 
  Building2, 
  Rocket, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle,
  Check,
  KeyRound,
  RefreshCw,
  Globe,
  Shield,
  HelpCircle,
  Award
} from 'lucide-react';

const hindiTranslations = {
  'भारत सरकार | Government of India': 'भारत सरकार',
  'Ministry of Housing & Urban Affairs & DPIIT Initiative': 'आवास और शहरी कार्य मंत्रालय एवं DPIIT पहल',
  'Accessibility:': 'सुगम्यता:',
  English: 'अंग्रेज़ी',
  Hindi: 'हिंदी',
  'GIGW & SSL SECURE PORTAL': 'GIGW और SSL सुरक्षित पोर्टल',
  'National GovTech Portal': 'राष्ट्रीय GovTech पोर्टल',
  'Discover innovation. Prove impact. Scale what works.': 'नवाचार खोजें। प्रभाव सिद्ध करें। सफल समाधानों का विस्तार करें।',
  'GovTech Innovation Standard': 'GovTech नवाचार मानक',
  'GeM helps government buy.': 'GeM सरकार को खरीदारी में मदद करता है।',
  'StartupSetu helps government discover, test, prove, and decide before buying.': 'StartupSetu सरकार को खरीद से पहले समाधान खोजने, परखने, सिद्ध करने और निर्णय लेने में मदद करता है।',
  'Select Portal Access Level': 'पोर्टल एक्सेस स्तर चुनें',
  'Choose Your Designated Portal': 'अपना निर्धारित पोर्टल चुनें',
  'StartupSetu operates under strict Role-Based Access Control (RBAC). Please select your official role portal below to proceed with single sign-on authentication.': 'StartupSetu सख्त भूमिका-आधारित एक्सेस नियंत्रण (RBAC) के अंतर्गत संचालित है। सिंगल साइन-ऑन प्रमाणीकरण के लिए नीचे अपना आधिकारिक भूमिका पोर्टल चुनें।',
  'Government Officer': 'सरकारी अधिकारी',
  Startup: 'स्टार्टअप',
  Evaluator: 'मूल्यांकनकर्ता',
  Validator: 'सत्यापनकर्ता',
  Admin: 'प्रशासक',
  Portal: 'पोर्टल',
  'Authorized portal for Central Ministries, State Departments & Municipal Corporations (ULBs).': 'केंद्रीय मंत्रालयों, राज्य विभागों और नगर निकायों (ULBs) के लिए अधिकृत पोर्टल।',
  'Authorized portal for DPIIT Recognized Startups & GovTech Innovators.': 'DPIIT मान्यता प्राप्त स्टार्टअप और GovTech नवप्रवर्तकों के लिए अधिकृत पोर्टल।',
  'Authorized portal for Technical Screening Committees & Subject Matter Experts.': 'तकनीकी स्क्रीनिंग समितियों और विषय विशेषज्ञों के लिए अधिकृत पोर्टल।',
  'Authorized portal for Quality Council of India (QCI), STQC & Accredited Testing Labs.': 'भारतीय गुणवत्ता परिषद (QCI), STQC और मान्यता प्राप्त परीक्षण प्रयोगशालाओं के लिए अधिकृत पोर्टल।',
  'National Portal Operations & System Administration.': 'राष्ट्रीय पोर्टल संचालन और सिस्टम प्रशासन।',
  'Create & publish government challenges': 'सरकारी चुनौतियां बनाएं और प्रकाशित करें',
  'Review AI startup matches with explainable scores': 'समझने योग्य स्कोर के साथ AI स्टार्टअप मैच की समीक्षा करें',
  'Monitor controlled pilot performance': 'नियंत्रित पायलट के प्रदर्शन की निगरानी करें',
  'Make evidence-based procurement decisions': 'साक्ष्य-आधारित खरीद निर्णय लें',
  'Discover active government challenges': 'सक्रिय सरकारी चुनौतियां खोजें',
  'Submit technical & commercial proposals': 'तकनीकी और वाणिज्यिक प्रस्ताव जमा करें',
  'Execute small controlled pilots': 'छोटे नियंत्रित पायलट चलाएं',
  'Upload verified telemetry & KPI evidence': 'सत्यापित टेलीमेट्री और KPI साक्ष्य अपलोड करें',
  'Review assigned startup proposals': 'सौंपे गए स्टार्टअप प्रस्तावों की समीक्षा करें',
  'Evaluate technical & financial feasibility': 'तकनीकी और वित्तीय व्यवहार्यता का मूल्यांकन करें',
  'Compare proposal scores side-by-side': 'प्रस्ताव स्कोर की आमने-सामने तुलना करें',
  'Independently verify pilot raw data logs': 'पायलट के कच्चे डेटा लॉग का स्वतंत्र सत्यापन करें',
  'Audit KPI achievement claims': 'KPI उपलब्धि दावों का ऑडिट करें',
  'Issue digital validation sign-off passports': 'डिजिटल सत्यापन साइन-ऑफ पासपोर्ट जारी करें',
  'Manage platform users & organization roles': 'प्लेटफ़ॉर्म उपयोगकर्ताओं और संस्था की भूमिकाएं प्रबंधित करें',
  'Verify DPIIT startup credentials': 'DPIIT स्टार्टअप क्रेडेंशियल सत्यापित करें',
  'Monitor tamper-evident system audit logs': 'छेड़छाड़-साक्ष्य सिस्टम ऑडिट लॉग की निगरानी करें',
  'Enter': 'प्रवेश करें',
  'All authentication sessions are logged in the National Tamper-Evident Audit Trail': 'सभी प्रमाणीकरण सत्र राष्ट्रीय छेड़छाड़-साक्ष्य ऑडिट ट्रेल में दर्ज किए जाते हैं',
  'Change Portal / Role': 'पोर्टल / भूमिका बदलें',
  'Official Portal': 'आधिकारिक पोर्टल',
  'Official SSO Log In': 'आधिकारिक SSO लॉग इन',
  'New Account Registration': 'नया खाता पंजीकरण',
  'Register': 'पंजीकरण करें',
  'Account': 'खाता',
  'Single Sign-On (SSO)': 'सिंगल साइन-ऑन (SSO)',
  'Create your official credentials for': 'इसके लिए अपने आधिकारिक क्रेडेंशियल बनाएं:',
  'Authorized Portal:': 'अधिकृत पोर्टल:',
  'Full Name *': 'पूरा नाम *',
  'Department / Organization': 'विभाग / संस्था',
  'Designation': 'पद',
  'Official Email / User ID *': 'आधिकारिक ईमेल / यूज़र आईडी *',
  'Password *': 'पासवर्ड *',
  'Forgot password?': 'पासवर्ड भूल गए?',
  'Confirm Password *': 'पासवर्ड की पुष्टि करें *',
  'Security CAPTCHA Verification *': 'सुरक्षा CAPTCHA सत्यापन *',
  'Enter CAPTCHA': 'CAPTCHA दर्ज करें',
  'Remember credentials on this browser': 'इस ब्राउज़र पर क्रेडेंशियल याद रखें',
  'Autofill Demo Credentials': 'डेमो क्रेडेंशियल स्वतः भरें',
  'I confirm compliance with DPIIT GovTech Access Standards.': 'मैं DPIIT GovTech एक्सेस मानकों के अनुपालन की पुष्टि करता/करती हूं।',
  'Complete': 'पूरा करें',
  'Log In to': 'लॉग इन करें:',
  Registration: 'पंजीकरण',
  'Active Portal:': 'सक्रिय पोर्टल:',
  'Switch Portal': 'पोर्टल बदलें',
  'Reset Portal Password': 'पोर्टल पासवर्ड रीसेट करें',
  'Password reset link sent to': 'पासवर्ड रीसेट लिंक भेजा गया:',
  'Close Window': 'विंडो बंद करें',
  'Enter your registered official email address to receive a secure password recovery token.': 'सुरक्षित पासवर्ड रिकवरी टोकन प्राप्त करने के लिए अपना पंजीकृत आधिकारिक ईमेल पता दर्ज करें।',
  'Official Email Address': 'आधिकारिक ईमेल पता',
  Cancel: 'रद्द करें',
  'Send Recovery Link': 'रिकवरी लिंक भेजें',
  'StartupSetu Portal': 'StartupSetu पोर्टल',
  'Helpdesk & Support': 'हेल्पडेस्क और सहायता',
  'Compliance & Security': 'अनुपालन और सुरक्षा',
  'Privacy Policy': 'गोपनीयता नीति',
  'Terms of Service': 'सेवा की शर्तें',
  'Audit Trail': 'ऑडिट ट्रेल'
};

export default function LoginPage({ onLoginSuccess, onNavigate, initialMode = 'login' }) {
  const [language, setLanguage] = useState('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // null = Role selection mode, object = Form mode
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regOrg, setRegOrg] = useState('');
  const [regDesignation, setRegDesignation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Security CAPTCHA State
  const [captchaCode, setCaptchaCode] = useState('7X9K2');
  const [userCaptchaInput, setUserCaptchaInput] = useState('7X9K2');
  const t = (text) => language === 'hi' ? (hindiTranslations[text] || text) : text;
  const roleLabel = (role) => t(role);
  const canSelfRegister = selectedRole?.roleName === 'Startup';

  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setUserCaptchaInput(result);
  };

  const userGroups = [
    {
      id: 'officer',
      roleName: 'Government Officer',
      email: 'officer@mohua.gov.in',
      defaultPass: 'officer123',
      targetTab: 'gov-dashboard',
      icon: Building2,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      iconBg: 'bg-blue-700 text-white',
      hoverBorder: 'hover:border-blue-600 hover:shadow-blue-600/10',
      bullets: [
        'Create & publish government challenges',
        'Review AI startup matches with explainable scores',
        'Monitor controlled pilot performance',
        'Make evidence-based procurement decisions'
      ],
      desc: 'Authorized portal for Central Ministries, State Departments & Municipal Corporations (ULBs).',
      dept: 'Ministry of Housing & Urban Affairs (MoHUA)'
    },
    {
      id: 'startup',
      roleName: 'Startup',
      email: 'ananya@ecovision.ai',
      defaultPass: 'startup123',
      targetTab: 'startup-dashboard',
      icon: Rocket,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      iconBg: 'bg-emerald-700 text-white',
      hoverBorder: 'hover:border-emerald-600 hover:shadow-emerald-600/10',
      bullets: [
        'Discover active government challenges',
        'Submit technical & commercial proposals',
        'Execute small controlled pilots',
        'Upload verified telemetry & KPI evidence'
      ],
      desc: 'Authorized portal for DPIIT Recognized Startups & GovTech Innovators.',
      dept: 'EcoVision AI Technologies (DPIIT Reg: #DPIIT84920)'
    },
    {
      id: 'evaluator',
      roleName: 'Evaluator',
      email: 'evaluator@iisc.ac.in',
      defaultPass: 'evaluator123',
      targetTab: 'evaluator-dashboard',
      icon: CheckCircle2,
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      iconBg: 'bg-purple-700 text-white',
      hoverBorder: 'hover:border-purple-600 hover:shadow-purple-600/10',
      bullets: [
        'Review assigned startup proposals',
        'Evaluate technical & financial feasibility',
        'Compare proposal scores side-by-side'
      ],
      desc: 'Authorized portal for Technical Screening Committees & Subject Matter Experts.',
      dept: 'IISc GovTech Evaluation Committee'
    },
    {
      id: 'validator',
      roleName: 'Validator',
      email: 'validator@qci.org.in',
      defaultPass: 'validator123',
      targetTab: 'validator-dashboard',
      icon: ShieldCheck,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      iconBg: 'bg-amber-700 text-white',
      hoverBorder: 'hover:border-amber-600 hover:shadow-amber-600/10',
      bullets: [
        'Independently verify pilot raw data logs',
        'Audit KPI achievement claims',
        'Issue digital validation sign-off passports'
      ],
      desc: 'Authorized portal for Quality Council of India (QCI), STQC & Accredited Testing Labs.',
      dept: 'Quality Council of India (QCI)'
    },
    {
      id: 'admin',
      roleName: 'Admin',
      email: 'admin@startupsetu.gov.in',
      defaultPass: 'admin123',
      targetTab: 'admin-users',
      icon: UserCheck,
      badgeColor: 'bg-slate-200 text-slate-900 border-slate-400',
      iconBg: 'bg-slate-800 text-white',
      hoverBorder: 'hover:border-slate-600 hover:shadow-slate-600/10',
      bullets: [
        'Manage platform users & organization roles',
        'Verify DPIIT startup credentials',
        'Monitor tamper-evident system audit logs'
      ],
      desc: 'National Portal Operations & System Administration.',
      dept: 'StartupSetu National Command Secretariat'
    }
  ];

  const handleSelectRole = (group) => {
    setSelectedRole(group);
    setIsRegisterMode(false);
    setEmail(group.email);
    setPassword(group.defaultPass);
    setErrorMessage('');
    generateCaptcha();
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  const handleQuickAutofill = () => {
    if (selectedRole) {
      setEmail(selectedRole.email);
      setPassword(selectedRole.defaultPass);
      setUserCaptchaInput(captchaCode);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your Official Email / User ID.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }
    if (password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }
    if (userCaptchaInput.toUpperCase() !== captchaCode.toUpperCase()) {
      setErrorMessage('Security CAPTCHA verification failed. Please enter the correct captcha characters.');
      return;
    }

    if (isRegisterMode) {
      if (!regName.trim()) {
        setErrorMessage('Please enter your Full Name.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please verify your entry.');
        return;
      }
    }

    setIsLoading(true);

    try {
      const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';
      const bodyPayload = isRegisterMode ? {
        name: regName,
        email,
        role: selectedRole?.roleName || 'Government Officer',
        organization: regOrg || selectedRole?.dept || 'Government Department',
        designation: regDesignation || 'Official Delegate',
        password
      } : {
        email,
        password
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      const data = await res.json();
      setIsLoading(false);

      if (data.success || data.user) {
        onLoginSuccess(
          data.user?.role || selectedRole?.roleName || 'Government Officer',
          email,
          selectedRole?.targetTab || 'gov-dashboard',
          {
            name: isRegisterMode ? regName.trim() : data.user?.name,
            organization: isRegisterMode ? regOrg.trim() : data.user?.organization,
            designation: isRegisterMode ? regDesignation.trim() : data.user?.designation,
            avatar: data.user?.avatar,
            token: data.token,
            startupId: data.user?.startupId
          }
        );
      } else {
        setErrorMessage(data.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Unable to reach the authentication service. Please try again.');
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
  };

  return (
    <div className="-mx-4 sm:-mx-8 -mt-4 sm:-mt-8 min-h-screen bg-slate-100 flex flex-col justify-between font-sans">
      
      {/* 🇮🇳 OFFICIAL TOP TRICOLOR BAR */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-white to-emerald-600"></div>

      {/* 🏛️ OFFICIAL GOVERNMENT UTILITY BAR */}
      <div className="bg-slate-900 text-slate-300 py-1.5 px-4 text-[11px] font-medium border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-white font-bold">
            <span className="text-orange-500 font-extrabold">🇮🇳</span>
            <span>{t('भारत सरकार | Government of India')}</span>
          </div>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">{t('Ministry of Housing & Urban Affairs & DPIIT Initiative')}</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400">
            <span>{t('Accessibility:')}</span>
            <button className="hover:text-white px-1">A-</button>
            <button className="hover:text-white px-1 font-bold text-white">A</button>
            <button className="hover:text-white px-1 font-extrabold">A+</button>
          </div>
          <span className="hidden sm:inline text-slate-700">|</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              aria-label="Select language"
              aria-expanded={showLanguageMenu}
            >
              <Globe className="w-3 h-3 text-blue-400" />
              <span className="font-semibold text-white">{language === 'hi' ? 'हिंदी' : 'English'}</span>
            </button>
            {showLanguageMenu && (
              <div className="absolute right-0 top-6 z-50 min-w-24 rounded-lg border border-slate-700 bg-slate-800 p-1 shadow-xl">
                <button type="button" onClick={() => { setLanguage('en'); setShowLanguageMenu(false); }} className="block w-full rounded px-3 py-1.5 text-left text-xs text-slate-300 hover:bg-slate-700">English</button>
                <button type="button" onClick={() => { setLanguage('hi'); setShowLanguageMenu(false); }} className="block w-full rounded px-3 py-1.5 text-left text-xs text-slate-300 hover:bg-slate-700">हिंदी</button>
              </div>
            )}
          </div>
          <span className="text-slate-700">|</span>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/50 flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-400" />
            {t('GIGW & SSL SECURE PORTAL')}
          </span>
        </div>
      </div>

      {/* 🏛️ MAIN HERO HEADER BANNER */}
      <header className="bg-slate-950 text-white py-8 px-4 border-b-4 border-blue-700 shadow-lg relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/20 shadow-inner">
              <Logo size="lg" variant="light" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-orange-400 bg-orange-950/80 px-2.5 py-0.5 rounded border border-orange-800 uppercase tracking-widest">
                  {t('National GovTech Portal')}
                </span>
                <span className="text-xs text-slate-400 font-semibold">• स्टार्टअप सेतु</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                StartupSetu
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-semibold tracking-wide">
                “{t('Discover innovation. Prove impact. Scale what works.')}”
              </p>
            </div>
          </div>

          {/* Positioning Callout Box */}
          <div className="bg-blue-900/60 border border-blue-500/40 rounded-2xl p-4 max-w-md shadow-md">
            <div className="flex items-start gap-2.5">
              <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-blue-200 uppercase tracking-wider">{t('GovTech Innovation Standard')}</div>
                <p className="text-xs text-white leading-relaxed mt-0.5 font-medium">
                  <strong>{t('GeM helps government buy.')}</strong> {t('StartupSetu helps government discover, test, prove, and decide before buying.')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 🏛️ MAIN CONTENT AREA */}
      <main className="max-w-6xl mx-auto w-full py-8 px-4 flex-1 space-y-6">
        
        {/* STEP 1: PORTAL & ROLE SELECTION */}
        {!selectedRole ? (
          <div className="space-y-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-300 shadow-sm text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-900 bg-blue-50 px-3.5 py-1 rounded-full uppercase tracking-wider border border-blue-200">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                {t('Select Portal Access Level')}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">{t('Choose Your Designated Portal')}</h2>
              <p className="text-xs text-slate-600 max-w-xl mx-auto">
                {t('StartupSetu operates under strict Role-Based Access Control (RBAC). Please select your official role portal below to proceed with single sign-on authentication.')}
              </p>
            </div>

            {/* 5 Role Selection Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {userGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.id}
                    onClick={() => handleSelectRole(group)}
                    className={`bg-white rounded-2xl border-2 border-slate-300/90 hover:bg-slate-50/80 p-6 transition-all duration-200 flex flex-col justify-between space-y-5 cursor-pointer group shadow-sm hover:shadow-md ${group.hoverBorder}`}
                  >
                    <div className="space-y-4">
                      
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl shadow-xs ${group.iconBg}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border uppercase tracking-wider ${group.badgeColor}`}>
                          {roleLabel(group.roleName)} {t('Portal')}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">
                          {roleLabel(group.roleName)}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 leading-normal font-medium">
                          {t(group.desc)}
                        </p>
                        
                        {/* Bulleted List */}
                        <ul className="mt-3 space-y-1.5 text-xs text-slate-700 font-medium border-t border-slate-100 pt-3">
                          {group.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-600 font-bold shrink-0">•</span>
                              <span>{t(bullet)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="gov-btn-primary w-full text-xs py-2.5 font-bold shadow-xs flex items-center justify-center gap-2 group-hover:bg-blue-800 transition-colors"
                    >
                      <span>{t('Enter')} {roleLabel(group.roleName)} {t('Portal')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-200/70 border border-slate-300 rounded-xl p-3 text-center text-xs text-slate-600 font-semibold flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-slate-600" />
              <span>{t('All authentication sessions are logged in the National Tamper-Evident Audit Trail')}</span>
            </div>

          </div>
        ) : (
          
          /* STEP 2: ROLE-SPECIFIC GOVERNMENT LOGIN & REGISTRATION FORM */
          <div className="bg-white rounded-3xl shadow-xl border border-slate-300 overflow-hidden max-w-3xl mx-auto animate-in fade-in duration-200">
            
            {/* Form Header */}
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
              <button
                onClick={handleBackToRoleSelection}
                className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('Change Portal / Role')}
              </button>

              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg text-white ${selectedRole.iconBg}`}>
                  <selectedRole.icon className="w-4 h-4" />
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${selectedRole.badgeColor}`}>
                  {roleLabel(selectedRole.roleName)} {t('Official Portal')}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-6">
              
              {/* Mode Switcher Tabs (only startups can self-register) */}
              <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => { setIsRegisterMode(false); setErrorMessage(''); }}
                  className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all ${
                    !isRegisterMode 
                      ? 'bg-white text-blue-900 shadow-sm border border-slate-200' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('Official SSO Log In')}
                </button>
                {canSelfRegister && <button
                  type="button"
                  onClick={() => { setIsRegisterMode(true); setErrorMessage(''); }}
                  className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all ${
                    isRegisterMode 
                      ? 'bg-white text-blue-900 shadow-sm border border-slate-200' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('New Account Registration')}
                </button>}
              </div>

              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {isRegisterMode 
                    ? `${t('Register')} ${roleLabel(selectedRole.roleName)} ${t('Account')}` 
                    : `${roleLabel(selectedRole.roleName)} ${t('Single Sign-On (SSO)')}`}
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  {isRegisterMode
                    ? `${t('Create your official credentials for')} ${selectedRole.dept}`
                    : `${t('Authorized Portal:')} ${selectedRole.dept}`}
                </p>
              </div>

              {/* Error Message Alert Box */}
              {errorMessage && (
                <div className="bg-rose-50 border border-rose-300 p-3.5 rounded-xl flex items-center gap-2.5 text-xs font-bold text-rose-900 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Registration Extra Fields */}
                {isRegisterMode && canSelfRegister && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        {t('Full Name *')}
                      </label>
                      <input 
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Dr. Rajesh Kumar"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold text-slate-900"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          {t('Department / Organization')}
                        </label>
                        <input 
                          type="text"
                          value={regOrg}
                          onChange={(e) => setRegOrg(e.target.value)}
                          placeholder={`e.g. ${selectedRole.dept}`}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          {t('Designation')} / Official Title
                        </label>
                        <input 
                          type="text"
                          value={regDesignation}
                          onChange={(e) => setRegDesignation(e.target.value)}
                          placeholder="e.g. Joint Secretary / Founder"
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold text-slate-900"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Email / User ID Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t('Official Email / User ID *')}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={`e.g. ${selectedRole.email}`}
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold text-slate-900"
                    />
                  </div>
                </div>

                {/* Password Field with Show/Hide Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-800">{t('Password *')}</label>
                    {!isRegisterMode && (
                      <button 
                        type="button" 
                        onClick={() => setShowForgotPasswordModal(true)}
                        className="text-[11px] font-bold text-blue-700 hover:underline"
                      >
                        {t('Forgot password?')}
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      title={showPassword ? 'Hide Password' : 'Show Password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field (Register Mode Only) */}
                {isRegisterMode && (
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">{t('Confirm Password *')}</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold text-slate-900"
                      />
                    </div>
                  </div>
                )}

                {/* Security CAPTCHA Verification Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">{t('Security CAPTCHA Verification *')}</label>
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-900 text-amber-300 font-mono text-lg font-black tracking-widest px-4 py-2 rounded-xl border border-slate-700 select-none shadow-inner flex items-center justify-between gap-4">
                      <span className="line-through decoration-amber-500/60 decoration-2">{captchaCode}</span>
                      <button 
                        type="button" 
                        onClick={generateCaptcha}
                        title="Refresh CAPTCHA Code"
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                    <input 
                      type="text"
                      required
                      value={userCaptchaInput}
                      onChange={(e) => setUserCaptchaInput(e.target.value)}
                      placeholder={t('Enter CAPTCHA')}
                      className="flex-1 px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-bold uppercase tracking-wider text-slate-900"
                    />
                  </div>
                </div>

                {/* Remember Me Checkbox or Compliance */}
                <div className="flex items-center justify-between pt-1">
                  {!isRegisterMode ? (
                    <>
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800 font-semibold select-none">
                        <input 
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                        />
                        <span>{t('Remember credentials on this browser')}</span>
                      </label>

                      {/* Demo Credentials Autofill Button */}
                      <button
                        type="button"
                        onClick={handleQuickAutofill}
                        className="text-[11px] font-extrabold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                        Autofill Demo Credentials
                      </button>
                    </>
                  ) : (
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800 font-semibold select-none">
                      <input 
                        type="checkbox"
                        required
                        defaultChecked
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <span>{t('I confirm compliance with DPIIT GovTech Access Standards.')}</span>
                    </label>
                  )}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="gov-btn-primary w-full text-sm py-3 font-extrabold shadow-md mt-2 flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl"
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>{isRegisterMode ? 'Creating Portal Account...' : 'Authenticating Government Credentials...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isRegisterMode ? `${t('Complete')} ${roleLabel(selectedRole.roleName)} ${t('Registration')}` : `${t('Log In to')} ${roleLabel(selectedRole.roleName)} ${t('Portal')}`}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

              {/* Role Switcher Footer Note */}
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs text-slate-600 flex items-center justify-between font-medium">
                <span>{t('Active Portal:')} <strong className="text-slate-900">{roleLabel(selectedRole.roleName)}</strong> ({selectedRole.email})</span>
                <button onClick={handleBackToRoleSelection} className="font-bold text-blue-700 hover:underline">
                  {t('Switch Portal')}
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* FORGOT PASSWORD MODAL */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-300 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-blue-700" />
                {t('Reset Portal Password')}
              </h3>
              <button 
                onClick={() => { setShowForgotPasswordModal(false); setForgotSent(false); }}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {forgotSent ? (
              <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-center space-y-2 text-xs font-semibold text-emerald-950">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <p>{t('Password reset link sent to')} <strong className="text-slate-900">{forgotEmail}</strong>.</p>
                <button 
                  onClick={() => { setShowForgotPasswordModal(false); setForgotSent(false); }}
                  className="gov-btn-primary text-xs py-1.5 px-4 mt-2"
                >
                  {t('Close Window')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
                <p className="text-xs text-slate-600 font-medium">
                  {t('Enter your registered official email address to receive a secure password recovery token.')}
                </p>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('Official Email Address')}</label>
                  <input 
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@organization.gov.in"
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 font-semibold"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowForgotPasswordModal(false)}
                    className="gov-btn-secondary text-xs py-2 px-3"
                  >
                    {t('Cancel')}
                  </button>
                  <button type="submit" className="gov-btn-primary text-xs py-2 px-4 font-bold">
                    {t('Send Recovery Link')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 🇮🇳 OFFICIAL GOVERNMENT FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-8 px-4 border-t-2 border-slate-800 text-xs mt-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <div className="grid md:grid-cols-3 gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>🇮🇳 {t('StartupSetu Portal')}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                National GovTech platform for discovering innovative startups, running controlled pilots, and executing evidence-based government procurement.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold text-xs uppercase tracking-wider">{t('Helpdesk & Support')}</div>
              <p className="text-[11px] text-slate-400">Toll-Free Helpline: <strong>1800-11-SETU (7388)</strong></p>
              <p className="text-[11px] text-slate-400">Email: <strong>support@startupsetu.gov.in</strong></p>
              <p className="text-[11px] text-slate-400">Hours: Mon - Sat (9:00 AM to 6:00 PM IST)</p>
            </div>

            <div className="space-y-2">
              <div className="text-white font-bold text-xs uppercase tracking-wider">{t('Compliance & Security')}</div>
              <p className="text-[11px] text-slate-400">ISO 27001 Certified • GIGW Compliant</p>
              <p className="text-[11px] text-slate-400">Tamper-Evident SHA-256 Audit Trail Active</p>
              <p className="text-[11px] text-slate-400">DPIIT & MoHUA Recognized Platform</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              Designed, Developed and Hosted by <strong>National Informatics Centre (NIC) / StartupSetu Division</strong>.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:underline cursor-pointer">{t('Privacy Policy')}</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">{t('Terms of Service')}</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">{t('Audit Trail')}</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
