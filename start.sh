#!/bin/bash

# Colores para mejorar la legibilidad
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Iniciando el Sistema CRUD de Empleados con PostgreSQL ===${NC}"

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js no está instalado. Por favor, instala Node.js para continuar.${NC}"
    exit 1
fi

# Verificar que npm esté instalado
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}npm no está instalado. Por favor, instala npm para continuar.${NC}"
    exit 1
fi

# Instalación de dependencias
echo -e "${YELLOW}Instalando dependencias...${NC}"
npm install

# Verificar si la base de datos está accesible
echo -e "${YELLOW}Verificando conexión a PostgreSQL...${NC}"
PG_CONNECTION="postgresql://postgres:uHuvOUXCRYFPDetUjVOmTQWaTPbRJDLP@centerbeam.proxy.rlwy.net:56730/railway"

# Intentar inicializar la base de datos
echo -e "${YELLOW}Inicializando la base de datos...${NC}"
node init-db.js

# Iniciar la aplicación
echo -e "${GREEN}Iniciando la aplicación...${NC}"
npm run dev:all

echo -e "${BLUE}Sistema CRUD de Empleados iniciado correctamente.${NC}"
echo -e "${YELLOW}Accede a la aplicación en: http://localhost:5173${NC}"