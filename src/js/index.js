const axios = require('axios').default

var app = new Vue({
    el: '#app',
    data: {
        db: undefined,
        productType: undefined,
        paperTypes: [
            "Офсетная 80 гр",
            "Maxigloss 130гр",
            "Maxigloss 170гр./м.кв",
            "Delight gloss в упак C2S Art Board мел.картон 2 ст. 310",
            "Arconvert",
            "Тач кавер 300",
            "ICELASER Лен",
            "Comet брилиант 300 гр",
            "Acquerello 300 гр",
            "Nettuno 300 гр",
            "Sirio pearl 300 гр",
            "Splendorgel 300 гр",
            "TintoRetto 300 гр"
        ],
        paperCosts: {
            "Офсетная 80 гр": 1.84,
            "Maxigloss 130гр": 2.21,
            "Maxigloss 170гр./м.кв": 2.89,
            "Delight gloss в упак C2S Art Board мел.картон 2 ст. 310": 6.85,
            "Arconvert": 9.5,
            "Тач кавер 300": 86.62,
            "ICELASER Лен": 27.41,
            "Comet брилиант 300 гр": 44.73,
            "Acquerello 300 гр": 33.3,
            "Nettuno 300 гр": 34.5,
            "Sirio pearl 300 гр": 48.6,
            "Splendorgel 300 гр": 25.5,
            "TintoRetto 300 гр": 27.7
        },
        paperFormat: [ 'A4', 'A5', 'A6' ],
        linesNumber: undefined,
        edition: undefined,
        isBiegen: false,
        isLam: false,
        isCorners: false,
        kRent: 1.77,
        skoba: 2.2, // стоимость скобы

    },
    methods: {
        getTotal() {
            // if 
        }
    },
    computed: {
        paperPerBlockCost: function() {
            var paper = document.getElementById('bukleti-paper-block').value
            console.log(paper, app.paperCosts[paper])
            return app.paperCosts[paper]
        },
        paperPerCoverCost: function() {
            var paper = document.getElementById('bukleti-paper-cover').value
            console.log(paper, app.paperCosts[paper])
            return app.paperCosts[paper]
        },
        printCost: function() {
            return 16
        }
    },
    beforeMount() {
        axios.get('data.json')
            .then((response) => {
                this.db = JSON.parse(response)
            })
            .catch((error) => {
                alert('axios:\n'+error)
            });
    }
})