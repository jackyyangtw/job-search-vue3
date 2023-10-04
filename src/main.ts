import { createApp } from "vue"
import { createPinia } from "pinia"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faSearch,
  faAngleDown,
  faAngleUp,
  faBuilding,
  faLocationDot,
  faLayerGroup,
  faChartSimple,
  faClock,
  faArrowLeft,
  faFilter,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons"
import App from "./App.vue"
import router from "./router"
import "./main.css"

library.add(faSearch)
library.add(faAngleDown)
library.add(faAngleUp)
library.add(faBuilding)
library.add(faLocationDot)
library.add(faLayerGroup)
library.add(faChartSimple)
library.add(faClock)
library.add(faArrowLeft)
library.add(faFilter)
library.add(faCircleXmark)

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.component("font-awesome-icon", FontAwesomeIcon)

app.mount("#app")
