import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post('/api/contact', data);
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-5xl font-bold mb-12">Get In Touch</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-800 p-8 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-purple-500 outline-none transition"
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-purple-500 outline-none transition"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              {...register('subject', { required: 'Subject is required' })}
              type="text"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-purple-500 outline-none transition"
              placeholder="Message subject"
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              {...register('message', { required: 'Message is required' })}
              rows="5"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-purple-500 outline-none transition resize-none"
              placeholder="Your message..."
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-6 py-3 rounded font-semibold transition"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
