import React from "react";
import { useForm } from "react-hook-form";

export default function ScheduleMeeting() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log("🔥 MEETING SUBMIT", data);

    const response = await fetch("http://localhost:8080/api/meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    console.log("STATUS:", response.status);

    if (!response.ok) {
      alert("Failed");
      return;
    }

    alert("Meeting scheduled!");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded-xl shadow"
    >
      <input
        {...register("name", { required: true })}
        placeholder="Name"
        className="border p-2 w-full"
      />

      <input
        {...register("email", { required: true })}
        placeholder="Email"
        className="border p-2 w-full"
      />

      <input
        type="date"
        {...register("meetingDate", { required: true })}
        className="border p-2 w-full"
      />

      <input
        type="time"
        {...register("meetingTime", { required: true })}
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        Schedule Meeting
      </button>
    </form>
  );
}
