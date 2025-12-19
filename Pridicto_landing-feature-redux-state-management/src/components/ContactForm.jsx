import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const location = useLocation();
  const quoteData = location.state;

  // Pre-fill service if quote data exists
  React.useEffect(() => {
    if (quoteData && quoteData.service) {
      setValue('service', quoteData.service);
    }
  }, [quoteData, setValue]);

  const onSubmit = (data) => {
    // Include quote data in the email
    const emailData = {
      ...data,
      quoteDetails: quoteData ? JSON.stringify(quoteData, null, 2) : 'No quote details'
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData, 'YOUR_USER_ID')
      .then(() => {
        alert('Message sent successfully!');
        reset();
      })
      .catch(() => alert('Failed to send message.'));
  };

  return (
    <div className="space-y-6">
      {quoteData && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">Your Quote Summary</h3>
          <div className="space-y-1 text-sm">
            <p><strong>Service:</strong> {quoteData.service}</p>
            <p><strong>Package:</strong> {quoteData.package}</p>
            <p><strong>Base Price:</strong> ${quoteData.basePrice?.toLocaleString()}</p>
            {quoteData.addons && quoteData.addons.length > 0 && (
              <p><strong>Add-ons:</strong> {quoteData.addons.join(', ')}</p>
            )}
            {quoteData.timelinePreference && (
              <p><strong>Timeline:</strong> {quoteData.timelinePreference}</p>
            )}
            <p><strong>Total Price:</strong> ${quoteData.totalPrice?.toLocaleString()}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('name', { required: true })}
            placeholder="Your Name"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800"
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>
        <div>
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Your Email"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800"
          />
          {errors.email && <p className="text-red-500 text-sm">Valid email is required</p>}
        </div>
        <div>
          <input
            {...register('company')}
            placeholder="Company (Optional)"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800"
          />
        </div>
        <div>
          <select
            {...register('service')}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800"
          >
            <option value="">Select Service</option>
            <option value="Business Plan Writing">Business Plan Writing</option>
            <option value="Pitch Deck Creation">Pitch Deck Creation</option>
            <option value="Financial Modelling">Financial Modelling</option>
            <option value="Market Research & Feasibility">Market Research & Feasibility</option>
            <option value="Startup Consulting">Startup Consulting</option>
            <option value="Recruitment & HR Support">Recruitment & HR Support</option>
            <option value="Construction Cost Estimation">Construction Cost Estimation</option>
            <option value="Material & Labor Estimation">Material & Labor Estimation</option>
            <option value="Budget Forecasting & Affordability">Budget Forecasting & Affordability</option>
            <option value="Feasibility Analysis for Projects">Feasibility Analysis for Projects</option>
          </select>
        </div>
        <div>
          <textarea
            {...register('message', { required: true })}
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800"
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">Message is required</p>}
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
