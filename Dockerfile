FROM node:24-alpine 

WORKDIR /app

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY package*.json ./

COPY frontend/ ./frontend/

COPY backend/ ./backend/

RUN cd frontend && npm run build

CMD ["npm", "run", "start"]