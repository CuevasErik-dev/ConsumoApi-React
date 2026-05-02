export const soloNumeros = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
};

export const soloLetras = (e) => {
  e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
};
