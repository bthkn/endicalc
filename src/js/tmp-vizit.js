var app = new Vue({
  el: '#vizitCardsCalc',
  data: {
    currentProduct: 'Визитки',
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
      "paperFormat": {
        "0":"A4",
        "1":"A5",
        "2":"A6"
      },
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
      "additional": {
        "corners" : {
          "50": 175,
          "100": 252,
          "200": 315,
          "300": 378,
          "400": 441,
          "500": 504,
          "1000": 819,
          "2000": 913.5
        },
        "laminat" : {
          "50": 2205,
          "100": 4400,
          "200": 8800,
          "300": 13200,
          "400": 17600,
          "500": 22000,
          "1000": 0,
          "2000": 0
        },
        "biegen" : {
          "50": 141.75,
          "100": 220.5,
          "200": 378,
          "300": 535.5,
          "400": 693,
          "500": 850.5,
          "1000": 1638,
          "2000": 0
        }
      },
      "kRentOf": {
        "visitCards": {
          "dizcrd": {
            "4+0": {
              "50": 3,
              "100": 2.9,
              "200": 2.8,
              "300": 2.5,
              "400": 2.2,
              "500": 2,
              "1000": 1.8,
              "2000": 1.75
            },
            "4+4": {
              "50": 3.5,
              "100": 3.2,
              "200": 3.2,
              "300": 3,
              "400": 2.9,
              "500": 2.7,
              "1000": 2.2,
              "2000": 2
            }
          },
          "normal": {
            "4+0": {
              "50": 6,
              "100": 4.45,
              "200": 3.34,
              "300": 2.9,
              "400": 2.9,
              "500": 2.8,
              "1000": 2.6,
              "2000": 2.1
            },
            "4+4": {
              "50": 7,
              "100": 4.9,
              "200": 3.9,
              "300": 3.6,
              "400": 3.6,
              "500": 3.5,
              "1000": 2.9,
              "2000": 2.1
            }
          }
        }
      }
    }
  },
  methods: {
      getTotal() {
        if (this.currentProduct == 'Визитки') {

          var cardboardType = document.getElementById('cardboardType').value
          var paper = document.getElementById('visitCards-paper').value
          var color = document.getElementById('visitCards-color').value

          var editNum
          if (this.edition < 100) {
            editNum = 50
          } else if ((this.edition >= 100) && (this.edition < 200)) {
            editNum = 100
          } else if ((this.edition >= 200) && (this.edition < 300)) {
            editNum = 200
          } else if ((this.edition >= 300) && (this.edition < 400)) {
            editNum = 300
          } else if ((this.edition >= 400) && (this.edition < 500)) {
            editNum = 400
          } else if ((this.edition >= 500) && (this.edition < 1000)) {
            editNum = 500
          } else if ((this.edition >= 1000) && (this.edition < 2000)) {
            editNum = 1000
          } else if (this.edition > 2000) {
            editNum = 2000
          }

          var paperCost = this.db['paperCosts'][paper]
          var printCost = this.db['printCosts'][color]['100']
          var kRent = this.db['kRentOf']['visitCards'][cardboardType][""+color][editNum]
          var lamCost = this.isLaminated ? this.db['additional']['laminat'][editNum] : 0
          var cornerCost = this.isCorners ? this.db['additional']['corners'][editNum] : 0
          console.log(paperCost, printCost, kRent, lamCost, cornerCost)

          var total = ((paperCost + printCost) / 24) * this.edition * kRent + lamCost + cornerCost
          
          alert('товар: Визитки\nкол-во: '+this.edition+'\nстоимость: '+total+' ('+total/this.edition+' \u20BD/шт)')
        }
      }
  }
})