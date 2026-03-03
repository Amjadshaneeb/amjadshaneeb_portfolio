import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, Calendar, CheckCircle, X, ZoomIn } from 'lucide-react';
import { createPortal } from "react-dom"; 

const certifications = [
  {
    id: 1,
    title: "Flutter Development",
    issuer: "EDAPT",
    date: "2024",
    image: "/uploads/TLP.png",
    // credentialId: "TLPGRAD113",
    description: "Flutter development course covering mobile app development, UI/UX design, state management, and cross-platform deployment using Flutter and Dart.",
    skills: ["Flutter", "Dart", "UI/UX Design", "State Management", "Cross-Platform"]
  },
  {
    id: 2,
    title: "Certified Ethical Hacker",
    issuer: "OFFENSO HACKERS ACADEMY",
    date: "2023",
    image: "/uploads/CEH Introduction.png",
    // credentialId: "CEH-2023-12345",
    description: "Comprehensive certification in ethical hacking covering penetration testing, vulnerability assessment, security analysis, and cybersecurity best practices.",
    skills: ["Penetration Testing", "Vulnerability Assessment", "Security Analysis", "Network Security"]
  },
  {
    id: 3,
    title: "AI Agent Developer",
    issuer: "HUGGING FACE",
    date: "2026",
    image: "/uploads/Hugging Face.webp",
    // credentialId: "HF-AI-AGENT-2023",
    description: "Advanced certification in building AI agents using Hugging Face technologies, covering transformer models, fine-tuning, and deployment strategies.",
    skills: ["Machine Learning", "AI Agents", "Hugging Face", "Transformers", "Model Deployment"]
  },
  // {
  //   id: 4,
  //   title: "Firebase Cloud Certification",
  //   issuer: "Google",
  //   date: "2023",
  //   image: "/images/firebase-cert.jpg",
  //   credentialId: "GCP-FIREBASE-2023",
  //   description: "Cloud certification covering Firebase services, database management, and deployment strategies.",
  //   skills: ["Firebase", "Cloud Computing", "NoSQL", "Authentication"]
  // },
];

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const [fullscreenCert, setFullscreenCert] = useState<number | null>(null);

  const openFullscreen = (certId: number) => {
    setFullscreenCert(certId);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenCert(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="certifications" className="py-32 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" />
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
              <Award className="w-8 h-8 text-purple-400" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Professional Certifications
            </h2>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <CheckCircle className="w-8 h-8 text-cyan-400" />
            </motion.div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-cyan-500 to-pink-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Industry-recognized certifications validating my expertise in modern development technologies and best practices.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={() => setSelectedCert(cert.id)}
              onMouseLeave={() => setSelectedCert(null)}
              className="group relative"
            >
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                {/* Certificate Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-600/10" />
                  <div className="absolute inset-0 flex items-center justify-center hidden">
                    <Award className="w-16 h-16 text-purple-400/50" />
                  </div>
                  
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/80 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedCert === cert.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center">
                      <button
                        onClick={() => openFullscreen(cert.id)}
                        className="text-white font-medium mb-2 hover:text-purple-300 transition-colors"
                      >
                        <ZoomIn className="w-5 h-5 inline-block mr-2" />
                        View Fullscreen
                      </button>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                        <BookOpen className="w-4 h-4" />
                        <span>Click to expand</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                      Verified
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Skills Covered</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="text-xs px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Credential Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="text-sm text-gray-400">
                      {/* <span className="font-medium">Credential ID:</span> {cert.credentialId} */}
                    </div>
                    <div className="text-sm text-gray-500">
                      Issued by {cert.issuer}
                    </div>
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
            <Award className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">
              Professional certifications validating technical expertise
            </span>
            <CheckCircle className="w-5 h-5 text-cyan-400" />
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      {createPortal(
        <AnimatePresence>
          {fullscreenCert && (
            <motion.div
              className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFullscreen}
            >
              <motion.div
                className="relative w-[90vw] max-w-[1200px] h-[85vh] bg-gray-900 rounded-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeFullscreen}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="h-full flex items-center justify-center p-4">
                  <img
                    src={
                      certifications.find(
                        cert => cert.id === fullscreenCert
                      )?.image
                    }
                    className="max-w-full max-h-full object-contain"
                    alt="Certificate"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
