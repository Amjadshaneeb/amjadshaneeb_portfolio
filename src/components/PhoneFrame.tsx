interface PhoneFrameProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function PhoneFrame({ children, title, description, githubUrl, liveUrl }: PhoneFrameProps) {
  const handleViewProject = () => {
    if (liveUrl) {
      window.open(liveUrl, "_blank");
    } else if (githubUrl) {
      window.open(githubUrl, "_blank");
    }
  };

  return (
    <div className="relative mx-auto" style={{ maxWidth: "320px" }}>
      {/* Phone Frame */}
      <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800">
        {/* Phone Screen */}
        <div className="relative bg-black rounded-[2rem] overflow-hidden" style={{ aspectRatio: "9/19.5" }}>
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-black z-10 flex items-center justify-between px-4">
            <div className="text-white text-xs font-medium">9:41</div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-3 border border-white rounded-sm"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* App Content */}
          <div className="absolute inset-0 pt-6 pb-2">
            {children}
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-600 rounded-full"></div>
      </div>
      
      {/* Project Info */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{description}</p>
        <button
          onClick={handleViewProject}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white text-sm font-medium flex items-center gap-2 mx-auto hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          {liveUrl ? 'View Code' : 'View Code'}
        </button>
      </div>
      
      {/* Phone Shadow */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-8 bg-black/20 blur-xl rounded-full"></div>
    </div>
  );
}
