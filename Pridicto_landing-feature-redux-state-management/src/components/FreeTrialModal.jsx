import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { X, CheckCircle } from 'lucide-react';

export default function FreeTrialModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          message: `New free trial request from ${data.name} (${data.email}, ${data.mobile})`
        },
        'YOUR_USER_ID' // Replace with your EmailJS user ID
      );
      setIsSubmitted(true);
      reset();
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full relative">
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
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Thank You!
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your free trial request has been submitted. We'll contact you soon!
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Start Your Free Trial
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Fill in your details to begin your 14-day free trial
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email'
                      }
                    })}
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    {...register('mobile', {
                      required: 'Mobile number is required',
                      pattern: {
                        value: /^\+?[\d\s\-\(\)]+$/,
                        message: 'Please enter a valid mobile number'
                      }
                    })}
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-600 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25"
                >
                  {isSubmitting ? 'Submitting...' : 'Start Free Trial'}
                </button>
              </form>

              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                By starting your trial, you agree to our Terms of Service and Privacy Policy.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
