#!/bin/bash

# --- Configuração ---
# Repositório Git do seu projeto
REPO_URL="https://github.com/sergiomvj/panelx.git"

# Pasta base na sua VPS onde o projeto será hospedado
BASE_DIR="/var/www/panelx-admin"

# --- Fim da Configuração ---

set -e # Encerra o script se qualquer comando falhar

# Crie um nome para a pasta do novo release baseado no timestamp
RELEASE_DIR="$BASE_DIR/releases/$(date +%Y%m%d%H%M%S)"

echo "🚀 Iniciando deploy..."

# 1. Crie a pasta para o novo release
echo "-> Criando pasta do release em $RELEASE_DIR"
mkdir -p $RELEASE_DIR

# 2. Clone o projeto do repositório Git
echo "-> Clonando o repositório..."
git clone --depth 1 $REPO_URL $RELEASE_DIR

# 3. Entre na pasta do novo release
cd $RELEASE_DIR

# 4. Crie o link simbólico para o arquivo .env.local
echo "-> Configurando variáveis de ambiente..."
ln -s $BASE_DIR/shared/.env.local .env.local

# 5. Instale as dependências
echo "-> Instalando dependências com npm..."
npm install --production

# 6. Faça a build de produção
echo "-> Gerando a build de produção..."
npm run build

# 7. Atualize o link simbólico 'current' para apontar para o novo release
echo "-> Ativando o novo release..."
ln -sfn $RELEASE_DIR $BASE_DIR/current

# 8. Reinicie a aplicação com PM2
echo "-> Reiniciando a aplicação com PM2..."
cd $BASE_DIR/current
pm2 reload ecosystem.config.js --env production

# 9. Limpe os releases antigos (mantém os 5 últimos)
echo "-> Limpando releases antigos..."
cd $BASE_DIR/releases && ls -dt * | tail -n +6 | xargs -r rm -rf

echo "✅ Deploy concluído com sucesso!"
