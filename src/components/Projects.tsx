import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCarousel from "./ProjectCarousel";
import mockProjects from "../mockData/projects";
import { getProjects } from "../services/projectService";

export default function Projects() {
  const [mobileProjects, setMobileProjects] = useState<any[]>([]);
  const [webProjects, setWebProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [currentWebIndex, setCurrentWebIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTab, setActiveTab] = useState<'mobile' | 'web'>('mobile');
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        
        if (data && data.length > 0) {
          // Separate projects by type
          const mobile = data.filter((p: any) => p.project_type === 'mobile');
          const web = data.filter((p: any) => p.project_type === 'web');
          
          setMobileProjects(mobile.length > 0 ? mobile : mockProjects.filter(p => p.project_type === 'mobile'));
          setWebProjects(web.length > 0 ? web : mockProjects.filter(p => p.project_type === 'web'));
        } else {
          // Use mock data if no data from Supabase
          setMobileProjects(mockProjects.filter(p => p.project_type === 'mobile'));
          setWebProjects(mockProjects.filter(p => p.project_type === 'web'));
        }
      } catch (err) {
        // Use mock data as fallback
        setMobileProjects(mockProjects.filter(p => p.project_type === 'mobile'));
        setWebProjects(mockProjects.filter(p => p.project_type === 'web'));
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Auto-scroll for mobile projects
  useEffect(() => {
    if (isPaused || mobileProjects.length === 0) return;
    const interval = setInterval(() => {
      setCurrentMobileIndex((prev) => (prev + 1) % mobileProjects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, mobileProjects.length]);

  // Auto-scroll for web projects
  useEffect(() => {
    if (isPaused || webProjects.length === 0) return;
    const interval = setInterval(() => {
      setCurrentWebIndex((prev) => (prev + 1) % webProjects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, webProjects.length]);

  const nextMobileProject = () =>
    setCurrentMobileIndex((prev) => (prev + 1) % mobileProjects.length);
  const prevMobileProject = () =>
    setCurrentMobileIndex((prev) => (prev - 1 + mobileProjects.length) % mobileProjects.length);

  const nextWebProject = () =>
    setCurrentWebIndex((prev) => (prev + 1) % webProjects.length);
  const prevWebProject = () =>
    setCurrentWebIndex((prev) => (prev - 1 + webProjects.length) % webProjects.length);

  if (loading) {
    return (
      <section id="projects" className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse h-8 w-48 bg-gray-800 rounded mx-auto mb-4" />
            <div className="animate-pulse h-1 w-24 bg-gray-800 rounded mx-auto" />
          </div>
          <div className="mt-16 h-[500px] bg-gray-800/50 rounded-3xl animate-pulse" />
        </div>
      </section>
    );
  }

  const visibleMobileProjects = [
    ...mobileProjects.slice(currentMobileIndex),
    ...mobileProjects.slice(0, currentMobileIndex),
  ].slice(0, 5);

  const visibleWebProjects = [
    ...webProjects.slice(currentWebIndex),
    ...webProjects.slice(0, currentWebIndex),
  ].slice(0, 5);

  // For mobile, show only center card
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const mobileVisibleProjects = isMobile ? [mobileProjects[currentMobileIndex]] : visibleMobileProjects;
  const webVisibleProjects = isMobile ? [webProjects[currentWebIndex]] : visibleWebProjects;

  return (
    <section
      id="projects"
      ref={carouselRef}
      className="relative py-32 bg-gray-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl" />
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
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
            Explore my diverse portfolio of mobile applications and web projects built with modern technologies.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-center">
            <div className="inline-flex bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-gray-700">
              <button
                onClick={() => setActiveTab('mobile')}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'mobile'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Mobile Apps
              </button>
              <button
                onClick={() => setActiveTab('web')}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'web'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Web Projects
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'mobile' && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-cyan-400 mb-3">Mobile Applications</h3>
                <p className="text-gray-400 mb-8">
                  Native and cross-platform mobile applications built with Flutter and React Native.
                </p>
              </div>
              <ProjectCarousel
                projects={mobileVisibleProjects}
                allProjects={mobileProjects}
                currentIndex={currentMobileIndex}
                setCurrentIndex={setCurrentMobileIndex}
                prevProject={prevMobileProject}
                nextProject={nextMobileProject}
                setIsPaused={setIsPaused}
                isMobile={isMobile}
                isMobileApps={true}
              />
            </motion.div>
          )}

          {activeTab === 'web' && (
            <motion.div
              key="web"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-purple-400 mb-3">Web Applications</h3>
                <p className="text-gray-400 mb-8">
                  Modern web applications built with React, Next.js, and cutting-edge technologies.
                </p>
              </div>
              <ProjectCarousel
                projects={webVisibleProjects}
                allProjects={webProjects}
                currentIndex={currentWebIndex}
                setCurrentIndex={setCurrentWebIndex}
                prevProject={prevWebProject}
                nextProject={nextWebProject}
                setIsPaused={setIsPaused}
                isMobile={isMobile}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
