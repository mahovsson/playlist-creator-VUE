import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/config'

//css
import './assets/main.css'

let app

projectAuth.onAuthStateChanged(() => {
  if(!app) {
    createApp(App).use(router).mount('#app')
  }
})
