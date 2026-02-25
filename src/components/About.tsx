import { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Smartphone, Code2, Database, Zap, Rocket, Layers } from 'lucide-react';

const skills = [
  { name: 'Flutter', level: 95, icon: Smartphone, color: 'from-blue-500 to-cyan-400' },
  { name: 'Dart', level: 90, icon: Code2, color: 'from-blue-600 to-blue-400' },
  { name: 'Firebase', level: 85, icon: Database, color: 'from-orange-500 to-yellow-400' },
  { name: 'Supabase', level: 80, icon: Zap, color: 'from-green-500 to-emerald-400' },
  { name: 'Clean Architecture', level: 88, icon: Layers, color: 'from-purple-500 to-pink-400' },
  { name: 'State Management', level: 92, icon: Rocket, color: 'from-cyan-500 to-blue-400' },
];

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '5+', label: 'Real Projects' },
  { value: '10+', label: 'Tech Stacks' },
  { value: '100%', label: 'Client Satisfaction' },
];

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  if (inView) {
    controls.start('visible');
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.div
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        {value}
      </motion.div>
      <div className="text-gray-400 mt-2">{label}</div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-black scroll-mt-24"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Crafting Digital Experiences with{' '}
              <span className="text-cyan-400">Passion & Precision</span>
            </h3>
            <div className="space-y-4 text-gray-400">
              <p>
                I'm Amjad Shaneeb, a Flutter & Full-Stack Developer specializing in building scalable cross-platform applications. My journey started with a curiosity for how things work, which evolved into a deep passion for creating seamless user experiences.
              </p>
              <p>
                I focus on clean architecture and robust state management patterns that make applications maintainable and performant. Whether it's a startup MVP or an enterprise solution, I bring production-ready code and a product mindset to every project.
              </p>
              <p>
                My expertise spans Flutter mobile apps, web applications, and backend integrations with Firebase and Supabase. I believe in writing code that not only works but is also a joy to maintain and scale.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Skills & Stats */}
          <div className="space-y-12">
            {/* Skills Constellation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Technical Expertise</h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-cyan-400/50 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.color}`}>
                        <skill.icon size={18} className="text-white" />
                      </div>
                      <span className="font-medium text-white">{skill.name}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}