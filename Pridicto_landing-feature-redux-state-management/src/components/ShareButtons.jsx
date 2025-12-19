import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon
} from 'react-share';

export default function ShareButtons({ url, title, description }) {
  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Check out Predicto.ai - AI-powered project estimation';
  const shareDescription = description || 'Smart project estimation tools for developers and businesses.';

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Share:</span>
      <FacebookShareButton url={shareUrl} quote={shareTitle}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={shareTitle}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton url={shareUrl} title={shareTitle} summary={shareDescription}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <WhatsappShareButton url={shareUrl} title={shareTitle}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <EmailShareButton url={shareUrl} subject={shareTitle} body={shareDescription}>
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  );
}
