import React from 'react';

export const DoctorCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft animate-pulse">
    <div className="flex gap-4 items-center">
      <div className="w-20 h-20 bg-slate-200 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-200 rounded w-1/2" />
        <div className="h-3 bg-slate-200 rounded w-1/4" />
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <div className="h-3 bg-slate-200 rounded w-full" />
      <div className="h-3 bg-slate-200 rounded w-5/6" />
    </div>
    <div className="mt-5 flex gap-2">
      <div className="h-10 bg-slate-200 rounded-2xl flex-1" />
      <div className="h-10 bg-slate-200 rounded-2xl flex-1" />
    </div>
  </div>
);

export const BlogCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft animate-pulse flex flex-col">
    <div className="h-48 bg-slate-200 w-full" />
    <div className="p-6 flex-1 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-1/3" />
      <div className="h-6 bg-slate-200 rounded w-5/6" />
      <div className="h-4 bg-slate-200 rounded w-full" />
      <div className="h-4 bg-slate-200 rounded w-2/3" />
    </div>
  </div>
);

export const DepartmentCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft animate-pulse space-y-4">
    <div className="w-12 h-12 bg-slate-200 rounded-2xl" />
    <div className="h-5 bg-slate-200 rounded w-2/3" />
    <div className="h-4 bg-slate-200 rounded w-full" />
    <div className="h-4 bg-slate-200 rounded w-4/5" />
  </div>
);
