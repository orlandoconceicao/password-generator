// Seleção de Elementos
console.log("Script carregado com sucesso!");
const generatePasswordButton = document.querySelector("#generate-password");
const generatePasswordElement = document.querySelector("#generated-password");

// Novas Funcionalidades
const openCloseGenerateOptions = document.querySelector(
  "#open-generate-password"
);
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

// Funções
const getLetterLowercase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUppercase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
  const symbols = "!@#$%^&*()_+{}[]<>?,./|~`-=";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (
  getLetterLowercase,
  getLetterUppercase,
  getNumber,
  getSymbol
) => {
  let password = "";

  // Segunda Versão
  const passwordLength = +lengthInput.value;

  const generators = [];
  if (lettersInput.checked) {
    generators.push(getLetterLowercase, getLetterUppercase);
  }

  if (numbersInput.checked) {
    generators.push(getNumber);
  }

  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  if (generators.length === 0) {
    alert("Selecione ao menos uma opção para gerar a senha.");
    return;
  }

  for (let i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      const randomValue = generators[Math.floor(Math.random() * generators.length)]();

      password += randomValue;

      password = password.slice(0, passwordLength);
});
      generatePasswordElement.style.display = "block";
      generatePasswordElement.querySelector("h4").innerText = password;
    
  }
};
// Eventos
generatePasswordButton.addEventListener("click", (e) => {
  e.preventDefault();
  generatePassword(
    getLetterLowercase,
    getLetterUppercase,
    getNumber,
    getSymbol
  );
});

openCloseGenerateOptions.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});

copyPasswordButton.addEventListener("click", () => {
  const password = generatePasswordElement.querySelector("h4").innerText;
  navigator.clipboard.writeText(password).then(() => {
    copyPasswordButton.innerText = "Copiado!";

    setTimeout(() => {
      copyPasswordButton.innerText = "Copiar senha";
    }, 1000);
  });
});