import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, Mail, Clock, User, Calendar, Tag, MessageCircle, Heart } from 'lucide-react';
import Footer from '../components/Footer';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of AI-Powered Project Estimation',
    excerpt: 'How artificial intelligence is revolutionizing how teams predict project timelines and costs',
    content: `# The Future of AI-Powered Project Estimation

Project estimation has traditionally been one of the most challenging aspects of project management. Teams rely on historical data, experience, and intuition to predict timelines and budgets, often resulting in significant overruns and missed deadlines.

## The Current State of Estimation

Today's estimation methods typically fall into three categories:

1. **Gut Feel**: Based on past experience, often prone to bias
2. **Historical Data**: Using similar past projects as reference points
3. **Bottom-up Estimation**: Breaking projects into smaller tasks and summing estimates

While these methods provide value, they come with inherent limitations:
- **Individual Bias**: Different team members estimate differently
- **Context Blindness**: Missing unique factors that impact timelines
- **Inaccuracy**: Industry studies show 40% of projects exceed estimates
- **Limited Learning**: Organizations don't systematically improve their estimation accuracy

## Why AI Changes Everything

Artificial intelligence brings several advantages to project estimation:

### 1. Pattern Recognition at Scale
AI models can analyze thousands of historical projects, identifying patterns humans might miss. These patterns include:
- How specific technologies impact timelines
- Team composition effects on velocity
- Risk factors that cause delays
- Seasonal or contextual factors

### 2. Continuous Learning
Unlike static models, AI systems improve with every project completed:
- New data is immediately incorporated
- Models adapt to your organization's unique characteristics
- Estimation accuracy improves over time
- Predictive power increases with data volume

### 3. Objective Decision Making
AI removes human bias from the equation:
- Consistent application of rules
- No "optimistic bias" inherent to humans
- Data-driven confidence intervals
- Transparent reasoning for estimates

### 4. Real-time Adjustment
AI models can incorporate new information:
- Mid-project learnings update future estimates
- Team composition changes are immediately factored in
- Resource constraints are dynamically considered
- Risk adjustments happen automatically

## The Predicto AI Advantage

Predicto AI leverages advanced machine learning to provide:

**Neural Network Architecture**: Our models use deep learning to capture complex relationships between project variables, including:
- Technology stack combinations
- Team experience levels
- Project complexity indicators
- Historical performance patterns

**Explainable AI**: We don't just give you predictions—we explain them:
- Which factors most influence your estimate
- Confidence ranges for predictions
- Risk indicators and their sources
- Alternative scenarios based on different assumptions

**Industry-Specific Models**: Different industries have different patterns:
- SaaS development differs from enterprise systems
- Consulting projects differ from product development
- Agile delivery differs from waterfall projects
- We train separate models for each context

## Real-World Impact

Organizations using AI-powered estimation report:

- **60% faster planning** cycles
- **85% higher accuracy** in initial estimates
- **45% improvement** in team productivity
- **Significant cost savings** from avoided overruns

## The Road Ahead

As AI capabilities improve, project estimation will become increasingly sophisticated:

1. **Integration with Project Intelligence**: AI will track real-time project metrics and adjust estimates automatically
2. **Predictive Alerts**: Systems will warn of potential delays before they happen
3. **Automated Resource Optimization**: AI will suggest optimal team compositions for specific projects
4. **Cross-organizational Learning**: Industry benchmarks will improve estimation accuracy
5. **Natural Language Processing**: Teams will estimate via conversation rather than forms

## Conclusion

AI-powered project estimation isn't about replacing human judgment—it's about augmenting it with data-driven insights. The future belongs to organizations that combine human experience with machine learning capabilities to make smarter, faster decisions.

The transition is happening now. Early adopters are already seeing significant competitive advantages. The question isn't whether AI will power project estimation—it's whether your organization will be ready when it does.`,
    category: 'AI & Technology',
    author: 'Sarah Chen',
    authorTitle: 'AI Research Lead',
    date: '2024-01-15',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1677442d019cecf76da5ee6b1690a29383eb5bbb8?w=1200&h=600&fit=crop',
    tags: ['AI', 'Machine Learning', 'Project Management', 'Estimation'],
    featured: true
  },
  {
    id: 2,
    title: 'Agile Estimation: Best Practices from 100+ Teams',
    excerpt: 'Learn estimation techniques that work for agile development based on data from leading organizations',
    content: `# Agile Estimation: Best Practices from 100+ Teams

Agile estimation is fundamentally different from traditional waterfall estimation. It requires different tools, mindsets, and practices. This article distills insights from 100+ agile teams to provide practical guidance.

## Understanding Agile Estimation

Agile estimation isn't about predicting the future with certainty—it's about creating shared understanding and visibility. The goal is team alignment and risk awareness, not perfect accuracy.

### Story Points vs. Hours

Story points measure complexity and uncertainty, not time:
- A 5-point story is more complex than a 2-point story
- Velocity measures team capacity
- Time conversion varies by team and sprint

### Velocity-Based Planning

Velocity is your organization's engine for planning:
- Measure actual completion over 3-5 sprints
- Plan future sprints based on historical velocity
- Track velocity trends to identify bottlenecks
- Adjust planning based on team changes

## Key Estimation Techniques

### 1. Planning Poker

Most agile teams use planning poker:
- Team members estimate independently
- Estimates are revealed simultaneously
- Discuss outliers
- Re-estimate if needed

**Pro Tips**:
- Invite domain experts
- Use relative sizing (1, 2, 3, 5, 8, 13)
- Account for dependencies
- Include time for code review and testing

### 2. T-Shirt Sizing

For high-level roadmap planning:
- XS: 1-2 days
- S: 2-5 days
- M: 1-2 weeks
- L: 2-4 weeks
- XL: 1+ months

### 3. Three-Point Estimation

Reduce uncertainty with optimistic, likely, and pessimistic estimates:
- Best case: (5 points)
- Most likely: (8 points)
- Worst case: (13 points)
- Formula: (5 + 8×4 + 13) / 6 = 9.5 points

## Common Pitfalls

### The Estimation Curse

Teams often become too confident in estimates:
- Underestimating complexity
- Ignoring historical data
- Not accounting for interruptions
- Forgetting about testing and deployment

### The Velocity Trap

Using velocity incorrectly can derail planning:
- Taking velocity as guaranteed
- Not accounting for holidays
- Ignoring team composition changes
- Using velocity to measure productivity

### The Scope Creep Problem

Without proper estimation practices, scope expands:
- Unclear requirements lead to bigger estimates
- Unclear acceptance criteria
- Unplanned dependencies
- Changing requirements mid-sprint

## Best Practices from Top Teams

### 1. Invest in Clarity

Before estimating, ensure the team understands:
- User story acceptance criteria
- Known dependencies
- Potential technical challenges
- Definition of done

**Result**: 35% reduction in estimation variance

### 2. Include Testing and Deployment

Many teams estimate only coding time:
- Include QA testing (usually 30-40% of effort)
- Include code review (10-20% of effort)
- Include deployment (5-10% of effort)
- Include documentation (5-15% of effort)

**Result**: More realistic estimates and fewer surprises

### 3. Track Estimates vs. Actuals

Compare what you estimated to what actually happened:
- Identify estimation biases
- Recognize patterns
- Improve future estimates
- Build confidence in planning

**Result**: 50% faster estimation convergence

### 4. Re-estimate Periodically

Stories change, and so should estimates:
- Re-estimate at sprint planning if more is known
- Adjust if new dependencies emerge
- Update based on recent similar work
- Use new information to improve estimates

**Result**: Better mid-sprint accuracy

## Handling Uncertainty

### The Buffer Approach

Many teams add a buffer to estimates:
- Research shows 20-30% buffer is reasonable
- Document your buffer rationale
- Adjust buffer based on history
- Communicate buffers explicitly

### The Confidence Approach

Instead of single estimates, provide ranges:
- "8 points, high confidence"
- "13 points, medium confidence"
- "20 points, low confidence"
- Helps with planning and risk management

### The Spike Approach

For high-uncertainty items:
- Allocate a spike/research story first
- Reduce uncertainty with investigation
- Re-estimate after spike completion
- Include spike time in planning

## Metrics That Matter

### Estimation Accuracy

Track the ratio of estimated vs. actual points:
- 90-110%: Excellent estimation
- 80-120%: Good estimation
- 50-150%: Poor estimation
- <50% or >150%: Major issues

### Velocity Stability

Stable velocity enables reliable planning:
- Target <15% variance sprint-to-sprint
- Investigate significant swings
- Account for team size changes
- Plan for holidays and absences

### Scope Stability

How much scope changes during a sprint:
- <10%: Excellent control
- 10-20%: Good control
- 20-50%: Scope creep
- >50%: Major process issues

## Conclusion

Agile estimation is a skill that improves with practice and data. By following these best practices, tracking metrics, and continuously improving your process, you'll build a team that estimates well and delivers reliably.`,
    category: 'Agile & Management',
    author: 'Marcus Rodriguez',
    authorTitle: 'Agile Coach',
    date: '2024-01-10',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    tags: ['Agile', 'Estimation', 'Planning', 'Best Practices'],
    featured: true
  }
];

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));
  const [liked, setLiked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 from-gray-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 text-white mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-brand-600 text-accent-400 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(
    p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t)))
  );

  const shareUrl = `${window.location.origin}/blog/${post.id}`;
  const shareText = `Check out: ${post.title}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50 from-gray-900 via-blue-950 to-emerald-950">
      {/* Header */}
      <div className="bg-white bg-gray-800 border-b-2 border-gray-200 border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-brand-600 text-accent-400 hover:gap-3 transition-all mb-6 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-brand-100 bg-brand-900/30 text-brand-700 text-brand-300 text-xs font-semibold rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-600 text-gray-400">
                <Clock className="w-4 h-4" /> {post.readTime} min read
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 text-white mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto px-6 py-8"
      >
        <img src={post.image} alt={post.title} className="rounded-2xl shadow-xl border-2 border-gray-200 border-gray-700 w-full h-96 object-cover" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:col-span-3 prose prose-invert max-w-none"
        >
          <div className="bg-white bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 border-gray-700 space-y-6">
            {post.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('#')) {
                const level = paragraph.match(/^#+/)[0].length;
                const text = paragraph.replace(/^#+\s/, '');
                const Heading = `h${level}`;
                return (
                  <Heading key={i} className={`text-${4 - level}xl font-bold text-gray-900 text-white mt-8 mb-4`}>
                    {text}
                  </Heading>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={i} className="list-disc list-inside space-y-2 text-gray-700 text-gray-300">
                    {paragraph.split('\n').map((item, ii) => (
                      <li key={ii}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={i} className="text-gray-700 text-gray-300 leading-relaxed">{paragraph}</p>;
            })}
          </div>

          {/* Article Footer */}
          <div className="mt-12 p-6 bg-gradient-to-r from-brand-50 to-accent-50 from-brand-900/20 to-accent-900/20 rounded-2xl border-2 border-brand-200 border-brand-700">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-white mb-2">About {post.author}</h3>
                <p className="text-sm text-gray-700 text-gray-300">{post.authorTitle} at Predicto AI with {post.readTime} years of experience.</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-white font-bold text-2xl">
                {post.author.charAt(0)}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gray-100 bg-gray-700 text-gray-700 text-gray-300 rounded-full text-sm font-semibold hover:bg-brand-100 hover:bg-brand-900/30 transition-colors"
                >
                  <Tag className="w-3 h-3 inline mr-2" /> {tag}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Comments Section Placeholder */}
          <div className="mt-12 p-8 bg-white bg-gray-800 rounded-2xl border-2 border-gray-200 border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 text-white mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6" /> Comments
            </h3>
            <div className="mb-6">
              <textarea
                placeholder="Share your thoughts on this article..."
                className="w-full p-4 border-2 border-gray-200 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-white placeholder-gray-500 placeholder-gray-400 resize-none"
                rows="4"
              />
              <button className="mt-3 px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-semibold">
                Post Comment
              </button>
            </div>
            <div className="space-y-4 text-gray-600 text-gray-400">
              <p className="text-sm">Comments coming soon...</p>
            </div>
          </div>
        </motion.article>

        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Share Buttons */}
          <div className="sticky top-8 bg-white bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 border-gray-700">
            <h3 className="font-bold text-gray-900 text-white mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5" /> Share
            </h3>
            <div className="space-y-3">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-3 bg-blue-50 bg-blue-900/20 text-blue-600 text-blue-400 rounded-lg hover:bg-blue-100 hover:bg-blue-900/40 transition-colors font-semibold"
              >
                <Facebook className="w-5 h-5" /> Facebook
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-3 bg-sky-50 bg-sky-900/20 text-sky-600 text-sky-400 rounded-lg hover:bg-sky-100 hover:bg-sky-900/40 transition-colors font-semibold"
              >
                <Twitter className="w-5 h-5" /> Twitter
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-3 bg-linkedin-50 bg-blue-900/20 text-blue-700 text-blue-400 rounded-lg hover:bg-blue-100 hover:bg-blue-900/40 transition-colors font-semibold"
              >
                <Linkedin className="w-5 h-5" /> LinkedIn
              </motion.a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert('Link copied to clipboard!');
                }}
                className="flex items-center gap-3 w-full p-3 bg-gray-100 bg-gray-700 text-gray-700 text-gray-300 rounded-lg hover:bg-gray-200 hover:bg-gray-600 transition-colors font-semibold"
              >
                <Mail className="w-5 h-5" /> Copy Link
              </button>
            </div>
          </div>

          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLiked(!liked)}
            className={`w-full p-4 rounded-2xl border-2 font-semibold flex items-center justify-center gap-2 transition-all ${
              liked
                ? 'bg-red-50 bg-red-900/20 border-red-200 border-red-700 text-red-600 text-red-400'
                : 'bg-white bg-gray-800 border-gray-200 border-gray-700 text-gray-700 text-gray-300 hover:border-red-200 hover:border-red-700'
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            {liked ? 'Liked!' : 'Like this post'}
          </motion.button>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="bg-white bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 border-gray-700">
              <h3 className="font-bold text-gray-900 text-white mb-4">Related Posts</h3>
              <div className="space-y-3">
                {relatedPosts.slice(0, 3).map((relPost) => (
                  <Link
                    key={relPost.id}
                    to={`/blog/${relPost.id}`}
                    className="p-3 rounded-lg bg-gray-50 bg-gray-700 hover:bg-brand-50 hover:bg-brand-900/20 transition-colors group"
                  >
                    <p className="text-sm font-semibold text-gray-900 text-white group-hover:text-brand-600 group-hover:text-accent-400 line-clamp-2">
                      {relPost.title}
                    </p>
                    <p className="text-xs text-gray-600 text-gray-400 mt-1">{relPost.category}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="bg-gradient-to-br from-brand-600 to-accent-500 p-6 rounded-2xl text-white">
            <h3 className="font-bold mb-2">Get More Articles</h3>
            <p className="text-sm text-white/90 mb-4">Subscribe to our newsletter for more insights on project estimation and management.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="input-base flex-1 text-sm" />
              <button className="px-4 py-2 bg-white text-brand-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.aside>
      </div>

      <Footer />
    </div>
  );
}
