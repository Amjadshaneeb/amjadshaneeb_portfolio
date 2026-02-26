import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import PhoneFrame from "./PhoneFrame";

interface ProjectCarouselProps {
  projects: any[];
  allProjects: any[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  prevProject: () => void;
  nextProject: () => void;
  setIsPaused: (paused: boolean) => void;
  isMobile: boolean;
  isMobileApps?: boolean; // Add this to distinguish mobile apps
}

export default function ProjectCarousel({
  projects,
  allProjects,
  currentIndex,
  setCurrentIndex,
  prevProject,
  nextProject,
  setIsPaused,
  isMobile,
  isMobileApps = false
}: ProjectCarouselProps) {
  const handleViewDetails = (project: any) => {
    if (project.live_url) {
      window.open(project.live_url, "_blank");
    } else if (project.github_url) {
      window.open(project.github_url, "_blank");
    }
  };

  return (
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
      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide md:pl-0">
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => {
            const isCenter = isMobile ? true : index === 2;
            const isAdjacent = !isMobile && (index === 1 || index === 3);
            return (
              <motion.div
                key={`${project.id}-${currentIndex}`}
                className={`flex-shrink-0 snap-center ${
                  isMobile
                    ? "w-[90vw]"
                    : isCenter
                      ? "w-[85vw] md:w-[500px]"
                      : isAdjacent
                        ? "w-[70vw] md:w-[400px]"
                        : "w-[50vw] md:w-[300px]"
                }`}
                style={{
                  scrollSnapAlign: 'center',
                  filter: !isMobile ? (isCenter
                    ? "none"
                    : isAdjacent
                      ? "blur(1px)"
                      : "blur(3px)") : "none",
                }}
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
              >
                <div className={`relative h-full ${
                  isMobileApps ? '' : 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300'
                }`}>
                  {/* Project Image */}
                  {isMobileApps ? (
                    <PhoneFrame
                      title={project.name}
                      description={project.problem_statement}
                      githubUrl={project.github_url}
                      liveUrl={project.live_url}
                    >
                      <div className="relative h-full overflow-hidden">
                        <img
                          src={project.image_url || "/uploads/project1.jpg"}
                          alt={project.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/uploads/project1.jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    </PhoneFrame>
                  ) : (
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
                  )}

                  {/* Content */}
                  {!isMobileApps && (
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
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {allProjects.map((_, index) => (
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
  );
}
