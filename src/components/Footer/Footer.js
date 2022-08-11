import React from 'react';
import './Footer.css';

const Footer = (props) => {
  const footerContent = props.dataJson;
  const features = [
    { text: 'rotation time', value: `${footerContent.rotation}` },
    { text: 'revolution time', value: `${footerContent.revolution}` },
    { text: 'radius', value: `${footerContent.radius}` },
    { text: 'average temp.', value: `${footerContent.temperature}` },
  ];

  // create elements for each object in the features array
  const rows = features.map((features, index) => {
    return (
      <div className="features" key={index}>
        <p className="features__text">{features.text}</p>
        <p className={`features__value features__value-${footerContent.name.toLowerCase()}`}>{features.value}</p>
      </div>
    );
  });

  return <footer>{rows}</footer>;
};

export default Footer;
