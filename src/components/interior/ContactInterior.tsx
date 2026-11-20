'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { profileData } from '@/data/profile';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  CheckCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from '@/components/ui/SocialIcons';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactInterior() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to transmit message.');
      }
      setIsSubmitted(true);
      reset();
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full max-h-[85vh] w-full max-w-5xl flex-col rounded-2xl border border-teal-500/30 bg-slate-950/90 shadow-[0_0_50px_rgba(67,233,123,0.25)] backdrop-blur-2xl overflow-hidden text-slate-100">
      {/* 1. Header */}
      <div className="border-b border-teal-500/20 bg-gradient-to-r from-slate-950 via-teal-950/30 to-slate-950 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-mono uppercase tracking-wider font-semibold">
              <Send className="h-4 w-4" />
              <span>Direct Inquiries & Project Consultation</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
              Communication HQ
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Have an idea, institutional ERP requirement, or enterprise web application to build? Let’s connect.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-teal-300 bg-teal-950/60 border border-teal-500/30 px-3.5 py-1.5 rounded-lg w-fit">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            Open for Commercial Collaborations
          </div>
        </div>
      </div>

      {/* 2. Body Grid: Left Form & Right Contact Cards */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Form: 7 Columns */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-teal-400" /> Send a Direct Message
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill out the transmission form below. All inquiries receive responses within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="rounded-xl border border-teal-500/40 bg-teal-950/40 p-6 text-center animate-in zoom-in-95 duration-300">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 mb-3">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Transmission Sent Successfully!
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Thank you, {profileData.name} will review your message and reply via email shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 rounded-lg bg-teal-500/20 border border-teal-500/40 px-4 py-2 text-xs font-semibold text-teal-300 hover:bg-teal-500 hover:text-slate-950 transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
                  {submitError && (
                    <div className="rounded-lg border border-rose-500/50 bg-rose-950/50 p-3 text-xs text-rose-300">
                      {submitError}
                    </div>
                  )}
                  {/* Name Field */}
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      {...register('name')}
                      placeholder="e.g. John Doe"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-400 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">
                      Email Address
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="e.g. client@company.com"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">
                      Subject
                    </label>
                    <input
                      {...register('subject')}
                      placeholder="e.g. Inquiry regarding School ERP & Custom API Integration"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-rose-400 mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">
                      Project Details / Message
                    </label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Describe your project requirements, scope, timeline, and goals..."
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-400 mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/25 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Message...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Direct Links: 5 Columns */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick Contact Cards */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                Direct Channels
              </h4>

              <a
                href={`mailto:${profileData.contact.email}`}
                className="flex items-center gap-3.5 rounded-lg border border-slate-800/80 bg-slate-950/60 p-3.5 text-xs text-slate-300 hover:border-teal-500/40 hover:text-white transition-all group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 group-hover:scale-105 transition-transform">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Email Address</div>
                  <div className="font-semibold text-white">{profileData.contact.email}</div>
                </div>
              </a>

              <a
                href={`tel:${profileData.contact.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-3.5 rounded-lg border border-slate-800/80 bg-slate-950/60 p-3.5 text-xs text-slate-300 hover:border-teal-500/40 hover:text-white transition-all group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 group-hover:scale-105 transition-transform">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Phone / WhatsApp</div>
                  <div className="font-semibold text-white">{profileData.contact.phone}</div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 rounded-lg border border-slate-800/80 bg-slate-950/60 p-3.5 text-xs text-slate-300">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Headquarters</div>
                  <div className="font-semibold text-white">{profileData.contact.location}</div>
                </div>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Social Networks & Code Hubs
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-300 hover:text-white hover:border-teal-500/40 transition-colors"
                >
                  <GithubIcon className="h-4 w-4 text-purple-400" />
                  <span>GitHub</span>
                </a>

                <a
                  href={profileData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-300 hover:text-white hover:border-teal-500/40 transition-colors"
                >
                  <LinkedinIcon className="h-4 w-4 text-blue-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profileData.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-300 hover:text-white hover:border-teal-500/40 transition-colors"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={profileData.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-slate-300 hover:text-white hover:border-teal-500/40 transition-colors"
                >
                  <FacebookIcon className="h-4 w-4 text-blue-500" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
