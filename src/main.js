import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter; //글로벌한 변수보관함에 저장하는 코드

import './registerServiceWorker'
import { createWebHistory, createRouter } from "vue-router";
import ContainerView from './components/ContainerView.vue';
import ResultView from './components/ResultView.vue';

const routes = [{
        path: "/",
        name: "Post List",
        component: ContainerView,
    },
    {
        path: "/:singer",
        name: "ResultView",
        component: ResultView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

app.use(router).mount('#app')

// Vue Clipboard Library : 클립보드에 URL 복사 시 사용
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true;
app.use(VueClipboard)