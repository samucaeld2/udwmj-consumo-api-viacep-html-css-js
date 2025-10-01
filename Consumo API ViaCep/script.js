document.getElementById("buscar-cep").addEventListener("click", () => {
  const cepInput = document.getElementById("cep-input");
  const cep = cepInput.value.trim();
  const resultado = document.getElementById("resultado");
  const mensagemErro = document.getElementById("mensagem-erro");

  // Limpa áreas
  resultado.innerHTML = "";
  mensagemErro.textContent = "";

  // Validação
  if (!/^\d{8}$/.test(cep)) {
    mensagemErro.textContent = "CEP inválido. Digite 8 números.";
    return;
  }

  // Requisição
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
      if (!response.ok) throw new Error("Erro na requisição");
      return response.json();
    })
    .then(data => {
      if (data.erro) {
        mensagemErro.textContent = "CEP não encontrado.";
      } else {
        resultado.innerHTML = `
          <p><strong>Logradouro:</strong> ${data.logradouro}</p>
          <p><strong>Bairro:</strong> ${data.bairro}</p>
          <p><strong>Cidade:</strong> ${data.localidade}</p>
          <p><strong>Estado:</strong> ${data.uf}</p>
        `;
      }
    })
    .catch(() => {
      mensagemErro.textContent = "Erro ao buscar o CEP. Tente novamente.";
    })
    .finally(() => {
      cepInput.value = "";
    });
});
