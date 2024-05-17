export const roundNumber = (numero: number) => {
  if (numero % 1 !== 0) {
    return Math.ceil(numero);
  }

  return numero;
};
