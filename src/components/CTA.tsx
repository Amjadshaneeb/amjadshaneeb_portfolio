import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function CTA() {
  const handleContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-cyan-600/20"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ backgroundSize: '200% 200%' }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: 0,
            }}
            animate={{
              y: [0, -100, 0],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <MessageCircle size={18} className="text-cyan-400" />
            <span className="text-sm text-gray-300">Let's Build Something Amazing</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Have a product idea or need a reliable developer?
          </h2>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Let's turn your vision into reality. I'm ready to help you build scalable, performant applications that users love.
          </p>

          <motion.button
            onClick={handleContact}
            className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white text-lg font-bold flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a conversation
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}