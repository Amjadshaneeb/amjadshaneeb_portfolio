import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles, Bot, Zap, Code2 } from "lucide-react";

const aiProjects = [
  {
    id: 1,
    title: "Reflex Tap",
    description: "A fast-paced reflex game that challenges players to tap the correct shape before time runs out, testing speed and accuracy.",
    image: "/uploads/ReflexTap.png",
    tech: ["React", "OpenAI API", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://reflextap.vercel.app/",
    githubUrl: "https://github.com/Amjadshaneeb/Reflex.git",
    features: ["Natural Language Processing", "Context Awareness", "Multi-language Support", "Real-time Responses"]
  },
  {
    id: 2,
    title: "Code Craft",
    description: "An AI-powered tool that generates code snippets based on natural language descriptions, supporting multiple programming languages.",
    image: "/uploads/codecraftai.png",
    tech: ["Next.js", "GPT-4", "Prisma", "PostgreSQL"],
    liveUrl: "https://aicodecraft.vercel.app/",
    githubUrl: "https://github.com/Amjadshaneeb/Ai_Code_Generator.git",
    features: ["Multi-language Support", "Code Optimization", "Syntax Highlighting", "Export Options"]
  },
  // {
  //   id: 3,
  //   title: "AI Image Generator",
  //   description: "A web application that generates stunning images using AI models like DALL-E and Stable Diffusion with custom prompts.",
  //   image: "/images/ai-image.jpg",
  //   tech: ["React", "DALL-E API", "Canvas API", "Node.js"],
  //   liveUrl: "https://example.com",
  //   githubUrl: "https://github.com",
  //   features: ["Custom Prompts", "Style Variations", "High Resolution", "Download Options"]
  // },
  // {
  //   id: 4,
  //   title: "AI Content Writer",
  //   description: "An intelligent content generation tool that creates blog posts, articles, and marketing copy using advanced AI models.",
  //   image: "/images/content-writer.jpg",
  //   tech: ["Vue.js", "OpenAI", "Express", "MongoDB"],
  //   liveUrl: "https://example.com",
  //   githubUrl: "https://github.com",
  //   features: ["SEO Optimization", "Tone Adjustment", "Multiple Formats", "Plagiarism Check"]
  // }
];

export default function AIProjects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="ai-projects" className="py-32 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              AI-Powered Projects
            </h2>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Bot className="w-8 h-8 text-cyan-400" />
            </motion.div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Explore my collection of innovative projects built entirely with AI assistance. 
            These showcase the power of human-AI collaboration in creating cutting-edge solutions.
          </p>
          
          {/* AI Badge */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 font-medium">Fully AI-Assisted Development</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {aiProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
            >
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20" />
                  <div className="absolute inset-0 flex items-center justify-center hidden">
                    <Code2 className="w-16 h-16 text-purple-400/50" />
                  </div>
                  
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-purple-600 rounded-full hover:bg-purple-500 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 2).map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                        >
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 2 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-400">
                          +{project.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 rounded bg-gray-700/50 text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Indicator */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs font-medium">
                    <Sparkles className="w-3 h-3" />
                    AI Built
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30">
            <Bot className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">
              Interested in AI-powered solutions? Let's collaborate!
            </span>
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
