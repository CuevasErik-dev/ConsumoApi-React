import React from 'react';

const Boton = ({ children, onClick, type = 'button', variante = 'primary', icono: Icono, deshabilitado = false }) => {
  const claseBase = 'btn';
  const claseVariante = `btn-${variante}`;

  return (
    <button type={type} onClick={onClick} className={`${claseBase} ${claseVariante}`} disabled={deshabilitado}>
      {Icono && <Icono size={18} className="btn-icon" />}
      {children}
    </button>
  );
};

export default Boton;
