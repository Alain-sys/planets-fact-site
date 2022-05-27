import './Footer.css';

const Footer = (props) => {
  console.log(props);
  const footerContent = props.dataJson;
  const test = [
    { text: 'rotation time', value: `${footerContent.rotation}` },
    { text: 'revolution time', value: `${footerContent.revolution}` },
    { text: 'radius', value: `${footerContent.radius}` },
    { text: 'average temp.', value: `${footerContent.temperature}` },
  ];

  const rows = test.map((features, index) => {
    return (
      <div className="footer_items" key={index}>
        <p>{features.text}</p>
        <p>{features.value}</p>
      </div>
    );
  });

  return <footer>{rows}</footer>;
};

export default Footer;
