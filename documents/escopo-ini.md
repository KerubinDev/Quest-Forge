# QuestForge - Escopo Inicial

**Projeto Integrador Final — Técnico em Desenvolvimento de Sistemas**  
**Aluno:** KerubinDev  
**Professor:** Gabriel Barros  
**Data:** Novembro de 2025

---

## 1. Descrição do Programa

O **QuestForge** é uma plataforma integrada para gerenciamento de campanhas de RPG de mesa. O sistema permite que Mestres (Game Masters) gerenciem todos os aspectos de uma campanha de forma centralizada e organizada, enquanto jogadores acompanham seus personagens e o progresso da história através de uma interface mobile dedicada.

O programa resolve o problema de fragmentação de informações em campanhas de RPG, oferecendo um único lugar para armazenar e gerenciar campanhas, personagens, NPCs, itens, sessões e mídia (mapas, imagens).

---

## 2. Funcionalidades Principais

### 2.1. Para o Mestre (Interface Web)

O Mestre tem acesso a um painel completo de gerenciamento com as seguintes funcionalidades:

**Autenticação:**
- Login e logout seguro
- Registro de nova conta
- Recuperação de senha

**Gestão de Campanhas:**
- Criar novas campanhas com nome, descrição e ambientação
- Editar informações da campanha
- Visualizar todas as suas campanhas
- Deletar campanhas
- Convidar jogadores para participar

**Gestão de Personagens:**
- Criar fichas de personagens de jogadores com atributos (Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma)
- Editar informações dos personagens
- Visualizar fichas completas
- Deletar personagens
- Gerenciar inventário de cada personagem

**Gestão de NPCs:**
- Criar personagens não-jogáveis com descrição e papel na campanha
- Editar e visualizar NPCs
- Deletar NPCs
- Organizar por relacionamentos

**Gestão de Itens:**
- Criar itens, armas, armaduras e artefatos
- Categorizar por tipo e raridade
- Editar e visualizar itens
- Atribuir itens aos personagens
- Deletar itens

**Gestão de Sessões:**
- Registrar datas e resumos das sessões
- Adicionar notas importantes e marcos da história
- Editar e visualizar sessões
- Deletar sessões

**Gerenciamento de Mídia:**
- Fazer upload de imagens (mapas, arte de personagens)
- Visualizar galeria de imagens
- Deletar imagens

### 2.2. Para o Jogador (Interface Mobile)

O Jogador tem acesso a um aplicativo mobile focado em visualização e acompanhamento:

**Autenticação:**
- Login e logout
- Registro de nova conta

**Visualização de Campanhas:**
- Listar campanhas em que o jogador participa
- Selecionar uma campanha para acompanhar

**Ficha de Personagem:**
- Visualizar atributos (Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma)
- Visualizar habilidades
- Visualizar histórico do personagem

**Inventário:**
- Visualizar todos os itens do personagem
- Ver descrição e propriedades de cada item
- Acompanhar quantidade de itens

**Diário de Bordo:**
- Visualizar lista de todas as sessões da campanha
- Ler resumos das sessões
- Acompanhar marcos e notas importantes

**Mapas e Imagens:**
- Visualizar mapas e imagens da campanha
- Zoom e visualização em tela cheia

---

## 3. Telas da Aplicação Web (Mestre)

### 3.1. Tela de Login
Formulário simples com campos de email e senha. Opções para recuperar senha ou criar nova conta.

### 3.2. Dashboard (Home)
Página inicial mostrando:
- Bem-vindo personalizado
- Lista de campanhas recentes
- Estatísticas rápidas (total de campanhas, personagens, próxima sessão)
- Botão para criar nova campanha

### 3.3. Lista de Campanhas
Tabela ou grid mostrando todas as campanhas com:
- Nome da campanha
- Data de criação
- Número de personagens
- Status (ativa, pausada, concluída)
- Botões de ação (abrir, editar, deletar)

