'use client';

import { LuDownload } from "react-icons/lu";
import React, { useState } from 'react';
import Button from '@/app/components/ui/Button'
type ButtonProps = {
    slug?: any,
    children: any
  }  


const DownloadButton = ({slug,children}: ButtonProps) => {
  const [statusMessage, setStatusMessage] = useState('');

  const handleClick = async () => {
    try {
      const response = await fetch(`/api/download?slug=${encodeURIComponent(slug)}`);

      if (!response.ok) {
        const result = await response.json();
        setStatusMessage(result.error);
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition?.split('filename=')[1]?.replace(/"/g, '');
      a.download = decodeURIComponent(filename || 'downloaded-file');
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      setStatusMessage('File has been downloaded successfully');
    } catch (error) {
      setStatusMessage('Error triggering download');
      console.error(':', error);
    }
  };

  return (
    <div>
      <Button
        icon={LuDownload}
        onClick={handleClick}
        className="br-4 hover:bg-white text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        aria-label={`Download`}
      >
        {children}
      </Button> 
      {statusMessage && <p>{statusMessage}</p>}
     
    </div>
  );
};

export default DownloadButton;
