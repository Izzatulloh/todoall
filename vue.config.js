const { defineConfig } = require('@vue/cli-service')

module.exports = {
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/ToDoList/" : "/",
};

