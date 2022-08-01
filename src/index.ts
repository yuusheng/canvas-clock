import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'uno.css'
import './static/index.css'

const pinia = createPinia()
createApp(App).use(pinia).use(router).mount('#app')
