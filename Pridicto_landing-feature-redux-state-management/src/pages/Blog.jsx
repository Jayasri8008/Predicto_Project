import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Footer from '../components/Footer';

const blogPosts = [
  {
    id: 1,
    title: 'How AI Improves Project Estimation Accuracy by 70%',
    excerpt: 'Discover how machine learning algorithms analyze project data to predict timelines with unprecedented accuracy.',
    content: 'Machine learning has revolutionized how teams estimate projects. By analyzing historical data, team composition, and project complexity, AI can now predict project timelines within 70% accuracy...',
    category: 'AI & Technology',
    author: 'Sarah Chen',
    date: '2025-11-20',
    image: 'https://images.unsplash.com/photo-1677442d019cecf8f80f1a18888c10ad9c57da05ad1e02f5003d5b0b00ceeb04?w=800&h=400&fit=crop',
    readTime: '8 min read',
    featured: true,
    tags: ['AI', 'Estimation', 'Machine Learning']
  },
  {
    id: 2,
    title: 'Best Practices for Agile Project Planning',
    excerpt: 'Learn proven strategies for successful agile implementations and sprint planning.',
    content: 'Agile methodology has become the standard for modern software development. In this comprehensive guide, we explore the best practices that leading companies use...',
    category: 'Agile & Management',
    author: 'Marcus Rodriguez',
    date: '2025-11-18',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    readTime: '10 min read',
    featured: true,
    tags: ['Agile', 'Planning', 'Management']
  },
  {
    id: 3,
    title: 'Cost Forecasting Techniques for Startups',
    excerpt: 'Master cost estimation methods that startups use to manage budgets effectively.',
    content: 'Budget constraints are a reality for most startups. Learn how to estimate costs accurately without sacrificing quality...',
    category: 'Business & Finance',
    author: 'Priya Kapoor',
    date: '2025-11-15',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
    readTime: '6 min read',
    featured: false,
    tags: ['Finance', 'Startups', 'Cost']
  },
  {
    id: 4,
    title: 'Real-Time Collaboration Tools: Choosing the Right One',
    excerpt: 'Compare top collaboration platforms and find the perfect fit for your team.',
    content: 'With remote work becoming standard, real-time collaboration is crucial. We analyze the top tools available...',
    category: 'Team & Collaboration',
    author: 'Alex Thompson',
    date: '2025-11-12',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    readTime: '7 min read',
    featured: false,
    tags: ['Collaboration', 'Remote', 'Tools']
  },
  {
    id: 5,
    title: 'Data-Driven Decision Making in Project Management',
    excerpt: 'Use analytics to make smarter project decisions and improve outcomes.',
    content: 'Data is the new gold. Learn how to leverage project metrics and KPIs to make better decisions...',
    category: 'Analytics',
    author: 'Emma Wilson',
    date: '2025-11-10',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    readTime: '9 min read',
    featured: false,
    tags: ['Analytics', 'Data', 'Decision']
  },
  {
    id: 6,
    title: 'Risk Management Strategies for Complex Projects',
    excerpt: 'Identify and mitigate risks before they impact your project timeline.',
    content: 'Every project carries risks. Discover how experienced PMs identify and manage them proactively...',
    category: 'Risk Management',
    author: 'James Chen',
    date: '2025-11-08',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    readTime: '8 min read',
    featured: false,
    tags: ['Risk', 'Management', 'Strategy']
  }
];

const categories = ['All', 'AI & Technology', 'Agile & Management', 'Business & Finance', 'Team & Collaboration', 'Analytics', 'Risk Management'];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchTerm, selectedCategory, selectedTag]);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50 from-gray-900 via-blue-950 to-emerald-950">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Insights & Resources</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Stay updated with the latest trends in project estimation, agile management, and team collaboration
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-8 bg-gradient-to-r from-brand-600 to-accent-600 from-accent-400 to-brand-400 bg-clip-text text-transparent"
            >
              Featured Stories
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -8 }}
                  className="group rounded-2xl overflow-hidden border-2 border-gray-200 border-gray-700 bg-white bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="relative overflow-hidden h-64">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-brand-600 text-white text-sm font-semibold rounded-full">Featured</span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-brand-600 text-accent-400 font-semibold uppercase mb-2">{post.category}</p>
                    <h3 className="text-2xl font-bold text-gray-900 text-white mb-3 group-hover:text-brand-600 group-hover:text-accent-400 transition">{post.title}</h3>
                    <p className="text-gray-600 text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 text-gray-400 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString()}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-brand-600 text-accent-400 font-semibold hover:gap-3 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* Search & Filters */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, tutorials, and guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 border-gray-700 bg-white bg-gray-800 text-gray-900 text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow-lg'
                      : 'border-2 border-gray-200 border-gray-700 text-gray-700 text-gray-300 hover:border-brand-500'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Active Tags */}
            {selectedTag && (
              <div className="flex items-center gap-2 p-3 bg-brand-50 bg-brand-900/20 rounded-lg border border-brand-200 border-brand-800">
                <Tag className="w-4 h-4 text-brand-600 text-accent-400" />
                <span className="text-brand-700 text-accent-300 font-semibold">{selectedTag}</span>
                <button
                  onClick={() => setSelectedTag(null)}
                  className="ml-auto text-brand-600 text-accent-400 hover:text-brand-700 font-bold"
                >
                  ✕
                </button>
              </div>
            )}
          </motion.div>
        </section>

        {/* Blog Posts Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8 }}
                className="rounded-xl overflow-hidden border-2 border-gray-200 border-gray-700 bg-white bg-gray-800 shadow-md hover:shadow-lg transition-all"
              >
                <div className="relative overflow-hidden h-48">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-6">
                  <p className="text-xs text-brand-600 text-accent-400 font-bold uppercase mb-2">{post.category}</p>
                  <h3 className="text-lg font-bold text-gray-900 text-white mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className="text-xs px-2 py-1 bg-gray-100 bg-gray-700 text-gray-700 text-gray-300 rounded hover:bg-brand-100 hover:bg-brand-900/30 transition"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" /> {post.author}
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-brand-600 text-accent-400 font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Read Article <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-gray-600 text-gray-400 text-lg">No articles found. Try adjusting your filters.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 py-12 px-8 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 from-brand-900 via-brand-800 to-accent-800 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest insights on project estimation, agile management, and industry best practices delivered to your inbox weekly.
          </p>
          <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button className="px-6 py-3 bg-white text-brand-600 font-bold rounded-lg hover:bg-gray-100 transition-all">
              Subscribe
            </button>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}
