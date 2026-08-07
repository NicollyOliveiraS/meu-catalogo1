# 📚 Catálogo Literário & Audiovisual — Raphael Montes

Um aplicativo mobile em **React Native** desenvolvido para catalogar e exibir a coleção de obras (livros, séries e filmes) do autor e roteirista brasileiro **Raphael Montes**.

O app conta com uma interface no estilo *dark mode*, suporte a capas de imagem via rede, filtros dinâmicos por categoria e uma animação 3D interativa de giro de cartão (*flip card*) para revelar detalhes de cada obra.

---

## 🚀 Funcionalidades

- **📇 Cards Interativos (Flip Animation):** Toque em qualquer card para girá-lo em 3D e visualizar a sinopse e detalhes.
- **🖼️ Capas Remotas Dinâmicas:** Exibição de capas de livros e banners a partir de URLs de imagem via rede.
- **🎯 Filtros por Categoria:** Filtre facilmente entre **Todos**, **Livros**, **Séries** e **Filmes**, com contadores atualizados em tempo real.
- **🎨 Design Temático Dark:** Estilização escura focada no universo do suspense e do *thriller*.

---

## 🛠️ Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/):** Framework para desenvolvimento mobile cross-platform.
- **[Expo](https://expo.dev/):** Plataforma para facilitar a criação, testes e execução de apps React Native.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para garantir integridade ao código.
- **[Animated API](https://reactnative.dev/docs/animated):** Para criar a animação interativa de rotação 3D dos cartões.
- **JSON:** Base de dados local (`catalogo.json`) contendo as informações e URLs das obras.

---

## 📂 Estrutura do Projeto

```text
├── src/
│   ├── CatalogoScreen.tsx   # Tela principal e componente do card animado
│   └── catalogo.json        # Base de dados local com obras e links de imagens
├── App.tsx                  # Ponto de entrada do aplicativo
└── README.md                # Documentação do projeto
```
Desenvolvido por Nicolly Oliveira - NicollyOliveiraS

Vídeo de demonstração do aplicativo: 