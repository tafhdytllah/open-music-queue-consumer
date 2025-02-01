Starter

- npm init --y
- npm install eslint --save-dev
- npx eslint --init / npm init @eslint/config@latest
- add languageOptions in eslint.config.mjs :
  globals: {
  process: "readonly", // Definisikan 'process' sebagai variabel global
  }
- add file .env, .ignore (node_modules/ .env)
- add folder src
  - add file : consumer.js, listener.js, mail-sender.js, open-music-service.js
- npm install amqplib pg dotenv nodemailer
- docker run --name rabbitmq -p 5672:5672 -p 15672:15672 -d rabbitmq:management
- rabbitmq management : localhost:15672
