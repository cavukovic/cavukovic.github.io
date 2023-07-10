import { createApp } from "vue";
import App from "./App.vue";
import naive from "naive-ui/es/preset";

const app = createApp(App).use(naive);
app.mount("#app");
