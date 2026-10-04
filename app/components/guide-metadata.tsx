type GuideMetadataProps = { title: string; canonical: string };

export function GuideMetadata({ title, canonical }: GuideMetadataProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: title,
        mainEntityOfPage: canonical,
        publisher: { "@id": "https://stonematch.co.uk/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://stonematch.co.uk/" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://stonematch.co.uk/guides/" },
          { "@type": "ListItem", position: 3, name: title, item: canonical },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
