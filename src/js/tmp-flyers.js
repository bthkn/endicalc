var app = new Vue({
  el: '#flyersCalc',
  data: {
    currentProduct: 'Листовки',
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
      "paperFormats": ["A3", "A4", "A5", "A6", "210x98", "150x70", "100x70"],
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
        "flyers" : {
          "A3": {
            "4+0": {
              "50": 3.2,
              "100": 2.6,
              "200": 2.3,
              "300": 2.1,
              "400": 1.95,
              "500": 1.95,
              "1000": 1.95,
              "1000-20%": 2.3
            },
            "4+4": {
              "50": 2.9,
              "100": 2.4,
              "200": 2.25,
              "300": 2,
              "400": 1.9,
              "500": 1.9,
              "1000": 1.9,
              "1000-20%": 2.2
            }
          },
          "A4": {
            "4+0": {
              "50": 3.5,
              "100": 3,
              "200": 2.6,
              "300": 2.3,
              "400": 2.2,
              "500": 2.2,
              "1000": 2.1,
              "1000-20%": 2.8
            },
            "4+4": {
              "50": 3.2,
              "100": 2.7,
              "200": 2.3,
              "300": 2.1,
              "400": 2,
              "500": 1.9,
              "1000": 1.9,
              "1000-20%": 2.7
            }
          },
          "A5": {
            "4+0": {
              "50": 4.8,
              "100": 3.5,
              "200": 3,
              "300": 2.8,
              "400": 2.6,
              "500": 2.5,
              "1000": 2.5,
              "1000-20%": 3.25
            },
            "4+4": {
              "50": 4,
              "100": 3,
              "200": 2.8,
              "300": 2.5,
              "400": 2.35,
              "500": 2.2,
              "1000": 2.2,
              "1000-20%": 4
            }
          },
          "A6": {
            "4+0": {
              "50": 5.2,
              "100": 4,
              "200": 3,
              "300": 2.7,
              "400": 2.5,
              "500": 2.3,
              "1000": 2,
              "1000-20%": 5.4
            },
            "4+4": {
              "50": 5.5,
              "100": 3.2,
              "200": 3,
              "300": 2.5,
              "400": 2.5,
              "500": 2.4,
              "1000": 2.3,
              "1000-20%": 4
            }
          },
          "210x98": {
            "4+0": {
              "50": 4.8,
              "100": 3.5,
              "200": 2.5,
              "300": 2.3,
              "400": 2.2,
              "500": 2.2,
              "1000": 2.2,
              "1000-20%": 4.2
            },
            "4+4": {
              "50": 4.5,
              "100": 3,
              "200": 2.8,
              "300": 2.5,
              "400": 2.3,
              "500": 2.1,
              "1000": 2,
              "1000-20%": 3.5
            }
          },
          "150x70": {
            "4+0": {
              "50": 11,
              "100": 7,
              "200": 4.8,
              "300": 3.9,
              "400": 3.6,
              "500": 3.3,
              "1000": 2.8,
              "1000-20%": 5
            },
            "4+4": {
              "50": 6.5,
              "100": 5.5,
              "200": 3.6,
              "300": 3.5,
              "400": 3.3,
              "500": 3,
              "1000": 2.8,
              "1000-20%": 5
            }
          },
          "100x70": {
            "4+0": {
              "50": 11.5,
              "100": 9,
              "200": 5.5,
              "300": 4.5,
              "400": 4.1,
              "500": 3.6,
              "1000": 3.1,
              "1000-20%": 6.5
            },
            "4+4": {
              "50": 9,
              "100": 5.3,
              "200": 4,
              "300": 3.2,
              "400": 3.1,
              "500": 2.9,
              "1000": 2.5,
              "1000-20%": 5
            }
          }
        }
      },
      "flyerConst": {
        "A3": 1,
        "A4": 2,
        "A5": 4,
        "A6": 8,
        "210x98": 6,
        "150x70": 12,
        "100x70": 18
      }
    }
    
  },
  methods: {
    getTotal() {
      if (this.currentProduct == 'Листовки') {
        
        var paper = document.getElementById('flyers-paper').value
        var color = document.getElementById('flyers-color').value
        var format = document.getElementById('flyers-format').value

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
        } else if (this.edition >= 1000) {
          editNum = 1000
        }

        var paperCost = this.db['paperCosts'][paper]
        var printCost = this.db['printCosts'][color]['100']
        var kRent = this.db['kRentOf']['flyers'][format][""+color][editNum]
        var lamCost = this.isLaminated ? this.db['additional']['laminat'][editNum] : 0
        var cornerCost = this.isCorners ? this.db['additional']['corners'][editNum] : 0
        var biegenCost = this.isBiegen ? this.db['additional']['biegen'][editNum] : 0
        var flyerConst = this.db['flyerConst'][format]
        console.log(paperCost, printCost, kRent, lamCost, cornerCost, biegenCost, flyerConst)
        
        var total = ((paperCost + printCost) / flyerConst) * this.edition * kRent + lamCost + cornerCost + biegenCost

        alert('товар: Листовки\nкол-во: '+this.edition+'\nстоимость: '+total+' ('+total/this.edition+' \u20BD/шт)')
      }
    }
  }
})