import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import ScheduleMeeting from "../components/ScheduleMeeting";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  const location = useLocation();
  const quoteData = location.state;

  // Prefill service from quote
  React.useEffect(() => {
    if (quoteData?.service) {
      setValue("service", quoteData.service);
    }
  }, [quoteData, setValue]);

  // CONTACT FORM SUBMIT
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          quoteDetails: quoteData || null
        })
      });

      if (!response.ok) throw new Error();

      alert("Message sent successfully!");
      reset();
    } catch {
      alert("Failed to send message");
    }
  };

  const inputClass =
    "w-full p-3 border rounded bg-white text-black " +
    "dark:bg-slate-800 dark:text-white " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="max-w-3xl mx-auto space-y-10">

      {/* QUOTE SUMMARY */}
      {quoteData && (
        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border">
          <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
            Your Quote Summary
          </h3>
          <p><b>Service:</b> {quoteData.service}</p>
          <p><b>Package:</b> {quoteData.package}</p>
          <p><b>Total:</b> ${quoteData.totalPrice}</p>
        </div>
      )}

      {/* CONTACT FORM */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            {...register("name", { required: true })}
            placeholder="Your Name"
            className={inputClass}
          />
          {errors.name && <p className="text-red-500">Name required</p>}

          <input
            {...register("email", { required: true })}
            placeholder="Your Email"
            className={inputClass}
          />
          {errors.email && <p className="text-red-500">Email required</p>}

          <input
            {...register("company")}
            placeholder="Company (optional)"
            className={inputClass}
          />

          <select
            {...register("service")}
            className={inputClass}
          >
            <option value="">Select Service</option>
            <option value="Business Plan Writing">Business Plan Writing</option>
            <option value="Pitch Deck Creation">Pitch Deck Creation</option>
            <option value="Financial Modelling">Financial Modelling</option>
            <option value="Startup Consulting">Startup Consulting</option>
          </select>

          <textarea
            {...register("message", { required: true })}
            placeholder="Your Message"
            rows={4}
            className={inputClass}
          />
          {errors.message && <p className="text-red-500">Message required</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* SCHEDULE MEETING */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Schedule a Meeting
        </h2>

        <ScheduleMeeting />
      </div>

    </div>
  );
}
