/**
 * JSON-LD Schema utilities for SEO
 * Schema.org structured data for enhanced SERP appearance
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fullstack Mentor",
  "url": "https://www.fullstackmentor.space",
  "logo": "https://www.fullstackmentor.space/logo_light.png",
  "description": "პროგრამირების აკადემია - ფრონტენდ, ბექენდ და ფულსტეკ კურსები JavaScript, React, Node.js, NestJS.",
  "sameAs": [
    "https://github.com/datodia",
    "https://www.linkedin.com/in/dato-diasamidze-310a73230/",
    "https://twitter.com/Datodiasamidze10"
  ],
  "contact": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "dato.diasamidze.02@gmail.com",
    "telephone": "+995598242422"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Fullstack Mentor",
  "url": "https://www.fullstackmentor.space",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.fullstackmentor.space/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const courseSchema = (courseTitle: string, courseDescription: string, courseImage: string, courseUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": courseTitle,
  "description": courseDescription,
  "image": courseImage,
  "url": courseUrl,
  "provider": {
    "@type": "Organization",
    "name": "Fullstack Mentor",
    "url": "https://www.fullstackmentor.space"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "100"
  }
});

export const articleSchema = (title: string, description: string, image: string, url: string, datePublished?: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": title,
  "description": description,
  "image": image,
  "url": url,
  "author": {
    "@type": "Person",
    "name": "დათო დიასამიძე",
    "url": "https://www.fullstackmentor.space"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Fullstack Mentor",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.fullstackmentor.space/logo_light.png"
    }
  },
  "datePublished": datePublished || new Date().toISOString().split('T')[0],
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": url
  }
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
