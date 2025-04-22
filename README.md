# Sistema de Preservação Digital com Archivematica

## Pitch do projeto em funcionamento

https://github.com/user-attachments/assets/2d32733b-f297-4e22-8c20-1a6ed9b4579f

## Como Rodar o Projeto

1. Clonar o repositório do archivematica em ambiente Linux (usei WSL)
``` bash 
  git clone https://github.com/artefactual/archivematica.git --branch qa/1.x --recurse-submodules
```

2. Alterar o docker compose de acordo com os seguintes passos: adicionar uma linha no volumes do service "archivematica-storage-service", nesse projeto eu mapeei uma pasta local do meu windows para compatilhar a pasta interna do container do archivematica da seguinte forma: 
``` docker-compose.yml
  services:
  ...
    archivematica-storage-service:
      ...
      volumes:
      ...
      - "/mnt/c/Users/thale/Documentos/ArchivematicaShared:/home:rw"
```
Você pode alterar o primeiro parâmetro para a pasta que achar melhor. 

3. Prosseguir com a instalação de acordo com a [documentação oficial](https://github.com/artefactual/archivematica/blob/qa/1.x/hack/README.md)
  
4. Clone meu repositório:
``` bash
  git clone https://github.com/thales0591/ledgertec-challenge.git
```

5. Dentro da pasta back/src/modules/documents, entre no arquivo document.controller.ts e altere a linha 104 para o diretório que você escolheu no passo 2, lembrando da sintaxe a depender de onde está rodando o backend.
   
6. Criar seu próprio .env baseado no meu .env.example, tanto no backend quanto no front. No backend, caso vá usar a api key default, trocar por test:test
   
7. Instalar as dependências dentro da pasta back e front
``` /back e /front
  npm install
```

8. Com o docker desktop aberto, rodar meu docker compose da pasta back
``` /back
  docker-compose up -d
```

9. Rodar as migrations
``` /back
  npm run prisma:migrate
```

10. Rodar o backend
``` /back
  npm run start:dev
```

11. Rodar o frontend
``` /front
  npm run dev
```

E pronto!

## Estratégias e patterns utilizados

- Repository pattern
- JWT com Public e Private key
- Polling no front-end após criação do docuemento para atualização dinâmica de status
- Guard de autenticação para permissionamento de rotas
- Download de arquivo do archivematica via backend utilizando pipeline, repassando assim as chunks para transmissão assíncrona de dados
- React Query para cache de dados e maior controle sobre API calls
- Validação forte de formulários com React Form e Zod

## Tecnologias Utilizadas
- **Linguagens:** Typescript
- **Frontend:** React/Vite + Tailwind + Shadcn + React Query + Zod + Axios
- **Backend:** NestJS + Prisma + PostgreSQL + bcryptjs + PassportJwt + Axios
- **Clients:** Archivematica API
- **Ambiente:** Docker + Docker Compose
- **Autenticação:** JWT com access token

---

## Funcionalidades Implementadas

### Cadastro e Autenticação

- Tela de cadastro de novo usuário.
- Login com usuário e senha.

### Tela Inicial

- Lista de documentos preservados com as seguintes informações:
  - ID do documento
  - Nome do documento
  - Data de preservação
  - Status da preservação
- Filtro por metadados (não implementado)
- Filtro por intervalo de datas (não implementado)
- Botões de download, "Ver mais" (detalhes do documento) e "Preservar novo documento"

### Tela de Detalhes do Documento

- Visualização do PDF no navegador (não implementado)
- Exibição de informações do documento:
  - Nome
  - Data de preservação
  - Status da preservação
  - Metadados
- Botão para download do documento preservado

### Tela de Preservação de Novo Documento

- Formulário com:
  - Upload do arquivo PDF
  - Campos para preenchimento de metadados
  - Botão "Preservar"
- Backend:
  - Armazenamento dos metadados no banco
  - Envio do documento para o Archivematica como pacote SIP
  - Acompanhamento do status da preservação via API
  - Atualização do status conforme resposta do Archivematica

### Download de Documento

- Possibilidade de download diretamente da listagem de documentos ou da tela de detalhes.
- Backend faz a solicitação do AIP/DIP e disponibiliza o arquivo via pipeline.
