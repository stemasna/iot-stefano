import axios from 'axios'

axios.defaults.baseURL='http://localhost:9000/'
axios.defaults.headers.post['Content-Type'] = 'application/json';

//usato axios per avere attivi sia la porta 3000 per il frontend sia la porta  9000 per il backend 