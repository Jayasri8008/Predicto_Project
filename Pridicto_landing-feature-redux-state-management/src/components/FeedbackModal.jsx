import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { MessageSquare, X, Star, Send, ThumbsUp } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [npsScore, setNpsScore] = useState(0);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          name: data.name || 'Anonymous',
          email: data.email || 'no-reply@predicto.ai',
          rating: rating,
          npsScore: npsScore,
          detailedComments: data.detailedComments,
          featureSuggestions: selectedSuggestions.join(', '),
          feedback: data.feedback,
          message: `Feedback from ${data.name || 'Anonymous'}: Rating ${rating}/5, NPS ${npsScore}/10 - ${data.feedback}`
        },
        'YOUR_USER_ID' // Replace with your EmailJS user ID
      );
      setIsSubmitted(true);
      reset();
      setRating(0);
      setNpsScore(0);
      setSelectedSuggestions([]);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestionChange = (suggestion) => {
    setSelectedSuggestions(prev =>
      prev.includes(suggestion)
        ? prev.filter(s => s !== suggestion)
        : [...prev, suggestion]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Thank You!
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your feedback has been submitted successfully.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Share Your Feedback
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Help us improve by sharing your thoughts and suggestions.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    How would you rate your experience?
                  </label>
                  <div className="flex gap-1 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          } hover:text-yellow-400 transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Name (Optional)
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Your name"
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    {...register('email', {
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email'
                      }
                    })}
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* NPS Score */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    NPS Score (0-10)
                  </label>
                  <div className="flex gap-1 justify-center">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setNpsScore(score)}
                        className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                          npsScore === score
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-slate-500'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detailed Comments */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Detailed Comments
                  </label>
                  <textarea
                    {...register('detailedComments')}
                    placeholder="Please provide more detailed feedback..."
                    rows="3"
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                {/* Feature Suggestions */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Feature Suggestions
                  </label>
                  <div className="space-y-2">
                    {['Better UI/UX', 'More Integrations', 'Advanced Analytics', 'Mobile App', 'API Access', 'Custom Reports'].map(suggestion => (
                      <label key={suggestion} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedSuggestions.includes(suggestion)}
                          onChange={() => handleSuggestionChange(suggestion)}
                          className="mr-2"
                        />
                        {suggestion}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Your Feedback *
                  </label>
                  <textarea
                    {...register('feedback', { required: 'Please provide your feedback' })}
                    placeholder="Tell us what you think..."
                    rows="4"
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                  />
                  {errors.feedback && (
                    <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-600 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Feedback
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                Your feedback helps us improve our services.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
