import { motion } from "framer-motion"

export default function RoadmapDiagram({ items }) {
  const getStatusColor = (status) => {
    switch(status) {
      case "done": return "border-[#4a6cf7] glassmorphism"; 
      case "current": return "border-[#4a6cf7] glassmorphism ring-4 ring-[#4a6cf7]/30 shadow-[#4a6cf7]/20 shadow-xl"; 
      case "upcoming": return "border-black/20 bg-white/40 border-dashed text-black/60"; 
      default: return "border-gray-200 bg-white/50";
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case "done": return "text-[#4a6cf7]";
      case "current": return "text-[#4a6cf7] font-extrabold";
      case "upcoming": return "text-black/50";
      default: return "";
    }
  }

  const getDotStyle = (status) => {
    switch(status) {
      case "done": return "bg-[#4a6cf7] scale-100";
      case "current": return "bg-[#4a6cf7] scale-125 animate-pulse";
      case "upcoming": return "bg-transparent scale-50";
      default: return "bg-transparent";
    }
  }

  return (
    <div className="relative py-12 max-w-5xl mx-auto font-sora">
      {/* Central continuous glowing line */}
      <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-transparent via-[#4a6cf7]/30 to-transparent transform -translate-x-1/2 rounded-full hidden md:block"></div>

      <div className="flex flex-col gap-12 lg:gap-16 relative">
        {items.map((item, index) => {
          const isLeft = item.side === "left";
          
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center justify-between w-full ${isLeft ? "md:flex-row-reverse" : "md:flex-row"} flex-col md:gap-0 gap-6 group`}
            >
              {/* Spacer for desktop layout */}
              <div className="hidden md:block w-[45%]"></div>
              
              {/* Center Node (Desktop) */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#4a6cf7]/20 items-center justify-center z-10 transition-all duration-500 group-hover:border-[#4a6cf7]/50 group-hover:scale-110 shadow-lg shadow-[#4a6cf7]/10">
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${getDotStyle(item.status)}`}></div>
              </div>

              {/* Card Container */}
              <div className={`w-full md:w-[45%] relative`}>
                {/* Connecting line (Desktop) */}
                <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-[11%] h-[2px] bg-gradient-to-r ${isLeft ? 'from-transparent to-[#4a6cf7]/20 -right-[11%]' : 'from-[#4a6cf7]/20 to-transparent -left-[11%]'} transition-all duration-300 group-hover:w-[13%] ${isLeft ? 'group-hover:-right-[13%]' : 'group-hover:-left-[13%]'} z-0`}></div>

                {/* Card Itself */}
                <motion.div 
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`p-7 lg:p-8 rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl relative z-10 backdrop-blur-md ${getStatusColor(item.status)}`}
                >
                  <h3 className={`text-xl lg:text-2xl font-bold mb-3 tracking-wide ${getStatusText(item.status)}`}>
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed opacity-80 mb-5">
                    {item.desc}
                  </p>
                  
                  {/* Status Badge */}
                  <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] lg:text-xs font-bold tracking-widest uppercase border ${item.status === 'done' ? 'bg-[#4a6cf7]/10 text-[#4a6cf7] border-[#4a6cf7]/20' : item.status === 'current' ? 'bg-[#4a6cf7] text-white border-[#4a6cf7] shadow-lg shadow-[#4a6cf7]/30' : 'bg-black/5 text-black/50 border-black/10'}`}>
                    {item.status}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  )
}
