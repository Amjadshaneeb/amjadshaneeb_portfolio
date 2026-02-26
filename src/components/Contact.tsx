import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { saveContactSubmission } from '../services/contactService';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    console.log('Submitting form data:', formData);
    
    try {
      const result = await saveContactSubmission(formData);
      console.log('Save result:', result);
      
      if (result.success) {
        setStatus('success');
        console.log('✅ Contact submission saved successfully');
        // Clear form fields after successful submission
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        console.error('❌ Submission failed:', result.error);
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      console.error('❌ Unexpected error:', error);
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-32 relative scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Initiate Sequence.
          </h2>
          <p className="text-xl text-zinc-400">
            Have a product idea or need a reliable developer?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center text-xs text-zinc-500 font-mono flex items-center justify-center gap-2">
              <Terminal size={12} />
              contact_protocol.exe
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-8 font-mono text-sm text-zinc-400">
              <p className="mb-2">$ connect --target amjadshaneeb783@gmail.com</p>
              <p className="text-blue-400">Establishing secure connection...</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 font-mono">NAME</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                    placeholder="Guest_User"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 font-mono">EMAIL</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                    placeholder="user@domain.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 font-mono">PAYLOAD</label>
                <textarea
                  required
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono resize-none"
                  placeholder="Enter message sequence here..."
                />
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'idle' && (
                  <>
                    <Send size={18} /> Transmit Data
                  </>
                )}
                {status === 'submitting' && (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                )}
                {status === 'success' && (
                  <>
                    <CheckCircle2 size={18} className="text-green-600" /> Transmission Successful
                  </>
                )}
                {status === 'error' && (
                  <>
                    <AlertCircle size={18} className="text-red-600" /> Transmission Failed - Check Console
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
              <p className="text-zinc-500 text-sm mb-4">Or bypass the form and email directly:</p>
              <a 
                href="mailto:amjadshaneeb783@gmail.com"
                className="text-blue-400 hover:text-blue-300 font-mono hover:underline"
              >
                amjadshaneeb783@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
