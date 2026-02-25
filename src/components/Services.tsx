import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Database, Layout, Zap, Rocket, ArrowRight } from 'lucide-react';
import mockServices from '../mockData/services';

const iconMap: Record<string, any> = {
  Smartphone,
  Globe,
  Database,
  Layout,
  Zap,
  Rocket,
};

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        } else {
          // Use mock data if API fails
          console.warn("API not available, using mock data");
          setServices(mockServices);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        // Use mock data as fallback
        console.log("Using mock data as fallback");
        setServices(mockServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="py-32 bg-gradient-to-b from-black to-gray-900 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse h-8 w-48 bg-gray-800 rounded mx-auto mb-4" />
            <div className="animate-pulse h-1 w-24 bg-gray-800 rounded mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse h-64 bg-gray-800/50 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="relative py-32 bg-gradient-to-b from-black to-gray-900 scroll-mt-24 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
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
            Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Transforming ideas into production-ready applications with modern technologies and best practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Rocket;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={28} className="text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                  <motion.div
                    className="mt-6 flex items-center gap-2 text-cyan-400 font-medium"
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                  >
                    <span>Learn more</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}