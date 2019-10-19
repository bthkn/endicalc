var app = new Vue({
  el: '#envelopeCalc',
  data: {
    currentProduct: 'Конверты',
    isLaminated: undefined,
    isCorners: undefined,
    edition: undefined,
    db: {
      "paperTypes": [ 
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
      "envelopeFormats": ["Е65", "С5", "С4"],
      "paperCosts": {
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
      "printCosts": {
        "4+0": {
          "20": 1.6,
          "100": 8
        },
        "4+4": {
          "20": 3.2,
          "100": 16
        },
        "1+0": {
          "20": 1.6,
          "100": 8
        },
        "1+1": {
          "20": 3.2,
          "100": 16
        },
        "4+1": {
          "20": 3.2,
          "100": 16
        }
      },
      "kRentOf": {
        "envelope": {
          "Е65": {
            "10": 15,
            "30": 0.3,
            "50": 8.5,
            "100": 6.6,
            "200": 6,
            "300": 5.5,
            "500": 5,
            "1000": 4
          },
          "С5": {
            "10": 15,
            "30": 0.3,
            "50": 8.5,
            "100": 6.6,
            "200": 6,
            "300": 5.5,
            "500": 5,
            "1000": 4
          },
          "С4": {
            "10": 11,
            "30": 8,
            "50": 6.5,
            "100": 5,
            "200": 4.5,
            "300": 4.3,
            "500": 4,
            "1000": 3.4
          }
        }
      },
      "envelopeCost": {
        "Е65": 0.82,
        "С5": 0.99,
        "С4": 2.36
      }
    }
    
  },
  methods: {
      getTotal() {
        if (this.currentProduct == 'Конверты') {
          
          var format = document.getElementById('envelope-format').value
          var fill = document.getElementById('envelope-fill').value

          var editNum
          if (this.edition < 30) {
            editNum = 10
          } else if ((this.edition >= 30) && (this.edition < 50)) {
            editNum = 30
          } else if ((this.edition >= 50) && (this.edition < 100)) {
            editNum = 50
          } else if ((this.edition >= 100) && (this.edition < 200)) {
            editNum = 100
          } else if ((this.edition >= 200) && (this.edition < 300)) {
            editNum = 200
          } else if ((this.edition >= 300) && (this.edition < 500)) {
            editNum = 300
          } else if ((this.edition >= 500) && (this.edition < 1000)) {
            editNum = 500
          } else if (this.edition >= 1000) {
            editNum = 1000
          }

          var envelopeCost = this.db['envelopeCost'][format]
          var printCost = this.db['printCosts']["4+0"][fill] // стоимость печати при 20% или при 100% 4+0 формата А3
          var kRent = this.db['kRentOf']['envelope'][format][editNum]

          var total = (envelopeCost + printCost) * this.edition * kRent
          
          alert('товар: Конверты\nкол-во: '+this.edition+'\nстоимость: '+total+' ('+total/this.edition+' \u20BD/шт)')
        }
      }
  }
})