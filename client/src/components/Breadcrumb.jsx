import { Link } from 'react-router-dom';

function Breadcrumb({ items = [] }) {
  return (
    <nav className="breadcrumb">
      {items.map((item, i) => (
        <span key={i} className="breadcrumb__item">
          {i < items.length - 1 ? (
            <>
              <Link to={item.path} className="breadcrumb__link">{item.label}</Link>
              <span className="breadcrumb__sep">›</span>
            </>
          ) : (
            <span className="breadcrumb__current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export default Breadcrumb;