import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Code, Smartphone, Database, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasScrolled, setHasScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGetInTouch = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-40 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black" />
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)`,
        }} />
      </div>

      {/* Floating Code Symbols */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-6xl md:text-8xl font-mono font-bold text-red-500/30 blur-sm"
        animate={{
          x: mousePosition.x * 100,
          y: mousePosition.y * 100,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      >
        &lt;/&gt;
      </motion.div>
      {/* Content Container - Modern Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Badges Container */}
            <div className="flex flex-wrap gap-3 mb-6">
              {/* Flutter Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
                <Smartphone className="w-4 h-4" />
                <span>Flutter</span>
              </div>
              {/* Dart Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                <Code className="w-4 h-4" />
                <span>Dart</span>
              </div>
              {/* React Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>React</span>
              </div>
              {/* Firebase Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
                <Database className="w-4 h-4" />
                <span>Firebase</span>
              </div>
              {/* Supabase Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                <Database className="w-4 h-4" />
                <span>Supabase</span>
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Amjad Shaneeb
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
              Experienced Flutter developer building beautiful, functional mobile applications with passion and precision.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleGetInTouch}
                className="group flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleViewProjects}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-semibold transition-all"
              >
                View Projects
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-3 gap-8 relative">
              <div>
                <div className="text-2xl font-bold">2+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold">5+</div>
                <div className="text-sm text-gray-500">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm text-gray-500">Tech Stacks</div>
              </div>
              {/* Scroll Indicator - positioned at Stats level */}
              <motion.div
                className={`absolute left-full ml-8 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: hasScrolled ? 0 : 1 }}
                transition={{ delay: 1, duration: 0.3 }}
              >
                <div className="flex items-center gap-2 text-sm text-gray-400 whitespace-nowrap">
                  <span>Scroll to discover</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Animated Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative lg:ml-auto"
          >
            {/* Background Glows */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-600/20 blur-[120px] rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-600/20 blur-[120px] rounded-full" />
            
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-10 w-84 h-84 md:w-95 md:h-95 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10"
            >
              <img 
                src="images/profile.svg" 
                alt="Amjad Shaneeb - Flutter Developer" 
                className="w-fit h-fit object-fit"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            {/* Floating Code Cards */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-12 top-1/4 z-20 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 font-mono font-bold text-sm">&lt;/&gt;</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 bottom-1/4 z-20 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-400 font-mono font-bold text-sm">//</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}