var app = new Vue({
  el: '#notesCalc',
  data: {
    currentProduct: 'Блокноты',
    blockPages: undefined,
    isLaminated: undefined,
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
        "notes": {
          "А4": {
            "0+0": {
              "100": 2.1,
              "200": 1.95,
              "300": 1.85,
              "400": 1.7
            },
            "1+0": {
              "100": 2,
              "200": 1.69,
              "300": 1.6,
              "400": 1.5
            }
          },
          "А5": {
            "0+0": {
              "100": 3.1,
              "200": 2.75,
              "300": 2.6,
              "400": 2.3
            },
            "1+0": {
              "100": 3.1,
              "200": 2.4,
              "300": 2.2,
              "400": 2
            }
          },
          "А6": {
            "0+0": {
              "100": 3.7,
              "200": 3.3,
              "300": 3.2,
              "400": 2.85
            },
            "1+0": {
              "100": 3.7,
              "200": 3,
              "300": 2.7,
              "400": 2.5
            }
          }
        }
      }
    }
    
  },
  methods: {
      getTotal() {
        if (this.currentProduct == 'Блокноты') {


          var blockFill = document.getElementById('notes-block-fill').value
          var blockColor = document.getElementById('notes-block-color').value
          var coverFill = document.getElementById('notes-cover-fill').value
          var cover = document.getElementById('notes-cover').value
          var paper = document.getElementById('notes-paper').value
          var format = document.getElementById('notes-format').value

          var editNum
          if (this.edition < 200) {
            editNum = 100
          } else if ((this.edition >= 200) && (this.edition < 300)) {
            editNum = 200
          } else if ((this.edition >= 300) && (this.edition < 400)) {
            editNum = 300
          } else if (this.edition >= 400) {
            editNum = 400
          }

          var blockCost = this.db['paperCosts'][paper]
          var coverCost = this.db['paperCosts'][cover]
          var printCost_cover = this.db['printCosts']["4+0"][coverFill]
          var printCost_block = this.db['printCosts'][blockColor][blockFill]
          var springCost = this.db['springCost'] // 2.5

          var kRent = this.db['kRentOf']['notes'][format][editNum]
          var lamCost = this.isLaminated ? this.db['additional']['laminat'][editNum] : 0
          
          var total
          if (format == "A4") {
            total = (1 * coverCost + (this.blockPages * blockCost / 2) + (0,5 * printCost_cover) + (this.blockPages * (printCost_block / 2)) + (1 * springCost)) * this.edition * kRent + lamCost
          } else if (format == "A5") {
            total = ((this.linesNumber / 4) * paperCost/2 + 1 * coverCost/2 + ((this.linesNumber / 4) * printCost) / 2 + skoba * 2) * this.edition * kRent + lamCost + cornerCost
          } else if (format == "A6") {
            total = ((this.linesNumber / 4) * paperCost/2 + 1 * coverCost/4 + ((this.linesNumber / 4) * printCost) / 4 + skoba * 2) * this.edition * kRent + lamCost + cornerCost
          }
          
          alert('товар: Блокноты\nкол-во: '+this.edition+'\nстоимость: '+total+' ('+total/this.edition+'\u20BD руб/шт)')
        }
      }
  }
})