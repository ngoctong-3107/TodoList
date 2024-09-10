import Aura from "@primevue/themes/aura";
import Vueform from "@vueform/vueform";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import { createApp } from "vue";
import vueformConfig from "./../vueform.config";
import App from "./App.vue";
import "./assets/main.css";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(Vueform, vueformConfig);
app.use(ConfirmationService);
app.use(ToastService);
app.mount("#app");
