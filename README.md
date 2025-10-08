# 🎶 MyMus

O **MyMus** é uma plataforma digital para **aprendizado musical** e **ferramentas interativas**, desenvolvida inicialmente como aplicação web. O projeto já conta com funcionalidades práticas como o **piano virtual interativo**, identificação e reprodução de notas, e navegação moderna com sidebar dinâmica.

---

## 🚀 Objetivo
Oferecer uma experiência intuitiva para **estudantes de música, músicos iniciantes ou avançados**, permitindo o estudo de **notas, intervalos, acordes** e acesso a ferramentas como **criador de partituras, tablaturas e recursos interativos** diretamente no navegador.

---

## ✨ Funcionalidades Implementadas
- 🎹 **Piano Virtual** – Teclado interativo de C3 a B5, com reprodução sonora realista e suporte a teclado físico.
- 🎼 **Identificação de Notas** – Mostra a nota tocada, com pitch correto e visualização dinâmica.
- 📚 **Sidebar Navegável** – Menu lateral com categorias de aprendizado, ferramentas e instrumentos.
- 🖥️ **Interface Responsiva** – Layout adaptável para desktop e dispositivos móveis.
- 🎨 **Design Moderno** – Paleta de cores, tipografia e logos aplicados conforme identidade visual.
- 🛠️ **Separação de Arquivos** – CSS e JS organizados por página para fácil manutenção.
- 🔊 **Reprodução de Áudio** – Uso de Tone.js e samples reais para notas musicais.

---

## 🖥️ Protótipo de Interface
A interface está baseada em conceitos de **UI/UX moderno e minimalista**.  
Exemplo de tela inicial (mockup):

![HomeScreen](./HomeScreen.png)

---

## 🎨 Identidade Visual
- **Logo:** baseada em símbolos musicais minimalistas.
- **Paleta de cores:**  
  - Azul primário `#4f8cff`
  - Azul escuro `#3573d6`
  - Azul claro `#a1e3ff`
  - Roxo claro `#a67dff`
  - Branco e cinza para neutros
- **Tipografia:**  
  - Títulos → *Poppins* / *Montserrat* (bold)
  - Textos → *Roboto* (regular)

---

## 🛠️ Tecnologias
- **Frontend:**  
  - HTML5, CSS3, JavaScript (ES6+)
  - Tone.js para áudio musical
  - Flexbox/Grid para responsividade
- **Design:**  
  - Photoshop (mockups)
  - Figma (planejado para UI Kit)
- **Controle de Versão:**  
  - Git + GitHub (VSCode integrado)

---

## 📂 Estrutura do Projeto

```
MyMus/
├── index.html                # Página inicial
├── style.css                 # CSS global
├── script.js                 # JS global (home e navegação)
├── logo-navbar.png           # Logo para navbar e favicon
├── logo-hero.png             # Logo para hero section
├── avatar.png                # Avatar do usuário
├── pages/
│   └── aprendizados/
│       ├── notas.html        # Piano virtual e identificação de notas
│       ├── notas.css         # CSS do piano virtual
│       ├── script-notas.js   # JS do piano virtual
│       └── ...               # Outras páginas de aprendizado e ferramentas
```

---

## 📑 Navegação e Categorias

A sidebar está organizada por:
- **Identificadores:** Notas, Intervalos, Acordes, Escalas
- **Ferramentas:** Metrônomo, Afinador, Gerador de Tablatura, Gerador de Partitura, Caixa de ritmo
- **Instrumentos:** Piano, Guitarra/Violão, Baixo, Bateria
- **Outros:** Círculo de Quintas, Termos musicais, Folhas de Pauta
- **Suporte:** Avalie-nos, Contate-nos

---

## 📈 Expansão

- Novas páginas e funcionalidades podem ser adicionadas facilmente.
- O projeto está pronto para evoluir para frameworks modernos e aplicativos mobile.

---

## 👤 Créditos

Desenvolvido por @imcylex7.  
Design inspirado em plataformas modernas de música e educação.

---