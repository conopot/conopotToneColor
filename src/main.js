import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter; //글로벌한 변수보관함에 저장하는 코드

import store from './store.js'
import './registerServiceWorker'

app.use(store).mount('#app')