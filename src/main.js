import { createApp } from "vue";
import App from "./App.vue";
import naive from "naive-ui/es/preset";
//import { RouterLink, createRouter, createWebHashHistory } from "vue-router";
// const router = createRouter({
//     history: createWebHashHistory(),
//     routes: [
//         {
//             path: "/preview",
//             name: "preview",
//             component: () => import("./components/Preview.vue"),
//         },
//     ],
// });

//import "./style.css";
const app = createApp(App).use(naive);
//.use(router);
app.mount("#app");
