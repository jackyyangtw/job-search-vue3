import { createApp } from 'vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import {library} from "@fortawesome/fontawesome-svg-core"
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import App from './App.vue'
import router from './router'
import "./main.css"

library.add(faSearch)

const app = createApp(App)

app.use(router);

app.component("font-awesome-icon",FontAwesomeIcon)

app.mount('#app')
