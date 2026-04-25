import React from 'react';

const TarjetaInf = ({ icon: Icon, titulo, valor, variante = 'blue' }) => {
  const claseVariante = `icon-${variante}`;

  return (
    <div className="info-card">
      <div className={`info-card-icon ${claseVariante}`}>
        <Icon size={24} />
      </div>
      <div className="info-card-data">
        <h3>{valor}</h3>
        <p>{titulo}</p>
      </div>
    </div>
  );
};

export default TarjetaInf;
