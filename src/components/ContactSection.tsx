import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Send,
  MapPin,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Instagram,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactSectionProps {
  personal: typeof PORTFOLIO_DATA.personal;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ personal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [formState, setFormState] = useState<'idle' | 'mailto-ready'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const validate = () => {
    const nextErrors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please write a brief message (at least 10 characters).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const getMailtoHref = () => {
    const mailSubject = encodeURIComponent(
      subject.trim() || `Portfolio Inquiry from ${name.trim()}`
    );
    const mailBody = encodeURIComponent(
      `Hi Salim,\n\n${message.trim()}\n\n---\nFrom: ${name.trim()}\nReply-To: ${email.trim()}`
    );
    return `mailto:${personal.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('mailto-ready');
    window.location.href = getMailtoHref();
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback ignored
    }
  };

  const handleCopyFormattedMessage = async () => {
    try {
      const formatted = `To: ${personal.email}\nFrom: ${name} (${email})\nSubject: ${
        subject || 'Portfolio Inquiry'
      }\n\n${message}`;
      await navigator.clipboard.writeText(formatted);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      // Fallback ignored
    }
  };

  return (
    <section id="contact" className="relative pt-16 sm:pt-20 pb-20 overflow-hidden">
      {/* Soft Anime Evening / Sunset Sky Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={personal.sunsetContactImage}
          alt="Soft anime twilight sunset sky over hills and cherry blossoms"
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #f3f6ff 0%, rgba(243,246,255,0.78) 18%, rgba(36,38,78,0.48) 65%, rgba(23,26,56,0.82) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-indigo-900 text-xs font-bold tracking-wider uppercase border border-white shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Chapter 08 • Let&apos;s Connect</span>
          </div>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1b274b] drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
            Start a Conversation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-800 font-medium bg-white/75 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/80 inline-block">
            Interested in AI/ML internships, full-stack collaboration, or discussing a project? Reach out directly!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Verified Direct Contact Channels & Social Profiles (5 cols) */}
          <div className="lg:col-span-5 anime-glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#1b274b]">
                  Direct Contact &amp; Profiles
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  Connect with Salim Ansari via email, phone, GitHub, or LinkedIn.
                </p>
              </div>

            {/* Email & Phone Cards */}
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/90 border border-indigo-100 shadow-sm space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Address</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${personal.email}`}
                  className="block font-mono text-xs sm:text-sm font-bold text-[#1e2b54] hover:text-indigo-600 break-all"
                >
                  {personal.email}
                </a>
              </div>

              {personal.phone && (
                <div className="p-3.5 rounded-2xl bg-white/90 border border-indigo-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Phone / WhatsApp</span>
                    </span>
                    <a
                      href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                      className="block font-mono text-sm font-bold text-[#1e2b54] hover:text-indigo-600 mt-0.5"
                    >
                      {personal.phone}
                    </a>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Nagpur, IN
                  </span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="space-y-2.5">
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/90 hover:bg-white border border-indigo-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#1e294b] text-white flex items-center justify-center shadow">
                    <Github className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="font-bold text-sm text-[#1b274b] group-hover:text-indigo-600">
                      GitHub (@Salimansari369)
                    </p>
                    <p className="text-xs text-slate-500">
                      19+ Public Repositories • LiteratureAI, MediLinks, CampusCare
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </a>

              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/90 hover:bg-white border border-indigo-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shadow">
                    <Linkedin className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="font-bold text-sm text-[#1b274b] group-hover:text-indigo-600">
                      LinkedIn (salim-ansari-3195b33a8)
                    </p>
                    <p className="text-xs text-slate-500">
                      Professional Network &amp; Academic Updates
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </a>

              {personal.instagramUrl && (
                <a
                  href={personal.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/90 hover:bg-white border border-indigo-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow">
                      <Instagram className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="font-bold text-sm text-[#1b274b] group-hover:text-indigo-600">
                        Instagram (@x.shehzada369.xvii)
                      </p>
                      <p className="text-xs text-slate-500">Social &amp; Creative Updates</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                </a>
              )}
            </div>
            </div>

            {/* Location Info Card */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-50/90 to-sakura-50/80 border border-white text-xs text-slate-700 flex items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-[#1f2c54]">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span>SIT Nagpur • PRN: 24070521005</span>
                </div>
                <p className="pl-5 text-slate-600">{personal.location}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form (7 cols) */}
          <div className="lg:col-span-7 anime-glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <h3 className="font-serif font-bold text-2xl text-[#1b274b] mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Fill out the form below to open a pre-addressed email to{' '}
              <strong className="font-mono text-indigo-800">{personal.email}</strong> or copy your formatted message in one click.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="e.g., Rahul Verma"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.name ? 'border-rose-400' : 'border-indigo-100'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-rose-600 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Your Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="you@company.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.email ? 'border-rose-400' : 'border-indigo-100'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-rose-600 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Subject (Optional)
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="AI/ML or Full-Stack Internship Opportunity"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-indigo-100 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Hi Salim, I reviewed your LiteratureAI, MediLinks, and CampusCare repositories on GitHub and would love to connect..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.message ? 'border-rose-400' : 'border-indigo-100'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-rose-600 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#8762ee] via-[#7559e8] to-[#6364ec] hover:from-[#7650e5] hover:to-[#5253e2] text-white font-semibold text-sm shadow-pill hover:shadow-lg transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via Email App</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (validate()) handleCopyFormattedMessage();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-indigo-50 text-slate-700 font-semibold text-xs border border-indigo-200 transition-colors cursor-pointer"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Message Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Formatted Message</span>
                    </>
                  )}
                </button>
              </div>

              {formState === 'mailto-ready' && (
                <div className="p-4 rounded-2xl bg-indigo-50/95 border border-indigo-200 text-xs text-indigo-950 space-y-2">
                  <p className="font-bold flex items-center gap-1.5 text-indigo-800">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Email draft opened in your mail client!</span>
                  </p>
                  <p className="leading-relaxed">
                    Pre-addressed to <strong className="font-mono">{personal.email}</strong>. Click{' '}
                    <strong>Send</strong> inside your mail application to complete delivery, or{' '}
                    <a href={getMailtoHref()} className="underline font-bold text-indigo-700">
                      click here to reopen the email link
                    </a>
                    .
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
