import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import mockProjects from "../mockData/projects";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        } else {
          // Use mock data if API fails
          console.warn("API not available, using mock data");
          setProjects(mockProjects);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        // Use mock data as fallback
        console.log("Using mock data as fallback");
        setProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isPaused || projects.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, projects.length]);

  const nextProject = () =>
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () =>
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const handleViewDetails = (project: any) => {
    if (project.live_url) {
      window.open(project.live_url, "_blank");
    } else if (project.github_url) {
      window.open(project.github_url, "_blank");
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-32 bg-gray-900 scroll-mt-24">
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

  const visibleProjects = [
    ...projects.slice(currentIndex),
    ...projects.slice(0, currentIndex),
  ].slice(0, 5);

  return (
    <section
      id="projects"
      ref={carouselRef}
      className="relative py-32 bg-gray-900 scroll-mt-24 overflow-hidden"
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
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A showcase of production-ready applications built with modern
            technologies.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <motion.button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="text-white" size={24} />
          </motion.button>
          <motion.button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="text-white" size={24} />
          </motion.button>

          {/* Cards Container */}
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => {
                const isCenter = index === 2;
                const isAdjacent = index === 1 || index === 3;
                return (
                  <motion.div
                    key={`${project.id}-${currentIndex}`}
                    className={`flex-shrink-0 snap-center ${
                      isCenter
                        ? "w-[500px]"
                        : isAdjacent
                          ? "w-[400px]"
                          : "w-[300px]"
                    }`}
                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                    animate={{
                      opacity: isCenter || isAdjacent ? 1 : 0.5,
                      x: 0,
                      scale: isCenter ? 0.90 : isAdjacent ? 0.85 : 0.8,
                    }}
                    exit={{ opacity: 0, x: -100, scale: 0.8 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                    }}
                    style={{
                      filter: isCenter
                        ? "none"
                        : isAdjacent
                          ? "blur(1px)"
                          : "blur(3px)",
                    }}
                  >
                    <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300">
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image_url || "/uploads/project1.jpg"}
                          alt={project.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/uploads/project1.jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {project.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {project.problem_statement}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech_stack
                            .split(",")
                            .map((tech: string, i: number) => (
                              <span
                                key={i}
                                className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-400 rounded-full"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                        </div>
                        <motion.button
                          onClick={() => handleViewDetails(project)}
                          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {project.live_url ? (
                            <>
                              <ExternalLink size={18} />
                              View Live
                            </>
                          ) : (
                            <>
                              <Github size={18} />
                              View Code
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-cyan-400 w-8" : "bg-white/30"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
