// Experience Timeline Component
import { motion } from 'framer-motion';

interface Experience {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  location: string;
  workType: string;
  description?: string;
  skills: string[];
  color: string;
  icon?: string;
  isLeadership?: boolean;
}

const experiences: Experience[] = [
  {
    id: "mezzedata",
    title: "Junior Software Developer",
    company: "MezzeData Limited",
    companyUrl: "https://www.linkedin.com/company/mezzedata-limited",
    employmentType: "Part-time",
    startDate: "Apr 2025",
    endDate: "Present",
    location: "Isle of Man",
    workType: "Remote",
    skills: [],
    color: "bg-orange-500",
  },
  {
    id: "loads-traffic-current",
    title: "Affiliate Executive and Software Developer",
    company: "Loads of Traffic",
    companyUrl: "https://www.linkedin.com/company/loads-of-traffic/",
    employmentType: "Part-time",
    startDate: "Jun 2023",
    endDate: "Present",
    location: "Douglas, Isle of Man",
    workType: "Hybrid",
    description: "Spearheading affiliate marketing initiatives and enhancing partnership strategies to drive traffic and engagement, whilst also focusing on competitor intelligence and market penetration strategies.",
    skills: ["Marketing", "Python", "VBA", "Project Management", "Analytics", "Automation"],
    color: "bg-rose-600"
  },
  {
    id: "pdms",
    title: "Software Developer Internship",
    company: "PDMS",
    companyUrl: "https://www.linkedin.com/company/pdms/",
    employmentType: "Internship",
    startDate: "Sep 2024",
    endDate: "Sep 2024",
    location: "Isle of Man",
    workType: "On-site",
    skills: ["Front-End Development", "Business Analysis", "Testing", "UX", "Project Management"],
    color: "bg-sky-600"
  },
  {
    id: "loads-traffic-junior",
    title: "Junior Web Developer",
    company: "Loads of Traffic",
    companyUrl: "https://www.linkedin.com/company/loads-of-traffic/",
    employmentType: "Internship",
    startDate: "Jun 2022",
    endDate: "Aug 2022",
    location: "Douglas, Isle of Man",
    workType: "On-site",
    description: "Assisted in the development and maintenance of client websites, implementing responsive designs and improving user experience.",
    skills: ["Web Development", "Web Design"],
    color: "bg-rose-600"
  },
  {
    id: "panthera",
    title: "Managing Director (Company of the Year Competition)",
    company: "Panthera",
    companyUrl: "https://www.linkedin.com/company/panthera/",
    employmentType: "Full-time",
    startDate: "Sep 2021",
    endDate: "Jul 2022",
    location: "Douglas, Isle of Man",
    workType: "Hybrid",
    description: "Led a team in developing a student lifestyle app, earning several awards, including the Leadership accolade and Companies choice.",
    skills: ["Leadership", "App Development", "Project Management", "Software Development"],
    color: "bg-sky-900",
    isLeadership: true
  },
  {
    id: "pushologies",
    title: "Junior Graphic Designer",
    company: "Pushologies",
    companyUrl: "https://www.linkedin.com/company/pushologies/",
    employmentType: "Internship",
    startDate: "Mar 2020",
    endDate: "Mar 2020",
    location: "Douglas, Isle of Man",
    workType: "Hybrid",
    description: "Designed graphics for use in various marketing materials, including push notifications and social media.",
    skills: ["Marketing", "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign"],
    color: "bg-blue-800"
  }
];

