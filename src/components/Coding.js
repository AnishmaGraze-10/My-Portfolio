import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, GitBranch, Star, Eye, TrendingUp } from 'lucide-react';

// Helper function to calculate longest streak - moved outside component
const calculateLongestStreak = (data) => {
  let currentStreak = 0;
  let longestStreak = 0;
  
  for (const day of data) {
    if (day.level > 0) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }
  
  return longestStreak;
};

const Coding = () => {
  const ref = useRef(null);

  const githubStats = [
    { label: 'Repositories', value: '45+', icon: GitBranch },
    { label: 'Stars Earned', value: '1.2k+', icon: Star },
    { label: 'Contributions', value: '2.5k+', icon: TrendingUp },
    { label: 'Profile Views', value: '15k+', icon: Eye },
  ];

  const topLanguages = [
    { name: 'JavaScript', percentage: 35, color: '#f7df1e' },
    { name: 'TypeScript', percentage: 25, color: '#3178c6' },
    { name: 'Python', percentage: 20, color: '#3776ab' },
    { name: 'Java', percentage: 15, color: '#ed8b00' },
    { name: 'Go', percentage: 5, color: '#00add8' },
  ];

  const recentRepos = [
    {
      name: 'portfolio-website',
      description: 'Interactive portfolio website with 3D animations and modern design',
      language: 'React',
      stars: 45,
      forks: 12,
      updated: '2 days ago'
    },
    {
      name: 'ai-chat-app',
      description: 'Real-time chat application powered by OpenAI API',
      language: 'Next.js',
      stars: 89,
      forks: 23,
      updated: '1 week ago'
    },
    {
      name: 'ecommerce-platform',
      description: 'Full-stack e-commerce platform with payment integration',
      language: 'Node.js',
      stars: 156,
      forks: 34,
      updated: '2 weeks ago'
    }
  ];

  // Generate consistent activity data with more realistic patterns
  const activityData = useMemo(() => {
    const data = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Create a more realistic activity pattern
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isRecent = i < 30; // More activity in recent days
      const isHoliday = date.getMonth() === 11 && date.getDate() >= 20; // Holiday season
      
      let activityLevel;
      if (isRecent) {
        // Recent days have higher activity
        activityLevel = Math.random() > 0.25 ? Math.floor(Math.random() * 4) + 1 : 0;
      } else if (isHoliday) {
        // Holiday season has lower activity
        activityLevel = Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 1 : 0;
      } else if (isWeekend) {
        // Weekends have moderate activity
        activityLevel = Math.random() > 0.4 ? Math.floor(Math.random() * 3) + 1 : 0;
      } else {
        // Weekdays have varied activity
        activityLevel = Math.random() > 0.35 ? Math.floor(Math.random() * 4) : 0;
      }
      
      data.push({
        date,
        level: activityLevel,
        dayOfWeek
      });
    }
    
    return data;
  }, []);

  const getActivityColor = (level) => {
    switch (level) {
      case 0: return 'bg-dark-700';
      case 1: return 'bg-primary-300';
      case 2: return 'bg-primary-400';
      case 3: return 'bg-primary-500';
      case 4: return 'bg-primary-600';
      default: return 'bg-dark-700';
    }
  };

  const getActivityDescription = (level) => {
    switch (level) {
      case 0: return 'No contributions';
      case 1: return '1-3 contributions';
      case 2: return '4-6 contributions';
      case 3: return '7-9 contributions';
      case 4: return '10+ contributions';
      default: return 'No contributions';
    }
  };

  // Calculate activity statistics
  const activityStats = useMemo(() => {
    const totalDays = activityData.length;
    const activeDays = activityData.filter(day => day.level > 0).length;
    const totalContributions = activityData.reduce((sum, day) => sum + day.level, 0);
    const averageContributions = totalContributions / totalDays;
    const longestStreak = calculateLongestStreak(activityData);
    
    return {
      totalDays,
      activeDays,
      totalContributions,
      averageContributions: averageContributions.toFixed(1),
      longestStreak
    };
  }, [activityData]);

  return (
    <section id="coding" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Coding <span className="gradient-text">Activity</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            My GitHub activity, contributions, and open-source projects that showcase 
            my passion for coding and community involvement.
          </p>
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {githubStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-6 rounded-xl text-center"
            >
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon size={24} className="text-primary-400" />
              </div>
              <div className="text-2xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Top Languages */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6">
              Top <span className="gradient-text">Languages</span>
            </h3>
            <div className="glass-effect p-6 rounded-xl">
              {topLanguages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="mb-4 last:mb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      ></div>
                      <span className="text-white font-medium">{lang.name}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                      className="h-2 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Repositories */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6">
              Recent <span className="gradient-text">Repositories</span>
            </h3>
            <div className="space-y-4">
              {recentRepos.map((repo, index) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="glass-effect p-4 rounded-xl hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white hover:text-primary-400 transition-colors duration-300">
                      {repo.name}
                    </h4>
                    <span className="text-xs text-gray-500">{repo.updated}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    {repo.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">{repo.language}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Star size={12} />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <GitBranch size={12} />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                    <motion.a
                      href={`https://github.com/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-primary-400 hover:text-primary-300 transition-colors duration-300"
                    >
                      <Github size={16} />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* GitHub Activity Graph */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">
              GitHub <span className="gradient-text">Activity</span>
            </h3>
            
            {/* Activity Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">{activityStats.totalDays}</div>
                <div className="text-sm text-gray-400">Total Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">{activityStats.activeDays}</div>
                <div className="text-sm text-gray-400">Active Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">{activityStats.totalContributions}</div>
                <div className="text-sm text-gray-400">Total Contributions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">{activityStats.longestStreak}</div>
                <div className="text-sm text-gray-400">Longest Streak</div>
              </div>
            </div>
            
            <div className="bg-dark-800 rounded-lg p-6">
              {/* Activity Graph Container */}
              <div className="overflow-x-auto">
                <div className="grid grid-cols-52 gap-1 min-w-max">
                  {activityData.map((day, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.002, duration: 0.1 }}
                      className={`w-3 h-3 rounded-sm transition-all duration-200 hover:scale-125 hover:z-10 ${getActivityColor(day.level)}`}
                      title={`${day.date.toLocaleDateString()}: ${getActivityDescription(day.level)}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                <span>Less</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-dark-700 rounded-sm"></div>
                  <div className="w-3 h-3 bg-primary-300 rounded-sm"></div>
                  <div className="w-3 h-3 bg-primary-400 rounded-sm"></div>
                  <div className="w-3 h-3 bg-primary-500 rounded-sm"></div>
                  <div className="w-3 h-3 bg-primary-600 rounded-sm"></div>
                </div>
                <span>More</span>
              </div>
              
              {/* Activity Summary */}
              <div className="mt-4 text-center text-sm text-gray-400">
                <span>
                  {activityStats.totalDays} days of activity • {activityStats.activeDays} days with contributions • 
                  Average: {activityStats.averageContributions} contributions/day
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary inline-flex items-center gap-2"
          >
            <Github size={20} />
            View My GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Coding; 