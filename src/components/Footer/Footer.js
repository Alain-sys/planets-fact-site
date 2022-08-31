import React from 'react';
import './Footer.css';

const Footer = ({ dataJson, featuresValueRef }) => {
  const features = [
    { text: 'rotation time', value: `${dataJson.rotation}` },
    { text: 'revolution time', value: `${dataJson.revolution}` },
    { text: 'radius', value: `${dataJson.radius}` },
    { text: 'average temp.', value: `${dataJson.temperature}` },
  ];

  // create elements for each object in the features array
  const rows = features.map((features, index) => {
    return (
      <div className="features" key={index}>
        <p className="features__text">{features.text}</p>
        <p ref={(el) => (featuresValueRef.current[index] = el)} className={`features__value features__value-${dataJson.name.toLowerCase()}`}>
          {features.value}
        </p>
      </div>
    );
  });

  return <footer>{rows}</footer>;
};

export default Footer;
