import { Loader2 } from 'lucide-react'; 
import React from 'react';

export default function Loading() {
  const estimatedContentHeight = 'min-h-[90vh]'; 

  return (
    <div className={`flex justify-center items-center ${estimatedContentHeight} w-full`}>
      <Loader2 className="w-10 h-10 animate-spin" />
    </div>
  );
}