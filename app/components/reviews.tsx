const GOOGLE_REVIEW_URL = "https://g.page/r/CZqpjn--FLKOEBM/review";

export function Reviews() {
 return <section className="section light" id="reviews" aria-labelledby="reviews-heading">
  <div className="shell">
   <p className="eyebrow dark">Reviews</p>
   <h2 id="reviews-heading">What homeowners <em>actually say.</em></h2>
   <div className="reviews-empty">
    <p>There are no published reviews here yet. StoneMatch is early, and we'd rather leave this blank than invent a rating, a name or a sentence nobody wrote.</p>
    <div className="reviews-actions">
     <a className="button gold" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">Leave us a Google review</a>
     <a className="text-link" href="mailto:enquiries@stonematch.co.uk?subject=A%20review%20for%20StoneMatch">Be one of our first reviews</a>
    </div>
    <p className="reviews-note">If we've already checked or helped with your worktops, email us. With your permission, a real review can live here.</p>
   </div>
  </div>
 </section>;
}
