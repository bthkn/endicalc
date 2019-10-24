const { remote } = require('electron')
// const axios = require('axios').default


var navBar = new Vue({
  el: '#navBar',
  data: {},
  methods: {
    setProduct(pr) {
      document.getElementById('nav_'+app.currentProduct).classList.remove("active")
      app.currentProduct = pr
      document.getElementById('nav_'+pr).classList.add("active")
    }
  }
})


var app = new Vue({
  el: '#app',
  data: {
    total: undefined,
    currentProduct: 'Визитки',
    isLaminated: undefined,
    isCorners: undefined,
    isBiegen: undefined,
    edition: undefined,
    linesNumber: undefined, // Буклеты и каталоги
    blockPages: undefined, // Блокноты
    db: {
      "productTypes": {
        "1": "Визитки",
        "2": "Листовки",
        "3": "Бланки",
        "4": "Буклеты и каталоги",
        "5": "Евробуклеты",
        "6": "Календари",
        "7": "Блокноты",
        "8": "Конверты"
      },
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
      "paperFormats": [
        "A3",
        "A4",
        "A5",
        "A6",
        "210x98",
        "150x70",
        "100x70"
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
              "100": 3.3,
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
        },
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
              "1000-20%": 3.5
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
        },
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
        },
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
          },
          "4+1": {
            "50": 7,
            "100": 6.5,
            "200": 6,
            "300": 5,
            "400": 4,
            "500": 3.5,
            "1000": 2.5,
            "5000": 1.8
          }
        },
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
        },
        "notes": {
          "А4": {
            "100": 2,
            "200": 1.69,
            "300": 1.6,
            "400": 1.5
          },
          "А5": {
            "100": 3.1,
            "200": 2.4,
            "300": 2.2,
            "400": 2
          },
          "А6": {
            "100": 3.7,
            "200": 3,
            "300": 2.7,
            "400": 2.5
          }
        },
        "calendars": {
          "basic": {
            "4+0": {
              "5": 7,
              "50": 4,
              "100": 3.7,
              "200": 3.15,
              "300": 2.71,
              "500": 2.34,
              "700": 2.2,
              "1000": 2,
              "2000": 1.9,
              "3000": 1.8
            }
          },
          "diy": {
            "4+0": {
              "5": 7,
              "50": 4,
              "100": 4,
              "200": 3.5,
              "300": 3,
              "500": 2.85,
              "700": 2.7,
              "1000": 2.65,
              "2000": 2.6,
              "3000": 2.5
            }
          },
          "vertical": {
            "4+0": {
              "5": 7,
              "50": 5.8,
              "100": 4.15,
              "200": 4,
              "300": 3.6,
              "500": 3.25,
              "700": 3.2,
              "1000": 3.2,
              "2000": 3.2,
              "3000": 3.2
            }
          },
          "horizontal": {
            "4+0": {
              "5": 7,
              "50": 6,
              "100": 5.9,
              "200": 5.8,
              "300": 5.2,
              "500": 4,
              "700": 3.9,
              "1000": 3.9,
              "2000": 3.9,
              "3000": 3.9 
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
      },
      "envelopeFormats": ["Е65", "С5", "С4"],
      "envelopeCost": {
        "Е65": 0.82,
        "С5": 0.99,
        "С4": 2.36
      },
      "springCost": 2.5,
      "grommetCost": 0.3,
      "calendars": {
        "Домик самосборный": {
          "картон": 0.5,
          "печать": 0.5,
          "пружина": 0,
          "люверс": 0,
          "блок_стандарт": 0,
          "блок_85x115": 0,
          "скоба": 2,
          "бегунок": 0
        },
        "Домик с блоками вертикальный": {
          "картон": 0.35,
          "печать": 0.35,
          "пружина": 0.3,
          "люверс": 0,
          "блок_стандарт": 0,
          "блок_85x115": 1,
          "скоба": 0,
          "бегунок": 0
        },
        "Домик с блоками горизонтальный": {
          "картон": 0.5,
          "печать": 0.5,
          "пружина": 0.3,
          "люверс": 0,
          "блок_стандарт": 0,
          "блок_85x115": 1,
          "скоба": 0,
          "бегунок": 0
        },
        "Моно стандарт": {
          "картон": 2,
          "печать": 2,
          "пружина": 1,
          "люверс": 1,
          "блок_стандарт": 0.3,
          "блок_85x115": 0,
          "скоба": 0,
          "бегунок": 1
        },
        "ТРИО economy": {
          "картон": 2,
          "печать": 1,
          "пружина": 3,
          "люверс": 1,
          "блок_стандарт": 1,
          "блок_85x115": 0,
          "скоба": 0,
          "бегунок": 1
        },
        "Трио big size": {
          "картон": 4,
          "печать": 2,
          "пружина": 4.5,
          "люверс": 1,
          "блок_стандарт": 1,
          "блок_85x115": 0,
          "скоба": 0,
          "бегунок": 1
        },
        "Трио standart": {
          "картон": 2,
          "печать": 1.25,
          "пружина": 3,
          "люверс": 1,
          "блок_стандарт": 1,
          "блок_85x115": 0,
          "скоба": 0,
          "бегунок": 1
        }
      },
      "calendarsTypes": [
        "Домик самосборный",
        "Домик с блоками вертикальный",
        "Домик с блоками горизонтальный",
        "Моно стандарт",
        "ТРИО economy",
        "Трио big size",
        "Трио standart"
      ]
    }
  },
  methods: {
    setProduct(pr) {
      document.getElementById('nav_'+this.currentProduct).classList.remove("active")
      this.currentProduct = pr
      document.getElementById('nav_'+pr).classList.add("active")
    },
    getTotal() {

      output = document.getElementById('outputList')

      output.innerHTML = '<li class="list-group-item"><b>Товар:</b> '+this.currentProduct+'</li>'

      if (this.currentProduct == 'Визитки') {

        var cardboardType // = document.getElementById('cardboardType').value
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

        (paper == this.db["paperTypes"][3]) ? cardboardType = 'normal' : cardboardType = 'dizcrd'

        var paperCost = this.db['paperCosts'][paper]
        var printCost = this.db['printCosts'][color]['100']
        var kRent = this.db['kRentOf']['visitCards'][cardboardType][""+color][editNum]
        var lamCost = this.isLaminated ? this.db['additional']['laminat'][editNum] : 0
        var cornerCost = this.isCorners ? this.db['additional']['corners'][editNum] : 0

        var total = ((paperCost + printCost) / 24) * this.edition * kRent + lamCost + cornerCost

        output.innerHTML += `<li class="list-group-item"><b>Тип картона:</b> ${(cardboardType == 'dizcrd' ? 'дизайнерский картон' : 'обычный картон')}</li>`
        output.innerHTML += `<li class="list-group-item"><b>Бумага:</b> ${paper}</li>`
        output.innerHTML += `<li class="list-group-item"><b>Цветность:</b> ${color}</li>`

      } else if (this.currentProduct == 'Листовки') {
        
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

        output.innerHTML += '<li class="list-group-item"><b>Бумага:</b> '+paper+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Цветность:</b> '+color+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Формат:</b> '+format+'</li>'

        // alert('товар: Листовки\nкол-во: '+this.edition+'\nстоимость: '+total+' ('+total/this.edition+' \u20BD/шт)')

      } else if (this.currentProduct == 'Бланки') {
          
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

        output.innerHTML += '<li class="list-group-item"><b>Бумага:</b> '+paper+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Заливка:</b> '+fill+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Цветность:</b> '+color+'</li>'
        
        // alert('товар: Бланки\nкол-во: '+this.edition+'\nстоимость: '+total+' ('+total/this.edition+' \u20BD/шт)')

      } else if (this.currentProduct == 'Буклеты и каталоги') {

        var cover = document.getElementById('booklets-cover').value
        var paper = document.getElementById('booklets-paper').value
        var format = document.getElementById('booklets-format').value

        console.log(cover, paper, format)

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

        var paperCost = (this.linesNumber >= 4) ? this.db['paperCosts'][paper] : 0
        var coverCost = this.db['paperCosts'][cover]
        var printCost = this.db['printCosts']["4+4"]['100']

        console.log(editNum, paperCost, coverCost, printCost)

        var lines
        if (this.linesNumber <= 8 ) {
          lines = "<8"
        } else if (this.linesNumber <= 12 ) {
          lines = "<12"
        } else if ((this.linesNumber >= 16) && (this.linesNumber <= 24)) {
          lines = "<16-24"
        } else if ((this.linesNumber >= 28) && (this.linesNumber <= 32)) {
          lines = "<28-32"
        } else if ((this.linesNumber >= 36) && (this.linesNumber <= 40)) {
          lines = "<36-40"
        } else if (this.linesNumber > 40) {
          lines = "<36-40"
        }
        if ((paper != cover) && (lines != "<8")) { lines += "_mixed" }

        console.log(this.linesNumber, lines)

        var kRent = this.db['kRentOf']['booklets']["4+4"][lines][editNum]
        var lamCost = this.isLaminated ? this.db['additional']['laminat'][editNum] : 0
        var cornerCost = this.isCorners ? this.db['additional']['corners'][editNum] : 0
        var skoba = (this.linesNumber >= 4) ? 2.2 : 0
        
        console.log(kRent, lamCost, cornerCost, skoba)

        var total
        if (format == "A4") {
          total = ( ((this.linesNumber - 4) / 4) * paperCost + (1 * coverCost)  + (this.linesNumber / 4) * printCost + (skoba * 2) ) * this.edition * kRent + lamCost + cornerCost
          // console.log(paperCost, coverCost, this.linesNumber, printCost, skoba, this.edition, kRent, lamCost, cornerCost)
        } else if (format == "A5") {
          total = ( ((this.linesNumber - 4) / 4) * (paperCost/2) + (1 * coverCost/2) + ( ((this.linesNumber / 4) * printCost) / 2) + (skoba * 2) ) * this.edition * kRent + lamCost + cornerCost
        } else if (format == "A6") {
          total = ( ((this.linesNumber - 4) / 4) * (paperCost/2) + (1 * coverCost/4) + ( ((this.linesNumber / 4) * printCost) / 4) + (skoba * 2) ) * this.edition * kRent + lamCost + cornerCost
        }

        output.innerHTML += '<li class="list-group-item"><b>Бумага обложки:</b> '+cover+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Бумага блока:</b> '+paper+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Формат полосы:</b> '+format+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Количество полос:</b> '+this.linesNumber+'</li>'

        // alert('товар: Буклеты и каталоги\nкол-во: '+this.edition+'\nстоимость: '+total+' ('+total/this.edition+' \u20BD/шт)')

      } else if (this.currentProduct == 'Евробуклеты') {

        var paper = document.getElementById('eurobooklets-paper').value
        // var color = document.getElementById('eurobooklets-color').value

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
        var printCost = this.db['printCosts']["4+4"]['100']
        var kRent = this.db['kRentOf']['flyers']["A4"]["4+4"][editNum]
        var lamCost = this.isLaminated ? this.db['additional']['laminat'][this.edition] : 0
        var cornerCost = this.isCorners ? this.db['additional']['corners'][this.edition] : 0
        var biegenCost = this.db['additional']['biegen'][editNum] // this.isBiegen ? this.db['additional']['biegen'][editNum] : 0
        console.log(paperCost, printCost, kRent, lamCost, cornerCost, biegenCost)

        var total = ((paperCost + printCost) / 2) * this.edition * kRent + (lamCost / 2) + cornerCost + biegenCost
        //     [(Стоимостьбумаги + стоимостьпечати) / 2] * Тираж * Крент + ламинация / 2 + скруг + биговка

        output.innerHTML += '<li class="list-group-item"><b>Бумага:</b> '+paper+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Цветность:</b> 4+4</li>'

        // alert('товар: Евробуклеты\nкол-во: '+this.edition+'\nстоимость: '+total+' ('+total/this.edition+' \u20BD/шт)')

      } else if (this.currentProduct == 'Календари') {

        var cardboard = document.getElementById('calendars-cardboard').value
        var type = document.getElementById('calendars-type').value

        var editNum
        if (this.edition < 50) {
          editNum = 5
        } else if ((this.edition >= 50) && (this.edition < 100)) {
          editNum = 50
        } else if ((this.edition >= 100) && (this.edition < 200)) {
          editNum = 100
        } else if ((this.edition >= 200) && (this.edition < 300)) {
          editNum = 200
        } else if ((this.edition >= 300) && (this.edition < 500)) {
          editNum = 300
        } else if ((this.edition >= 500) && (this.edition < 700)) {
          editNum = 500
        } else if ((this.edition >= 700) && (this.edition < 1000)) {
          editNum = 700
        } else if ((this.edition >= 1000) && (this.edition < 2000)) {
          editNum = 1000
        } else if ((this.edition >= 2000) && (this.edition < 3000)) {
          editNum = 2000
        } else if (this.edition >= 3000) {
          editNum = 3000
        }

        var printTabNum = this.db['calendars'][type]["печать"]
        var printCost = this.db['printCosts']["4+0"]['100']

        var cardboardTabNum = this.db['calendars'][type]["картон"]
        var cardboardCost = this.db['paperCosts'][cardboard]

        var springTabNum = this.db['calendars'][type]["пружина"]
        var springCost = this.db['springCost']

        var grommetTabNum = this.db['calendars'][type]["люверс"]
        var grommetCost = this.db['grommetCost'] // стоимость люверса

        var blockStd = this.db['calendars'][type]["блок_стандарт"] // календарный блок стандарт
        var blockStdCost = 7.6
        var block85 = this.db['calendars'][type]["блок_85x115"] // календарный блок 85*115
        var block85Cost = 7.6
        
        var skobaTabNum = this.db['calendars'][type]["скоба"]
        var skoba = 2.2 // стоимость скобы

        var begunokTabNum = this.db['calendars'][type]["бегунок"]
        var begunok = 3 // стоимость бегунка

        var kRent
        if (type == ("Моно стандарт" || "ТРИО economy" || "Трио big size"|| "Трио standart")) {
          kRent = this.db['kRentOf']["calendars"]["basic"]["4+0"][editNum]
        } else if (type == "Домик самосборный") {
          kRent = this.db['kRentOf']["calendars"]["diy"]["4+0"][editNum]
        } else if (type == "Домик с блоками вертикальный") {
          kRent = this.db['kRentOf']["calendars"]["vertical"]["4+0"][editNum]
        } else if (type == "Домик с блоками горизонтальный") {
          kRent = this.db['kRentOf']["calendars"]["horizontal"]["4+0"][editNum]
        }

        var total = ((cardboardTabNum * cardboardCost) + (printTabNum * printCost) + (springTabNum * springCost)  + (grommetTabNum * grommetCost) + (blockStd * blockStdCost) + (block85 * block85Cost) + (skobaTabNum * skoba) + (begunokTabNum * begunok)) * this.edition * kRent

        output.innerHTML += '<li class="list-group-item"><b>Формат:</b> '+type+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Картон:</b> '+cardboard+'</li>'

      } else if (this.currentProduct == 'Блокноты') {

        var blockFill = document.getElementById('notes-block-fill').value
        var blockColor = document.getElementById('notes-block-color').value
        var coverFill = document.getElementById('notes-cover-fill').value
        var coverColor = document.getElementById('notes-cover-color').value
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
        var printCost_cover = this.db['printCosts'][coverColor][coverFill]
        var printCost_block = this.db['printCosts'][blockColor][blockFill] // this.db['printCosts'][blockColor][blockFill]
        var springCost = this.db['springCost'] // 2.5

        var kRent = this.db['kRentOf']['notes'][format][editNum] // this.db['kRentOf']['notes'][format][blockColor][editNum] 
        var lamCost = this.isLaminated ? this.db['additional']['laminat'][editNum] : 0
        
        console.log(coverCost, this.blockPages, blockCost, printCost_cover, this.blockPages, printCost_block, springCost, this.edition, kRent, lamCost)

        var total
        if (format == "A4") {
          var total = (1*coverCost + (this.blockPages * blockCost/2) + (0.5*printCost_cover) + (this.blockPages * (printCost_block/2)) + (1*springCost)) * this.edition * kRent + lamCost
          alert(`итог: ${total.toFixed(2)} (с наценкой: ${(total * 1.05).toFixed(2)})`)
        } else if (format == "A5") {
          var total = (0.5*coverCost + (this.blockPages * blockCost/4) + (0.25*printCost_cover) + (this.blockPages * (printCost_block/4)) + (0.5*springCost)) * this.edition * kRent + lamCost
        } else if (format == "A6") {
          var total = (0.25*coverCost + (this.blockPages * blockCost/8) + (0.25*printCost_cover) + (this.blockPages * (printCost_block/8)) + (0.25*springCost)) * this.edition * kRent + lamCost
        }
        console.log((1*coverCost + (parseFloat(this.blockPages) * blockCost/2) + (0.5*printCost_cover) + (parseFloat(this.blockPages) * (printCost_block/2)) + (1*springCost)) * parseFloat(this.edition) * kRent + lamCost)
        console.log((1*coverCost + (this.blockPages * blockCost/2) + (0.5*printCost_cover) + (this.blockPages * (printCost_block/2)) + (1*springCost)) * this.edition * kRent + lamCost)
        
        output.innerHTML += '<li class="list-group-item"><b>Вид бумаги для картона:</b> '+cover+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Вид бумаги для блока:</b> '+paper+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Формат блокнота:</b> '+format+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Цветность печати блока:</b> '+blockFill+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Цветность печати обложки:</b> '+coverFill+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Количество листов блока:</b> '+this.blockPages+'</li>'

        var t = ( (1*coverCost + (parseFloat(this.blockPages) * blockCost/2) + (0.5*printCost_cover) + (parseFloat(this.blockPages) * (printCost_block/2)) + (1*springCost)) * parseFloat(this.edition) * kRent + lamCost )
        // alert(`товар: Блокноты\nВид бумаги для картона: ${cover}\nВид бумаги для блока: ${paper}\nФормат блокнота: ${format}\nЦветность печати блока: ${blockFill}\nЦветность печати обложки: ${coverFill}\nКоличество листов блока: ${this.blockPages}\nКол-во: ${this.edition}\nСтоимость: ${t.toFixed(2)} (${(t/this.edition).toFixed(2)} \u20BD/шт)`)

      } else if (this.currentProduct == 'Конверты') {
          
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

        output.innerHTML += '<li class="list-group-item"><b>Формат:</b> '+format+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Заливка:</b> '+fill+'</li>'
        
        // alert('товар: Конверты\nкол-во: '+this.edition+'\nстоимость: '+total+' ('+total/this.edition+' \u20BD/шт)')
      }

      output.innerHTML += `<li class="list-group-item"><b>Тираж:</b> ${this.edition}</li>`
      output.innerHTML += `<li class="list-group-item"><b>Цена тиража:</b> ${(total * 1.05).toFixed(2)}руб (${((total * 1.05)/this.edition).toFixed(2)}руб/шт)</li>`
      
      console.log(`>>>\nтовар: ${this.currentProduct}\nкол-во: ${this.edition}\nстоимость: ${total.toFixed(2)} (${(total/this.edition).toFixed(2)}/шт) [с наценкой: ${(total * 1.05).toFixed(2)}]`)

      this.triggerCart()
    },
    triggerCart: function () {
      var modal = document.getElementById("checkoutModal")
      modal.classList.forEach(cls => {
        if (cls == "show") {
          modal.classList.remove("show")
          document.getElementById("fade").classList.remove("show")
        } else {
          modal.classList.add("show")
          document.getElementById("fade").classList.add("show")
        }
      })
    }
  },
  computed: {},
  beforeMount() {
    document.getElementById('titlebar-btn-min').onclick = () => {
      remote.BrowserWindow.getFocusedWindow().minimize()
    }
    document.getElementById('titlebar-btn-cls').onclick = () => {
      remote.app.quit()
    }
    // axios.get('data.json') 
    //   .then((response) => {
    //     alert(response)
    //     document.write(JSON.parse(response))
    //   })
    //   .catch((error) => {
    //     alert('axios:\n'+error)
    //     console.log(error)
    //   });
  }
})