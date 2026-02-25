import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Clock } from 'lucide-react';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Amjad Flutter CV.pdf';
    link.download = 'Amjad Flutter CV.pdf';
    link.click();
  };

  return (
    <footer className="relative py-12 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left - Credits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <p className="text-gray-400">
              Authored by{' '}
              <span className="text-white font-medium">Amjad Shaneeb</span>
            </p>
          </motion.div>

          {/* Center - Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-6"
          >
            <motion.a
              href="mailto:amjadshaneeb783@gmail.com"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={24} />
            </motion.a>
            <motion.a
              href="https://github.com/amjadshaneeb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/amjad-shaneeb-a-c/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={24} />
            </motion.a>
          </motion.div>

          {/* Right - Time & CV */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center md:items-end gap-3"
          >
            <motion.button
              onClick={handleDownloadCV}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white hover:border-cyan-400/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.button>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock size={16} />
              <span>{time}</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-white/5 text-center"
        >
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Amjad Shaneeb. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}