var app = new Vue({
  el: '#blanksCalc',
  data: {
    currentProduct: 'Бланки',
    isLaminated: undefined,
    isCorners: undefined,
    isBiegen: undefined,
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
        "blanks": {
          "4+0": {
            "50": 8,
            "100": 7.5,
            "200": 7,
            "300": 6,
            "400": 5,
            "500": 4.5,
            "1000": 3.2,
            "5000": 1.8
          },
          "4+4": {
            "50": 7,
            "100": 6.5,
            "200": 6,
            "300": 5,
            "400": 4,
            "500": 3.5,
            "1000": 2.5,
            "5000": 1.8
          },
          "1+0": {
            "50": 9,
            "100": 8.5,
            "200": 8,
            "300": 7.5,
            "400": 6.8,
            "500": 6.5,
            "1000": 5,
            "5000": 2.1
          },
          "1+1": {
            "50": 9,
            "100": 8.5,
            "200": 8,
            "300": 7.5,
            "400": 6.8,
            "500": 6.5,
            "1000": 5,
            "5000": 2.2
          }
        }
      }
    }
  },
  methods: {
      getTotal() {
        if (this.currentProduct == 'Бланки') {
          
          var paper = document.getElementById('blanks-paper').value
          var color = document.getElementById('blanks-color').value
          var fill = document.getElementById('blanks-fill').value

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
          } else if ((this.edition >= 1000) && (this.edition < 5000)) {
            editNum = 1000
          } else if (this.edition >= 5000) {
            editNum = 5000
          }

          var paperCost = this.db['paperCosts'][paper]
          var printCost = this.db['printCosts'][color][fill]
          var kRent = this.db['kRentOf']['blanks'][""+color][editNum]
          var lamCost = this.isLaminated ? this.db['additional']['laminat'][editNum] : 0
          var cornerCost = this.isCorners ? this.db['additional']['corners'][editNum] : 0
          var biegenCost = this.isBiegen ? this.db['additional']['biegen'][editNum] : 0
          console.log(paperCost, printCost, kRent, lamCost, cornerCost, biegenCost)

          var total = ((paperCost + printCost) / 2) * this.edition * kRent + lamCost + cornerCost + biegenCost
          
          alert('товар: Визитки\nкол-во: '+this.edition+'\nстоимость: '+total+' ('+total/this.edition+'\u20BD руб/шт)')
        }
      }
  }
})