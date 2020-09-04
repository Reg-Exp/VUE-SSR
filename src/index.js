import Vue from 'vue'
import app from "./app.vue";

import './assets/images/IMG_0559.jpeg'
import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'


const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(app)
}).$mount()
