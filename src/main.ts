import { createApp } from 'vue'
import {createPinia} from "pinia"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import {library} from "@fortawesome/fontawesome-svg-core"
import {faSearch, faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons"
import App from './App.vue'
import router from './router'
import "./main.css"

library.add(faSearch)
library.add(faAngleDown)
library.add(faAngleUp)

const app = createApp(App)
const pinia = createPinia()

app.use(router);
app.use(pinia);

app.component("font-awesome-icon",FontAwesomeIcon)

app.mount('#app')
