// vueform.config.(js|ts)

import { defineConfig } from "@vueform/vueform";
import vueform from "@vueform/vueform/dist/vueform";
import en from "@vueform/vueform/locales/en";

// You might place these anywhere else in your project
import "@vueform/vueform/dist/vueform.css";

export default defineConfig({
  theme: vueform,
  locales: { en },
  locale: "en",
});
