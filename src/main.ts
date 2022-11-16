import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createAuth0 } from '@auth0/auth0-vue'

const app = createApp(App);
app.use(
    createAuth0({
        domain: "checksum.us.auth0.com",
        client_id: "StOPKkq9mrea8QCNAIkMUok2r9yRbcjI",
        redirect_uri: window.location.origin + "#modview",
    })
)
app.mount('#app')
