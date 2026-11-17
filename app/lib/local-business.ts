// LocalBusiness for touched pages. No telephone: StoneMatch does not publish a phone number.
export const localBusinessSchema = {
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	"@id": "https://stonematch.co.uk/#localbusiness",
	name: "StoneMatch",
	legalName: "Deakin Surfaces Limited",
	url: "https://stonematch.co.uk/",
	email: "enquiries@stonematch.co.uk",
	description: "Independent, free, no-deposit like-for-like checks of bespoke quartz, porcelain and natural stone worktop quotes.",
	areaServed: { "@type": "AdministrativeArea", name: "West Midlands, England" },
	address: { "@type": "PostalAddress", addressCountry: "GB" },
	sameAs: ["https://www.instagram.com/stonematchuk/"],
};
