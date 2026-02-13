export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Fullstack Mentor',
    alternateName: 'პროგრამირების კურსები',
    url: 'https://www.fullstackmentor.space',
    logo: 'https://www.fullstackmentor.space/logo_light.png',
    description: 'პროგრამირების აკადემია საქართველოში. ფრონტენდ, ბექენდ და ფულსტეკ კურსები',
    sameAs: [
      'https://twitter.com/Datodiasamidze10',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Georgian', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GE',
      addressLocality: 'საქართველო',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Fullstack Mentor',
    alternateName: 'პროგრამირების კურსები',
    url: 'https://www.fullstackmentor.space',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.fullstackmentor.space/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'მთავარი',
        item: 'https://www.fullstackmentor.space',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'კურსები',
        item: 'https://www.fullstackmentor.space/courses',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'გამოწვევები',
        item: 'https://www.fullstackmentor.space/challenges',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'ბლოგები',
        item: 'https://www.fullstackmentor.space/blogs',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'ჩემი ანგარიში',
        item: 'https://www.fullstackmentor.space/profile',
      },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'პროგრამირების კურსები',
    description: 'ფრონტენდ, ბექენდ და ფულსტეკ კურსები',
    url: 'https://www.fullstackmentor.space/courses',
    itemListElement: [
      {
        '@type': 'Course',
        position: 1,
        name: 'ფრონტენდ კურსი',
        description: 'ისწავლე React, JavaScript, TypeScript და თანამედროვე ფრონტენდ ტექნოლოგიები',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Fullstack Mentor',
        },
      },
      {
        '@type': 'Course',
        position: 2,
        name: 'ბექენდ კურსი',
        description: 'ისწავლე Node.js, NestJS, Express და მონაცემთა ბაზები',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Fullstack Mentor',
        },
      },
      {
        '@type': 'Course',
        position: 3,
        name: 'ფულსტეკ კურსი',
        description: 'სრული პროგრამირების სწავლება - ფრონტენდი და ბექენდი',
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Fullstack Mentor',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
    </>
  )
}
