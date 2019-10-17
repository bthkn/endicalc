
// var paperCost = 0 // Стоимость бумаги
// var printCost = 8 // стоимость печати 100%
// var edition = 100 // Тираж
// var kRent = 7.5 // Коэффициент рентабельности по визиткам соответствующего тиража
// var lamCost = 0 // Стоимость ламинации соответствующего тиража
// var cornerCost = 0 // стоимость скругления углов
// var biegenCost = 0 // стоимость биговки соответствующего тиража (при выборе пользователем)
// var flyerConst = 1 // А3: 1, А4: 2, А5: 4, А6: 8, 210*98: 6, 150*70: 12, 100*70: 18
// var linesNumber = 52 // Количество полос
// var coverCost = 6.85 // Стоимость бумаги для обложки
// var skoba = 2.2 // стоимость скобы
// var springCost = 0 // стоимость пружины
// var grommetCost = 0 // стоимость люверса
// var blockStd = 0 // календарный блок стандарт
// var block85 = 0 // календарный блок 85*115
// var begunok = 0 // стоимость бегунка

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

          var paperCost = this.db['paperCosts'][paper]
          var printCost = this.db['printCosts'][color]['100']
          var kRent = this.db['kRentOf']['visitCards'][cardboardType][""+color][this.edition]
          var lamCost = this.isLaminated ? this.db['additional']['laminat'][this.edition] : 0
          var cornerCost = this.isCorners ? this.db['additional']['corners'][this.edition] : 0
          console.log(paperCost, printCost, kRent, lamCost, cornerCost)

          var total = ((paperCost + printCost) / 24) * this.edition * kRent + lamCost + cornerCost
          
          alert('товар: Визитки\nкол-во: '+this.edition+'\nстоимость: '+total+' ('+total/this.edition+'\u20BD руб/шт)')
        }
      }
  }
})