export default function Timeline() {
  const getCompanyInitial = (company: string) => {
    return company.charAt(0).toUpperCase();
  };

  const getCompanyColorClass = (color: string) => {
    return color.replace('bg-', 'text-');
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    if (endDate === "Present") {
      return `${startDate} - Present`;
    }
    if (startDate === endDate) {
      return startDate;
    }
    return `${startDate} - ${endDate}`;
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const parseDate = (dateStr: string) => {
      if (dateStr === "Present") {
        return new Date();
      }
      const [month, year] = dateStr.split(' ');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthIndex = monthNames.indexOf(month);
      return new Date(parseInt(year), monthIndex);
    };

    const start = parseDate(startDate);
    const end = parseDate(endDate);
    
    const yearsDiff = end.getFullYear() - start.getFullYear();
    const monthsDiff = end.getMonth() - start.getMonth();
    
    let totalMonths = yearsDiff * 12 + monthsDiff;
    
    // Handle same month cases (like "Sep 2024" to "Sep 2024")
    if (startDate === endDate) {
      totalMonths = 1;
    }
    
    if (totalMonths < 1) {
      totalMonths = 1;
    }

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0) {
      return months === 1 ? "1 month" : `${months} months`;
    } else if (months === 0) {
      return years === 1 ? "1 year" : `${years} years`;
    } else {
      const yearStr = years === 1 ? "1 year" : `${years} years`;
      const monthStr = months === 1 ? "1 month" : `${months} months`;
      return `${yearStr} ${monthStr}`;
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-8 mb-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -2 }}
    >
      <motion.div 
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800">Experience</h2>
        <motion.a 
          href="https://www.linkedin.com/in/dominichubble/details/experience/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          View on LinkedIn
        </motion.a>
      </motion.div>
      
      {experiences.map((exp, index) => (
        <motion.div 
          key={exp.id}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          {/* Date Header */}
          <div className="ps-2 my-2 first:mt-0">
            <h3 className="text-xs font-medium uppercase text-gray-500">
              {formatDateRange(exp.startDate, exp.endDate)}
            </h3>
          </div>
          
          {/* Experience Item */}
          <div className="flex gap-x-3">
            <div className={`relative ${index !== experiences.length - 1 ? 'after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200' : ''}`}>
              <div className="relative z-10 size-7 flex justify-center items-center">
                <motion.span 
                  className={`flex shrink-0 justify-center items-center size-7 ${exp.color} text-white text-sm font-semibold uppercase rounded-full`}
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {getCompanyInitial(exp.company)}
                </motion.span>
              </div>
            </div>
            
            <motion.div 
              className="grow pt-0.5 pb-8"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className={`font-semibold text-gray-800 ${exp.isLeadership ? 'flex gap-x-1.5' : ''}`}>
                {exp.isLeadership && (
                  <motion.svg 
                    className={`shrink-0 size-4 mt-1 ${getCompanyColorClass(exp.color)}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    animate={{ rotate: 5 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <path fillRule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21-.899-.408-1.835-.578-2.516zm12.851.344a29.928 29.928 0 00-.578 2.516c.507-.29 1.026-.564 1.554-.82a.75.75 0 00.419-.74 41.029 41.029 0 00-.39-3.114 29.85 29.85 0 00-2.455 1.158zm-12.24 7.405a.75.75 0 00.735.99 39.029 39.029 0 003.861-1.867.75.75 0 00.38-.652v-1.892c0-.287-.165-.55-.415-.677a31.504 31.504 0 01-4.561-3.949zm8.111-.077a.75.75 0 00-.735.99 39.029 39.029 0 01-3.861-1.867.75.75 0 01-.38-.652v-1.892c0-.287.165-.55.415-.677a31.504 31.504 0 004.561-3.949z" clipRule="evenodd" />
                  </motion.svg>
                )}
                <a 
                  href="https://www.linkedin.com/in/dominichubble/details/experience/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {exp.title}
                </a>
              </h3>
              
              <h4 className={`text-sm ${getCompanyColorClass(exp.color)} font-medium`}>
                {exp.companyUrl ? (
                  <a 
                    href={exp.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )} · {exp.employmentType}
              </h4>
              
              <p className="mt-1 text-sm text-gray-600">
                {exp.location} · {exp.workType} · {calculateDuration(exp.startDate, exp.endDate)}
              </p>
              
              {exp.description && (
                <p className="mt-2 text-sm text-gray-600">
                  {exp.description}
                </p>
              )}
              
              {exp.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {exp.skills.map((skill, skillIndex) => (
                    <motion.span 
                      key={skill} 
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs cursor-pointer hover:bg-gray-200 transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (index * 0.1) + (skillIndex * 0.05), duration: 0.3 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
