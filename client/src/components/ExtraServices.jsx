import service1 from '/backgrounds/service1.png';
import service2 from '/backgrounds/service2.png';
import service3 from '/backgrounds/service3.png';
import service4 from '/backgrounds/service4.png';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineClipboardDocumentList,
  HiOutlinePaperAirplane,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';


const SERVICES = [
  {
    id: 1,
    label: 'Source from\nIndustry Hubs',
    icon: <HiOutlineMagnifyingGlass />,
    image: service1, // replace with your image import
  },
  {
    id: 2,
    label: 'Customize Your\nProducts',
    icon: <HiOutlineClipboardDocumentList />,
    image: service2,
  },
  {
    id: 3,
    label: 'Fast, reliable shipping\nby ocean or air',
    icon: <HiOutlinePaperAirplane />,
    image: service3,
  },
  {
    id: 4,
    label: 'Product monitoring\nand inspection',
    icon: <HiOutlineShieldCheck />,
    image: service4,
  },
];

function ExtraServices() {
  return (
    <section className="services-section">
      <div className="services-section__inner">
        <div className="section__header">
          <h2 className="section__title">Our extra services</h2>
        </div>
        <div className="services-section__grid">
          {SERVICES.map(s => (
            <div key={s.id} className="service-card">
              <div
                className="service-card__img"
                style={{
                   backgroundImage: `url(${s.image})`,
                  }}
              />
              <div className="service-card__overlay">
                <div className="service-card__label" style={{ whiteSpace: 'pre-line' }}>{s.label}</div>
              </div>
              <div className="service-card__icon">{s.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExtraServices;