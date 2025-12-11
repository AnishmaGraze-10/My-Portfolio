// Analytics service for tracking user interactions
class Analytics {
  constructor() {
    this.isInitialized = false;
    this.events = [];
  }

  // Initialize analytics (Google Analytics or privacy-focused alternatives)
  init() {
    if (this.isInitialized) return;

    // Check if Google Analytics is available
    if (typeof window !== 'undefined' && window.gtag) {
      this.isInitialized = true;
      console.log('Google Analytics initialized');
    } else {
      // Fallback to local analytics
      this.isInitialized = true;
      console.log('Local analytics initialized');
    }
  }

  // Track page views
  trackPageView(page) {
    this.init();
    
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: page,
        page_location: window.location.href,
      });
    } else {
      this.trackEvent('page_view', { page });
    }
  }

  // Track custom events
  trackEvent(eventName, parameters = {}) {
    this.init();
    
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    } else {
      // Store locally for privacy-focused analytics
      this.events.push({
        event: eventName,
        parameters,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      });
      
      // Keep only last 100 events
      if (this.events.length > 100) {
        this.events = this.events.slice(-100);
      }
      
      // Save to localStorage
      try {
        localStorage.setItem('portfolio_analytics', JSON.stringify(this.events));
      } catch (error) {
        console.warn('Could not save analytics to localStorage:', error);
      }
    }
  }

  // Track project clicks
  trackProjectClick(projectTitle, projectUrl) {
    this.trackEvent('project_click', {
      project_title: projectTitle,
      project_url: projectUrl,
      category: 'engagement'
    });
  }

  // Track resume downloads
  trackResumeDownload() {
    this.trackEvent('resume_download', {
      category: 'engagement',
      value: 1
    });
  }

  // Track contact form submissions
  trackContactSubmission(success = true) {
    this.trackEvent('contact_submission', {
      success,
      category: 'engagement'
    });
  }

  // Track theme toggle
  trackThemeToggle(isDark) {
    this.trackEvent('theme_toggle', {
      theme: isDark ? 'dark' : 'light',
      category: 'preference'
    });
  }

  // Track search queries
  trackSearchQuery(query, resultsCount) {
    this.trackEvent('project_search', {
      search_term: query,
      results_count: resultsCount,
      category: 'engagement'
    });
  }

  // Track social media clicks
  trackSocialClick(platform, url) {
    this.trackEvent('social_click', {
      platform,
      url,
      category: 'engagement'
    });
  }

  // Track scroll depth
  trackScrollDepth(depth) {
    this.trackEvent('scroll_depth', {
      depth_percentage: depth,
      category: 'engagement'
    });
  }

  // Track time on page
  trackTimeOnPage(duration) {
    this.trackEvent('time_on_page', {
      duration_seconds: duration,
      category: 'engagement'
    });
  }

  // Get analytics data (for privacy-focused analytics)
  getAnalyticsData() {
    try {
      const data = localStorage.getItem('portfolio_analytics');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.warn('Could not load analytics data:', error);
      return [];
    }
  }

  // Clear analytics data
  clearAnalyticsData() {
    try {
      localStorage.removeItem('portfolio_analytics');
      this.events = [];
    } catch (error) {
      console.warn('Could not clear analytics data:', error);
    }
  }

  // Export analytics data
  exportAnalyticsData() {
    const data = this.getAnalyticsData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Create singleton instance
const analytics = new Analytics();

// Initialize on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    analytics.init();
    analytics.trackPageView('Portfolio Home');
  });
}

export default analytics; 