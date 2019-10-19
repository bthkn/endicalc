const axios = require('axios').default

var app = new Vue({
    el: '#app',
    data: {},
    methods: {},
    computed: {},
    beforeMount() {
        axios.get('data.json')
            .then((response) => {
                document.write(JSON.parse(response))
            })
            .catch((error) => {
                alert('axios:\n'+error)
            });
    }
})