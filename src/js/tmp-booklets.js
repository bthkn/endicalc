var app = new Vue({
  el: '#bookletsCalc',
  data: {
    currentProduct: 'Буклеты и каталоги',
    isLaminated: undefined,
    isCorners: undefined,
    isBiegen: undefined,
    edition: undefined,
    linesNumber: undefined,
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
      "paperFormats": ["A4", "A5", "A6"],
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
        "booklets": {
          "4+4": {
            "<8": {
              "10": 5.5,
              "20": 4.6,
              "30": 4.2,
              "50": 3.7,
              "70": 3.5,
              "100": 3
            },
            "<12": {
              "10": 4.8,
              "20": 4,
              "30": 3.5,
              "50": 3.1,
              "70": 2.7,
              "100": 2.5
            },
            "<16-24": {
              "10": 3.8,
              "20": 3.3,
              "30": 2.7,
              "50": 2.3,
              "70": 2.1,
              "100": 1.9
            },
            "<16-24_mixed": {
              "10": 3.8,
              "20": 3.3,
              "30": 2.7,
              "50": 2.3,
              "70": 2.1,
              "100": 1.9
            },
            "<28-32": {
              "10": 3.5,
              "20": 2.9,
              "30": 2.5,
              "50": 2.1,
              "70": 1.9,
              "100": 1.85
            },
            "<28-32_mixed": {
              "10": 3.5,
              "20": 2.9,
              "30": 2.5,
              "50": 2.1,
              "70": 1.9,
              "100": 1.85
            },
            "<36-40": {
              "10": 3.2,
              "20": 2.55,
              "30": 2.2,
              "50": 1.9,
              "70": 1.8,
              "100": 1.77
            },
            "<36-40_mixed": {
              "10": 3.2,
              "20": 2.55,
              "30": 2.2,
              "50": 1.9,
              "70": 1.8,
              "100": 1.77
            }
          }
        }
      }
    }
  },
  methods: {
      getTotal() {
        if (this.currentProduct == 'Буклеты и каталоги') {

          var cover = document.getElementById('booklets-cover').value
          var paper = document.getElementById('booklets-paper').value
          var format = document.getElementById('booklets-format').value

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

          var paperCost = (this.linesNumber <= 4) ? this.db['paperCosts'][paper] : 0
          var coverCost = this.db['paperCosts'][cover]
          var printCost = this.db['printCosts']["4+4"]['100']

          var lines
          if (this.linesNumber <= 8 ) {
            lines = "<8"
          } else if (this.linesNumber < 12 ) {
            lines = "<12"
          } else if ((this.linesNumber > 16) && (this.linesNumber < 24)) {
            lines = "<16-24"
          } else if ((this.linesNumber > 28) && (this.linesNumber < 32)) {
            lines = "<28-32"
          } else if ((this.linesNumber > 36) && (this.linesNumber < 40)) {
            lines = "<36-40"
          } else if (this.linesNumber > 40) {
            lines = "<36-40"
          }

          if ((paper != cover) && (lines != "<8")) { lines += "_mixed" }

          console.log(this.linesNumber, lines)

          var kRent = this.db['kRentOf']['booklets']["4+4"][lines][editNum]
          var lamCost = this.isLaminated ? this.db['additional']['laminat'][editNum] : 0
          var cornerCost = this.isCorners ? this.db['additional']['corners'][editNum] : 0
          var skoba = (this.linesNumber <= 4) ? 2.2 : 0
          
          var total
          if (format == "A4") {
            total = ((this.linesNumber / 4) * paperCost + 1 * coverCost  + (this.linesNumber / 4) * printCost + skoba * 2) * this.edition * kRent + lamCost + cornerCost
          } else if (format == "A5") {
            total = ((this.linesNumber / 4) * paperCost/2 + 1 * coverCost/2 + ((this.linesNumber / 4) * printCost) / 2 + skoba * 2) * this.edition * kRent + lamCost + cornerCost
          } else if (format == "A6") {
            total = ((this.linesNumber / 4) * paperCost/2 + 1 * coverCost/4 + ((this.linesNumber / 4) * printCost) / 4 + skoba * 2) * this.edition * kRent + lamCost + cornerCost
          }
          
          alert('товар: Визитки\nкол-во: '+this.edition+'\nстоимость: '+total+' ('+total/this.edition+'\u20BD руб/шт)')
        }
      }
  }
})