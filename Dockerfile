FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run","dev"]

# docker build -t todo_app . ---->to build the image
#docker run --name todo_react -d -p 5103:5173 todo_app---->to run the container
