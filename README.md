# 🎶 MyMus

O **MyMus** é uma plataforma digital voltada para **aprendizado musical** e **uso de ferramentas interativas**, desenvolvida inicialmente como aplicação web e com planos de expansão futura para aplicativo mobile e desktop.

---

## 🚀 Objetivo
Criar uma plataforma prática e intuitiva para **estudantes de música, músicos iniciantes ou avançados**, permitindo aprendizado e descoberta de **notas, intervalos, acordes** e oferecendo funcionalidades exclusivas como **criador de partituras, tablaturas e ferramentas interativas** diretamente no navegador.

---

## ✨ Funcionalidades Principais
- 📚 **Biblioteca Musical** – Organização e consulta de conteúdos.
- 🎼 **Notas Musicais** – Identificação, explicação e reprodução sonora de notas.
- 🎵 **Acordes** – Exploração de acordes e suas variações.
- 🎶 **Intervalos** – Ferramenta para estudo e prática de intervalos musicais.
- 📝 **Criador de Partituras** – Editor visual para composição em partitura.
- 🎸 **Criador de Tablaturas** – Editor para instrumentos como violão/guitarra.
- 🕹️ **Ferramentas** – Metronômo, afinador, gerador de ritmo, etc.
- 🎹 **Identificador de Notas** – Piano virtual para identificar notas clicadas.
- 🧑‍🎤 **Instrumentos** – Conteúdo e ferramentas para piano, guitarra/violão, baixo e bateria.
- 🗂️ **Outros** – Círculo de quintas, termos musicais, folhas de pauta.
- 🛠️ **Configurações** – Personalização (tema claro/escuro, idioma etc.).
- 💬 **Suporte** – Avaliação e contato direto.

---

## 🖥️ Protótipo de Interface
A interface está sendo prototipada inicialmente no **Photoshop**, com base em conceitos de **UI/UX moderno e minimalista**.  
Exemplo de tela inicial (mockup desenvolvido):

![HomeScreen](./HomeScreen.png)

---

## 🎨 Identidade Visual
- **Logo**: baseada em símbolos musicais minimalistas (nota musical, fone ou onda sonora).
- **Paleta de cores**:
  - Azul primário `#4f8cff`
  - Azul escuro `#3573d6`
  - Azul claro `#a1e3ff`
  - Roxo claro `#a67dff` (destaques)
  - Branco e cinza para elementos neutros.
- **Tipografia**:
  - Títulos → *Poppins* / *Montserrat* (bold)
  - Textos → *Roboto* (regular)

---

## 🛠️ Tecnologias
- **Frontend**:
  - HTML5, CSS3, JavaScript (ES6+)
  - Animações e responsividade (Flexbox/Grid)
  - Separação de CSS/JS por página para melhor organização

- **Ferramentas de Design**:
  - Photoshop (mockups e protótipos)
  - Futuramente Figma para documentação de UI Kit

- **Controle de Versão**:
  - Git + GitHub (VSCode integrado)

- **Planejamento Futuro**:
  - Integração com **Web Audio API** para sons de notas/acordes
  - Migração para **framework moderno** (React ou Vue)
  - Criação de **aplicativo mobile** (provavelmente React Native ou Flutter)

---

## 📂 Estrutura do Projeto

```
MyMus/
├── index.html                # Página inicial
├── style.css                 # CSS global
├── script.js                 # JS global (home e navegação)
├── logo-navbar.png           # Logo para navbar e favicon
├── logo-hero.png             # Logo para hero section
├── avatar.png                # Avatar simulado do usuário
├── pages/
│   └── aprendizados/
│       ├── notas.html        # Página de Notas Musicais
│       ├── notas.css         # CSS específico para Notas
│       ├── script-notas.js   # JS específico para Notas
│       ├── identificador-notas.html # Identificador de Notas
│       ├── identificador-notas.js   # JS do identificador de notas
│       ├── identificador-notas.css  # CSS do identificador de notas
│       └── ...               # Outras páginas de aprendizado e ferramentas
```

---

## 📑 Navegação e Categorias

A sidebar do projeto está organizada por categorias:
- **Identificadores:** Notas, Intervalos, Acordes, Escalas
- **Ferramentas:** Metrônomo, Afinador, Gerador de Tablatura, Gerador de Partitura, Caixa de ritmo
- **Instrumentos:** Piano, Guitarra/Violão, Baixo, Bateria
- **Outros:** Círculo de Quintas, Termos musicais, Folhas de Pauta
- **Suporte:** Avalie-nos, Contate-nos

---

## 📈 Expansão

- Adicione novas páginas e funcionalidades conforme necessário.
- Personalize o conteúdo e estilos de cada página usando CSS/JS específicos.
- O projeto está pronto para evoluir para frameworks modernos e aplicativos mobile.

---

## 👤 Créditos

Desenvolvido por @imcylex7.  
Design inspirado em plataformas modernas de música e educação.

---