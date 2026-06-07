function StarRating({ rating = 0, max = 10, showNumber = true }) {
  // Convert to 5-star scale
  const stars = (rating / max) * 5;
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(i => {
        const filled = stars >= i;
        const half = !filled && stars >= i - 0.5;
        return (
          <svg key={i} className={`star-rating__star ${filled ? 'filled' : half ? 'half' : 'empty'}`}
            viewBox="0 0 24 24" width="14" height="14">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        );
      })}
      {showNumber && <span className="star-rating__num">{rating}</span>}
    </div>
  );
}
export default StarRating;