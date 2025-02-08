export const ValidaCampos = (campos, dados) => {
  const newErrors = {};

  // Itera sobre os campos e realiza a validação
  campos.forEach(({ nome, type }) => {
    const valor = dados[nome];
    
    // Se o tipo for 'text', não considera '0' como inválido
    if (type === "text" && (valor === "" || valor === undefined || valor === null)) {
      newErrors[nome] = true; // Marca o campo como erro
    }

    // Se o tipo for 'number', considera '0' como inválido
    if (type === "number" && (valor == 0 || valor === undefined || valor === null)) {
      newErrors[nome] = true; // Marca o campo como erro
    }
  });

  return newErrors;
};