### 3.4. Detalhes da Campanha
Página principal da campanha com abas para:
- **Personagens:** Lista de personagens de jogadores com opções de criar, editar, visualizar e deletar
- **NPCs:** Lista de NPCs com opções de criar, editar, visualizar e deletar
- **Itens:** Lista de itens com opções de criar, editar, visualizar e deletar
- **Sessões:** Lista de sessões com opções de criar, editar, visualizar e deletar
- **Mídia:** Galeria de imagens com upload e delete
- **Configurações:** Editar informações da campanha e convidar jogadores

### 3.5. Criar/Editar Personagem
Formulário com campos:
- Nome, Classe, Raça, Nível
- Atributos (Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma)
- Habilidades (campo de texto)
- Histórico (editor de texto rico)

### 3.6. Criar/Editar NPC
Formulário com campos:
- Nome, Descrição, Papel na Campanha
- Atributos e Habilidades
- Relacionamentos

### 3.7. Criar/Editar Item
Formulário com campos:
- Nome, Descrição
- Tipo (dropdown: arma, armadura, consumível, artefato, misc)
- Raridade (dropdown: comum, incomum, raro, muito raro, lendário)
- Propriedades especiais e efeitos

### 3.8. Criar/Editar Sessão
Formulário com campos:
- Data, Hora, Título
- Resumo (editor de texto rico)
- Notas importantes
- Marcos da história

### 3.9. Galeria de Mídia
Grid de imagens com:
- Thumbnails das imagens
- Opção de upload drag-and-drop
- Botões de visualizar e deletar

### 3.10. Convidar Jogadores
Formulário para:
- Inserir email do jogador
- Enviar convite
- Visualizar status de convites (pendente, aceito, recusado)

---

## 4. Telas do Aplicativo Mobile (Jogador)

### 4.1. Tela de Login
Formulário simples otimizado para mobile com campos de email e senha.

### 4.2. Dashboard (Home)
Lista de campanhas em que o jogador participa, mostrando:
- Nome da campanha
- Nome do Mestre
- Número de personagens
- Botão para entrar na campanha

### 4.3. Ficha de Personagem
Tela com abas deslizáveis mostrando:
- **Atributos:** Os 6 atributos principais com valores e modificadores
- **Habilidades:** Lista de habilidades com descrição
- **Inventário:** Lista de itens do personagem
- **Histórico:** Informações do histórico do personagem

### 4.4. Inventário
Lista de itens do personagem mostrando:
- Nome do item
- Tipo e raridade
- Quantidade
- Opção de expandir para ver descrição completa

### 4.5. Diário de Bordo
Lista de sessões da campanha mostrando:
- Data da sessão
- Título da sessão
- Resumo breve
- Opção de expandir para ver resumo completo

### 4.6. Mapas e Imagens
Galeria de imagens da campanha com:
- Thumbnails das imagens
- Opção de visualizar em tela cheia
- Zoom e navegação

### 4.7. Perfil
Página com informações do jogador e opções de logout.

---

## 5. Tecnologias a Serem Utilizadas

### 5.1. Back-end / API

**Linguagem e Framework:**
- A definir

**Banco de Dados:**
- A definir

**Autenticação:**
- A definir

**Armazenamento de Arquivos:**
- A definir

### 5.2. Aplicação Web

**Framework Frontend:**
- A definir

**Linguagem:**
- A definir

**Estilização:**
- A definir

**Gerenciamento de Estado:**
- A definir

**Cliente HTTP:**
- A definir

### 5.3. Aplicativo Mobile

**Framework:**
- A definir

**Linguagem:**
- A definir

**Gerenciamento de Estado:**
- A definir

**Cliente HTTP:**
- A definir

### 5.4. Ferramentas e Infraestrutura

**Versionamento:**
- A definir

**Ambiente de Desenvolvimento:**
- A definir

**Testes:**
- A definir

**Documentação da API:**
- A definir

---

## 6. Conclusão

O QuestForge é um sistema completo para gerenciamento de campanhas de RPG de mesa, com interfaces especializadas para Mestres (web) e Jogadores (mobile). O sistema oferece todas as funcionalidades necessárias para organizar, gerenciar e acompanhar campanhas de forma centralizada e intuitiva.
