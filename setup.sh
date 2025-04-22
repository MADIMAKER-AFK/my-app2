#!/bin/bash

# Colores para mejorar la lectura
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Configurando el proyecto CRUD de Empleados ===${NC}"

# Instalación de dependencias
echo -e "${YELLOW}Instalando dependencias...${NC}"
npm install

# Verificar si la base de datos está accesible
echo -e "${YELLOW}Verificando conexión a PostgreSQL...${NC}"
PG_CONNECTION="postgresql://postgres:uHuvOUXCRYFPDetUjVOmTQWaTPbRJDLP@centerbeam.proxy.rlwy.net:56730/railway"

# Intentar conectarse a la base de datos
if command -v psql &> /dev/null; then
    if psql "$PG_CONNECTION" -c '\q' 2>/dev/null; then
        echo -e "${GREEN}Conexión a PostgreSQL establecida correctamente.${NC}"
        
        # Inicializar la base de datos con datos de ejemplo
        echo -e "${YELLOW}Inicializando la base de datos con datos de ejemplo...${NC}"
        psql "$PG_CONNECTION" -f init-db.sql
        echo -e "${GREEN}Base de datos inicializada correctamente.${NC}"
    else
        echo -e "${YELLOW}No se pudo conectar a PostgreSQL.${NC}"
        echo -e "${YELLOW}Continuando sin inicializar la base de datos...${NC}"
    fi
else
    echo -e "${YELLOW}psql no está instalado. Saltando la inicialización de la base de datos.${NC}"
    echo -e "${YELLOW}Puedes inicializar manualmente ejecutando el archivo init-db.sql.${NC}"
fi

# Iniciar el proyecto
echo -e "${GREEN}Configuración completada. Para iniciar el proyecto ejecuta:${NC}"
echo -e "${BLUE}npm run dev:all${NC}"
echo -e "${YELLOW}Esto iniciará tanto el frontend como el backend.${NC}"
echo -e "${YELLOW}Accede a la aplicación en: http://localhost:5173${NC}"