import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Award, Download } from 'lucide-react';

const CertificateCard = ({ certificate, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-effect rounded-xl overflow-hidden group cursor-pointer transition-all duration-300"
    >
      {/* Certificate Header */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Award size={48} className="text-primary-400" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
        
        {/* Organization Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary-500/80 text-white text-xs font-medium rounded-full">
            {certificate.organization}
          </span>
        </div>

        {/* Date */}
        <div className="absolute top-4 right-4 flex items-center gap-1 text-white/80 text-sm">
          <Calendar size={14} />
          <span>{certificate.date}</span>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
          {certificate.title}
        </h3>
        
        <p className="text-gray-400 mb-4 leading-relaxed">
          {certificate.description}
        </p>

        {/* Skills/Topics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {certificate.skills.map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="px-2 py-1 bg-dark-700 text-gray-400 text-xs rounded"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <motion.a
            href={certificate.viewLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors duration-300"
          >
            View Certificate
            <ExternalLink size={16} />
          </motion.a>
          
          {certificate.downloadLink && (
            <motion.a
              href={certificate.downloadLink}
              download
              whileHover={{ scale: 1.1 }}
              className="p-2 text-gray-400 hover:text-primary-400 transition-colors duration-300"
              title="Download Certificate"
            >
              <Download size={16} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Certificates = () => {
  const ref = useRef(null);

  const certificates = [
    {
      title: "MongoDB Developer Certification",
      organization: "MongoDB University",
      date: "September 2023",
      description: "Database design, query optimization, indexing, and advanced MongoDB features for scalable applications.",
      skills: ["MongoDB", "Database Design", "Query Optimization", "Indexing"],
      viewLink: "https://university.mongodb.com/verify/example4",
      downloadLink: "/certificates/mongodb-developer.pdf"
    }
  ];

  return (
    <section id="certificates" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Certificates</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Professional certifications and achievements that demonstrate my expertise 
            in various technologies and development practices.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.map((certificate, index) => (
            <CertificateCard key={certificate.title} certificate={certificate} index={index} />
          ))}
        </motion.div>

        {/* View All Certificates Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://linkedin.com/in/anishma-rs/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="button-secondary inline-flex items-center gap-2"
          >
            <ExternalLink size={20} />
            View All Certificates
          </motion.a>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="glass-effect p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">
              Continuous <span className="gradient-text">Learning</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              I believe in continuous learning and staying updated with the latest technologies. 
              These certifications represent my commitment to professional growth and expertise in modern web development.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Award size={16} className="text-primary-400" />
                {certificates.length} Certificates Earned
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-primary-400" />
                Latest: {certificates[0].date}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;

