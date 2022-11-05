import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter; //글로벌한 변수보관함에 저장하는 코드

import './registerServiceWorker'

app.mount('#app')

// Vue Clipboard Library : 클립보드에 URL 복사 시 사용
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true;
app.use(VueClipboard)