import React from 'react';

const Tabla = ({ columnas, datos, acciones }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columnas.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {acciones && <th className="text-right">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {datos.length > 0 ? (
            datos.map((item, indice) => (
              <tr key={item.id || indice}>
                {columnas.map((col) => (
                  <td key={`${indice}-${col.key}`}>
                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                  </td>
                ))}
                {acciones && (
                  <td className="text-right">
                    <div className="table-actions">
                      {acciones(item)}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnas.length + (acciones ? 1 : 0)} className="text-center py-8 text-muted">
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
