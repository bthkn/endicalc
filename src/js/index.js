const { remote } = require('electron')
const { Menu, MenuItem } = remote
const fs = require('fs')
const ordersPath = './orders/'
// const axios = require('axios').default


var rubSign = '\&#8381;' // 'руб'


var navBar = new Vue({
  el: '#navBar',
  data: {},
  methods: {
    setProduct(pr) {
      document.getElementById('nav_'+app.currentProduct).classList.remove("active")
      app.currentProduct = pr
      document.getElementById('nav_'+pr).classList.add("active")
      app.total = undefined
      app.isLaminated = undefined
      app.isCorners = undefined
      app.isBiegen = undefined
      app.edition = undefined
      app.linesNumber = undefined
      app.blockPages = undefined
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
    db: {}
  },
  methods: {
    getLamCost(ed) {
      if (ed <= 100) {
        return this.db['additional']['laminat'][50]
      } else if ((ed >= 100) && (ed < 200)) {
        return this.db['additional']['laminat'][100]
      } else if ((ed >= 200) && (ed < 300)) {
        return this.db['additional']['laminat'][200]
      } else if ((ed >= 300) && (ed < 400)) {
        return this.db['additional']['laminat'][300]
      } else if ((ed >= 400) && (ed < 500)) {
        return this.db['additional']['laminat'][400]
      } else if (ed >= 500) {
        return this.db['additional']['laminat'][500]
      }
    },
    getCornersCost(ed) {
      if (ed <= 100) {
        return this.db['additional']['corners'][50]
      } else if ((ed >= 100) && (ed < 200)) {
        return this.db['additional']['corners'][100]
      } else if ((ed >= 200) && (ed < 300)) {
        return this.db['additional']['corners'][200]
      } else if ((ed >= 300) && (ed < 400)) {
        return this.db['additional']['corners'][300]
      } else if ((ed >= 400) && (ed < 500)) {
        return this.db['additional']['corners'][400]
      } else if ((ed >= 500) && (ed < 1000)) {
        return this.db['additional']['corners'][500]
      } else if ((ed >= 1000) && (ed < 2000)) {
        return this.db['additional']['corners'][1000]
      } else if (ed >= 2000) {
        return this.db['additional']['corners'][2000]
      }
    },
    getBiegenCost(ed) {
      if (ed <= 100) {
        return this.db['additional']['biegen'][50]
      } else if ((ed >= 100) && (ed < 200)) {
        return this.db['additional']['biegen'][100]
      } else if ((ed >= 200) && (ed < 300)) {
        return this.db['additional']['biegen'][200]
      } else if ((ed >= 300) && (ed < 400)) {
        return this.db['additional']['biegen'][300]
      } else if ((ed >= 400) && (ed < 500)) {
        return this.db['additional']['biegen'][400]
      } else if ((ed >= 500) && (ed < 1000)) {
        return this.db['additional']['biegen'][500]
      } else if ((ed >= 1000) && (ed < 2000)) {
        return this.db['additional']['biegen'][1000]
      } else if (ed >= 2000) {
        return this.db['additional']['biegen'][2000]
      }
    },
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
        var lamCost = this.isLaminated ? this.getLamCost(this.edition) : 0
        var lamCostNewFunc = this.getLamCost(50)
        lamCostNewFunc = lamCostNewFunc / 50 / 12 * this.edition
        var cornerCost = this.isCorners ? this.getCornersCost(this.edition) : 0

        var total = ((paperCost + printCost) / 24) * this.edition * kRent + lamCostNewFunc + cornerCost

        output.innerHTML += `<li class="list-group-item"><b>Тип картона:</b> ${(cardboardType == 'dizcrd' ? 'дизайнерский картон' : 'обычный картон')}</li>`
        output.innerHTML += `<li class="list-group-item"><b>Бумага:</b> ${paper}</li>`
        output.innerHTML += `<li class="list-group-item"><b>Цветность:</b> ${color}</li>`
        if (this.isLaminated) {
          output.innerHTML += `<li class="list-group-item"><b>Ламинация:</b> ${lamCost} ${rubSign}</li>`
        }
        if (this.isCorners) {
          output.innerHTML += `<li class="list-group-item"><b>Cкругление углов:</b> ${cornerCost} ${rubSign}</li>`
        }
        

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
        var lamCost = this.isLaminated ? this.getLamCost(this.edition) : 0
        var cornerCost = this.isCorners ? this.getCornersCost(this.edition) : 0
        var biegenCost = this.isBiegen ? this.getBiegenCost(this.edition) : 0
        var flyerConst = this.db['flyerConst'][format]
        console.log(paperCost, printCost, kRent, lamCost, cornerCost, biegenCost, flyerConst)
        
        var total = ((paperCost + printCost) / flyerConst) * this.edition * kRent + lamCost + cornerCost + biegenCost

        output.innerHTML += '<li class="list-group-item"><b>Бумага:</b> '+paper+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Цветность:</b> '+color+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Формат:</b> '+format+'</li>'
        if (this.isLaminated) {
          output.innerHTML += `<li class="list-group-item"><b>Ламинация:</b> ${lamCost} ${rubSign}</li>`
        }
        if (this.isCorners) {
          output.innerHTML += `<li class="list-group-item"><b>Cкругление углов:</b> ${cornerCost} ${rubSign}</li>`
        }
        if (this.isBiegen) {
          output.innerHTML += `<li class="list-group-item"><b>Биговка:</b> ${biegenCost} ${rubSign}</li>`
        }
        
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
        // var lamCost = this.isLaminated ? this.getLamCost(this.edition) : 0 // 1.2.1
        var lamCost = this.isLaminated
          ? (this.getLamCost(50) / 25 / this.db['flyerConst']['A4']) * this.edition 
          : 0
        var cornerCost = this.isCorners ? this.getCornersCost(this.edition) : 0
        var biegenCost = this.isBiegen ? this.getBiegenCost(this.edition) : 0
        console.log(paperCost, printCost, this.edition, kRent, lamCost, this.edition, cornerCost, biegenCost)

        var total = ((paperCost + printCost) / 2) * this.edition * kRent + lamCost + cornerCost + biegenCost

        output.innerHTML += '<li class="list-group-item"><b>Бумага:</b> '+paper+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Заливка:</b> '+fill+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Цветность:</b> '+color+'</li>'
        if (this.isLaminated) {
          output.innerHTML += `<li class="list-group-item"><b>Ламинация:</b> ${lamCost} ${rubSign}</li>`
        }
        if (this.isCorners) {
          output.innerHTML += `<li class="list-group-item"><b>Cкругление углов:</b> ${cornerCost} ${rubSign}</li>`
        }
        if (this.isBiegen) {
          output.innerHTML += `<li class="list-group-item"><b>Биговка:</b> ${biegenCost} ${rubSign}</li>`
        }

      } else if (this.currentProduct == 'Буклеты и каталоги') {

        var cover = document.getElementById('booklets-cover').value
        var paper = document.getElementById('booklets-paper').value
        var format = document.getElementById('booklets-format').value

        console.log(cover, paper, format)

        var editNum
        if (this.edition < 20) {
          editNum = 10
        } else if ((this.edition >= 20) && (this.edition < 30)) {
          editNum = 20
        } else if ((this.edition >= 30) && (this.edition < 50)) {
          editNum = 30
        } else if ((this.edition >= 50) && (this.edition < 70)) {
          editNum = 50
        } else if ((this.edition >= 70) && (this.edition < 100)) {
          editNum = 70
        } else if (this.edition >= 100) {
          editNum = 100
        }

        var paperCost = (this.linesNumber >= 4) ? this.db['paperCosts'][paper] : 0
        var coverCost = this.db['paperCosts'][cover]
        var printCost = this.db['printCosts']["4+4"]['100']

        console.log(editNum, paperCost, coverCost, printCost)

        if (this.linesNumber%4 != 0) {
          remote.dialog.showMessageBox({
            type: "warning",
            title: 'Неверное значение поля',
            message: 'Введите количество полос кратное 4'
          })
          return
        }

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
        // var lamCost = this.isLaminated ? this.getLamCost(this.edition) : 0 // 1.2.1
        var lamCost = this.isLaminated
          ? (this.getLamCost(50) / 25 / this.db['flyerConst'][format]) * this.edition * 2
          : 0
        var cornerCost = this.isCorners ? this.getCornersCost(this.edition) : 0
        var biegenCost = this.isBiegen ? this.getBiegenCost(this.edition) : 0
        var skoba = (this.linesNumber >= 4) ? 2.2 : 0
        
        console.log(kRent, lamCost, cornerCost, skoba)

        var total
        if (format == "A4") {
          total = ( ((this.linesNumber - 4) / 4) * paperCost + (1 * coverCost)  + (this.linesNumber / 4) * printCost + (skoba * 2) ) * this.edition * kRent + lamCost + cornerCost + biegenCost
          // console.log(paperCost, coverCost, this.linesNumber, printCost, skoba, this.edition, kRent, lamCost, cornerCost)
        } else if (format == "A5") {
          total = ( ((this.linesNumber - 4) / 4) * (paperCost/2) + (1 * coverCost/2) + ( ((this.linesNumber / 4) * printCost) / 2) + (skoba * 2) ) * this.edition * kRent + lamCost + cornerCost + biegenCost
        } else if (format == "A6") {
          total = ( ((this.linesNumber - 4) / 4) * (paperCost/2) + (1 * coverCost/4) + ( ((this.linesNumber / 4) * printCost) / 4) + (skoba * 2) ) * this.edition * kRent + lamCost + cornerCost + biegenCost
        }

        output.innerHTML += '<li class="list-group-item"><b>Бумага обложки:</b> '+cover+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Бумага блока:</b> '+paper+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Формат полосы:</b> '+format+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Количество полос:</b> '+this.linesNumber+'</li>'
        if (this.isLaminated) {
          output.innerHTML += `<li class="list-group-item"><b>Ламинация:</b> ${lamCost} ${rubSign}</li>`
        }
        if (this.isCorners) {
          output.innerHTML += `<li class="list-group-item"><b>Cкругление углов:</b> ${cornerCost} ${rubSign}</li>`
        }
        
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
        // var lamCost = this.isLaminated ? this.getLamCost(this.edition) : 0
        var lamCost = this.isLaminated
          ? (this.getLamCost(50) / 50) * this.edition 
          : 0
        var cornerCost = this.isCorners ? this.getCornersCost(this.edition) : 0
        var biegenCost = this.getBiegenCost(this.edition) // this.isBiegen ? this.db['additional']['biegen'][editNum] : 0
        console.log(paperCost, printCost, kRent, lamCost, cornerCost, biegenCost)

        var total = ((paperCost + printCost) / 2) * this.edition * kRent + lamCost + cornerCost + biegenCost
        //     [(Стоимостьбумаги + стоимостьпечати) / 2] * Тираж * Крент + ламинация / 2 + скруг + биговка

        output.innerHTML += '<li class="list-group-item"><b>Бумага:</b> '+paper+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Цветность:</b> 4+4</li>'
        if (this.isLaminated) {
          output.innerHTML += `<li class="list-group-item"><b>Ламинация:</b> ${lamCost} ${rubSign}</li>`
        }
        if (this.isCorners) {
          output.innerHTML += `<li class="list-group-item"><b>Cкругление углов:</b> ${cornerCost} ${rubSign}</li>`
        }
        output.innerHTML += `<li class="list-group-item"><b>Биговка:</b> ${biegenCost} ${rubSign}</li>`

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
        var blockStdCost = this.db['block_std']
        var block85 = this.db['calendars'][type]["блок_85x115"] // календарный блок 85*115
        var block85Cost = this.db['block_85']
        
        var skobaTabNum = this.db['calendars'][type]["скоба"]
        var skoba = this.db['skoba'] // стоимость скобы

        var begunokTabNum = this.db['calendars'][type]["бегунок"]
        var begunok = this.db['begunok'] // стоимость бегунка

        var kRent
        if (type == "Моно стандарт"/*|| "ТРИО economy" || "Трио big size"|| "Трио standart"*/) {
          kRent = this.db['kRentOf']["calendars"]["basic"]["4+0"][editNum]
        } else if (type == "Домик самосборный") {
          kRent = this.db['kRentOf']["calendars"]["diy"]["4+0"][editNum]
        } else if (type == "Домик с блоками вертикальный") {
          kRent = this.db['kRentOf']["calendars"]["vertical"]["4+0"][editNum]
        } else if (type == "Домик с блоками горизонтальный") {
          kRent = this.db['kRentOf']["calendars"]["horizontal"]["4+0"][editNum]
        }

        console.log(`cardboardTabNum ${cardboardTabNum}, cardboardCost ${cardboardCost}, printTabNum ${printTabNum}, printCost ${printCost}, springTabNum ${springTabNum}, springCost ${springCost}, grommetTabNum ${grommetTabNum}, grommetCost ${grommetCost}, blockStd ${blockStd}, blockStdCost ${blockStdCost}, block85 ${block85}, block85Cost ${block85Cost}, skobaTabNum ${skobaTabNum}, skoba ${skoba}, begunokTabNum ${begunokTabNum}, begunok ${begunok}, this.edition ${this.edition}, kRent ${kRent}`)
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
        
        console.log('printCost_cover:', printCost_cover)
        console.log('printCost_block:', printCost_block)

        var kRent = this.db['kRentOf']['notes'][format][editNum] // this.db['kRentOf']['notes'][format][blockColor][editNum] 
        // var lamCost = this.isLaminated ? this.getLamCost(this.edition) : 0
        var lamCost = 0
        
        console.log(this.getLamCost(50) / 25 / this.db["flyerConst"]["A4"] * this.edition * 2, lamCost)

        var total
        if (format == "А4") {
          if (this.isLaminated) {
            lamCost = this.getLamCost(50) / 25 / this.db["flyerConst"]["A4"] * this.edition * 2
          }
          total = (1*coverCost + (this.blockPages * (blockCost/2)) + (0.5*printCost_cover) + (this.blockPages * (printCost_block/2)) + (1*springCost)) * this.edition * kRent + lamCost
        } else if (format == "А5") {
          if (this.isLaminated) {
            lamCost = this.getLamCost(50) / 25 / this.db["flyerConst"]["А5"] * this.edition * 2
          }
          total = (0.5*coverCost + (this.blockPages * (blockCost/4)) + (0.25*printCost_cover) + (this.blockPages * (printCost_block/4)) + (0.5*springCost)) * this.edition * kRent + lamCost
        } else if (format == "А6") {
          if (this.isLaminated) {
            lamCost = this.getLamCost(50) / 25 / this.db["flyerConst"]["А6"] * this.edition * 2
          }
          total = (0.25*coverCost + (this.blockPages * (blockCost/8)) + (0.25*printCost_cover) + (this.blockPages * (printCost_block/8)) + (0.25*springCost)) * this.edition * kRent + lamCost
        }

        output.innerHTML += '<li class="list-group-item"><b>Вид бумаги для картона:</b> '+cover+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Вид бумаги для блока:</b> '+paper+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Формат блокнота:</b> '+format+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Цветность печати блока:</b> '+blockFill+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Цветность печати обложки:</b> '+coverFill+'</li>'
        output.innerHTML += '<li class="list-group-item"><b>Количество листов блока:</b> '+this.blockPages+'</li>'
        if (this.isLaminated) {
          output.innerHTML += `<li class="list-group-item"><b>Ламинация:</b> ${lamCost} ${rubSign}</li>`
        }


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
        if (this.isLaminated) {
          output.innerHTML += `<li class="list-group-item"><b>Ламинация:</b> ${lamCost} ${rubSign}</li>`
        }
        if (this.isCorners) {
          output.innerHTML += `<li class="list-group-item"><b>Cкругление углов:</b> ${cornerCost} ${rubSign}</li>`
        }

      }
      
      output.innerHTML += `<li class="list-group-item"><b>Тираж:</b> ${this.edition}</li>`
      output.innerHTML += `<li class="list-group-item"><b>Цена тиража:</b> ${(total * 1.05).toFixed(2)} ${rubSign} (${((total * 1.05)/this.edition).toFixed(2)} ${rubSign}/шт)</li>`
      
      console.log(`>>>\nтовар: ${this.currentProduct}\nкол-во: ${this.edition}\nстоимость: ${total.toFixed(2)} (${(total/this.edition).toFixed(2)}/шт) [с наценкой: ${(total * 1.05).toFixed(2)}]`)

      this.triggerCartView()
    },
    triggerCartView() {
      var checkoutView = document.getElementById("checkoutView")
      checkoutView.classList.forEach(cls => {
        if (cls == "show") {
          checkoutView.classList.remove("show")
          document.getElementById("fade").classList.remove("show")
        } else {
          checkoutView.classList.add("show")
          document.getElementById("fade").classList.add("show")
        }
      })
    },
    triggerSaveView() {
      var saveView = document.getElementById("saveView")
      saveView.classList.forEach(cls => {
        if (cls == "show") {
          saveView.classList.remove("show")
          document.getElementById("fade").style.zIndex = 9000
        } else {
          saveView.classList.add("show")
          document.getElementById("fade").style.zIndex = 9950
        }
      })
    },
    triggerOpenView() {
      console.log('app - act')
      var openView = document.getElementById("openView")
      openView.classList.forEach(cls => {
        if (cls == "show") {
          openView.classList.remove("show")
        } else {
          openView.classList.add("show")
          fsfrm.updateFileList()
        }
      })
    },
    resetFields() {
      app.total = undefined
      app.isLaminated = undefined
      app.isCorners = undefined
      app.isBiegen = undefined
      app.edition = undefined
      app.linesNumber = undefined
      app.blockPages = undefined
    },
    exportToTXT() {
      remote.dialog.showSaveDialog({
        defaultPath: "/export.txt",
        filters: [
          { name: 'Text file', extensions: ['txt'] }
        ]
      }).then((p) => {
        if (!p.canceled) {
          var raw = "\uFEFF"
          document.getElementById("outputList").querySelectorAll('li').forEach((e) => {
            raw += e.textContent + require('os').EOL
          })
          fs.writeFile(p.filePath, new Uint8Array(Buffer.from(raw)), (err) => {
            if (err) throw err
            new Notification('enDesign Calculator', { body: 'Файл сохранен' })
          })
        }
      })
    },
    exportToCSV() {
      var raw = 'data:text/csv;charset=utf-8,' + "\uFEFF"
      document.getElementById("outputList").querySelectorAll('li').forEach((e) => {
        var line = e.textContent.split(': ')
        raw += line[0] + ';' + line[1] + require('os').EOL
      })
      
      var link = document.createElement('a')
      link.setAttribute('href', encodeURI(raw))
      link.setAttribute('download', 'export.csv')
      link.click()
    },
    saveOrder() {
      var out = {}

      for (var key in app._data.db["productTypes"]) {
        if (app._data.db["productTypes"][key] === this.currentProduct) {
          out["prd"] = parseInt(key)
        }
      }

      switch (this.currentProduct) {
        case "Визитки":
          out["ppr"] = this.db["paperTypes"].indexOf(document.getElementById('visitCards-paper').value)
          out["clr"] = document.getElementById('visitCards-color').value
          out["edn"] = this.edition
          out["add"] = { "lam": this.isLaminated, "crn": this.isCorners }
          break
        case "Листовки":
          out["ppr"] = this.db["paperTypes"].indexOf(document.getElementById('flyers-paper').value)
          out["clr"] = document.getElementById('flyers-color').value
          out["fft"] = this.db["paperFormats"].indexOf(document.getElementById('flyers-format').value)
          out["edn"] = this.edition
          out["add"] = { "lam": this.isLaminated, "crn": this.isCorners, "bgn": this.isBiegen }
          break
        case "Бланки":
          out["ppr"] = this.db["paperTypes"].indexOf(document.getElementById('blanks-paper').value)
          out["bfl"] = document.getElementById('blanks-fill').value
          out["clr"] = document.getElementById('blanks-color').value
          out["edn"] = this.edition
          out["add"] = { "lam": this.isLaminated, "crn": this.isCorners, "bgn": this.isBiegen }
          break
        case "Буклеты и каталоги":
          out["bcr"] = this.db["paperTypes"].indexOf(document.getElementById('booklets-cover').value)
          out["bpr"] = this.db["paperTypes"].indexOf(document.getElementById('booklets-paper').value)
          out["bft"] = this.db["paperFormats"].indexOf(document.getElementById('booklets-format').value)
          out["lns"] = this.linesNumber
          out["edn"] = this.edition
          out["add"] = { "lam": this.isLaminated, "crn": this.isCorners, "bgn": this.isBiegen }
          break
        case "Евробуклеты":
          out["ppr"] = this.db["paperTypes"].indexOf(document.getElementById('eurobooklets-paper').value)
          out["clr"] = document.getElementById('eurobooklets-color').value
          out["edn"] = this.edition
          out["add"] = { "lam": this.isLaminated, "crn": this.isCorners, "bgn": this.isBiegen }
          break
        case "Календари":
          out["ctp"] = this.db["calendarsTypes"].indexOf(document.getElementById('calendars-type').value)
          out["ccd"] = 3 //this.db["paperFormats"].indexOf(document.getElementById('calendars-cardboard').value)
          out["edn"] = this.edition
          break
        case "Блокноты":
          out["ncr"] = this.db["paperTypes"].indexOf(document.getElementById('notes-cover').value)
          out["npr"] = this.db["paperTypes"].indexOf(document.getElementById('notes-paper').value)
          out["nft"] = /*this.db["paperFormats"].indexOf(*/ document.getElementById('notes-format').value //)
          out["nbf"] = document.getElementById('notes-block-fill').value
          out["nbc"] = document.getElementById('notes-block-color').value
          out["ncf"] = document.getElementById('notes-cover-fill').value
          out["ncc"] = document.getElementById('notes-cover-color').value
          out["bps"] = this.blockPages
          out["edn"] = this.edition
          out["add"] = { "lam": this.isLaminated }
          break
        case "Конверты":
          out["eft"] = this.db["envelopeFormats"].indexOf(document.getElementById('envelope-format').value)
          out["efl"] = document.getElementById('envelope-fill').value
          out["edn"] = this.edition
          break
        default:
          alert('Ошибка загрузки заказа.')
      }

      var orderName = document.getElementById('sf-fileName').value

      out["title"] = orderName
      out["date"] = new Date().getTime()
      
      var fileName = `${orderName}_${new Date().toLocaleDateString()}.json`
      const data = new Uint8Array(Buffer.from(JSON.stringify(out, null, '\t')))
      fs.writeFile(ordersPath+fileName, data, (err) => {
        if (err) throw err
        new Notification('enDesign Calculator', { body: 'Файл сохранен' })
      })

      this.triggerSaveView()
    },
    loadOrder(orderObj) {
      console.log(orderObj)
      this.triggerOpenView()

      document.getElementById('nav_'+app.currentProduct).classList.remove('active')
      this.currentProduct = this.db["productTypes"][orderObj["prd"]]
      document.getElementById('nav_'+app.currentProduct).classList.add('active')

      setTimeout(() => {
        switch (this.db["productTypes"][orderObj["prd"]]) {
          case "Визитки":
            document.getElementById('visitCards-paper').value = this.db["paperTypes"][orderObj["ppr"]]
            document.getElementById('visitCards-color').value = orderObj["clr"]
            this.edition = orderObj["edn"]
            this.isLaminated = orderObj["add"]["lam"]
            this.isCorners = orderObj["add"]["crn"]
            break
          case "Листовки":
            document.getElementById('flyers-paper').value = this.db["paperTypes"][orderObj["ppr"]]
            document.getElementById('flyers-color').value = orderObj["clr"]
            document.getElementById('flyers-format').value = this.db["paperFormats"][orderObj["fft"]]
            this.edition = orderObj["edn"]
            this.isLaminated = orderObj["add"]["lam"]
            this.isCorners = orderObj["add"]["crn"]
            this.isBiegen = orderObj["add"]["bgn"]
            break
          case "Бланки":
            document.getElementById('blanks-paper').value = this.db["paperTypes"][orderObj["ppr"]]
            document.getElementById('blanks-fill').value = orderObj["bfl"]
            document.getElementById('blanks-color').value = orderObj["clr"]
            this.edition = orderObj["edn"]
            this.isLaminated = orderObj["add"]["lam"]
            this.isCorners = orderObj["add"]["crn"]
            this.isBiegen = orderObj["add"]["bgn"]
            break
          case "Буклеты и каталоги":
            document.getElementById('booklets-cover').value = this.db["paperTypes"][orderObj["bcr"]]
            document.getElementById('booklets-paper').value = this.db["paperTypes"][orderObj["bpr"]]
            document.getElementById('booklets-format').value = this.db["paperFormats"][orderObj["bft"]]
            this.linesNumber = orderObj["lns"]
            this.edition = orderObj["edn"]
            this.isLaminated = orderObj["add"]["lam"]
            this.isCorners = orderObj["add"]["crn"]
            this.isBiegen = orderObj["add"]["bgn"]
            break
          case "Евробуклеты":
            document.getElementById('eurobooklets-paper').value = this.db["paperTypes"][orderObj["ppr"]]
            document.getElementById('eurobooklets-color').value = orderObj["clr"]
            this.edition = orderObj["edn"]
            this.isLaminated = orderObj["add"]["lam"]
            this.isCorners = orderObj["add"]["crn"]
            this.isBiegen = orderObj["add"]["bgn"]
            break
          case "Календари":
            document.getElementById('calendars-type').value = this.db["calendarsTypes"][orderObj["ctp"]]
            document.getElementById('calendars-cardboard').value = this.db["paperTypes"][orderObj["ccd"]]
            this.edition = orderObj["edn"]
            break
          case "Блокноты":
            document.getElementById('notes-cover').value = this.db["paperTypes"][orderObj["ncr"]]
            document.getElementById('notes-paper').value = this.db["paperTypes"][orderObj["npr"]]
            document.getElementById('notes-format').value = /*this.db["paperFormats"][*/ orderObj["nft"] //]
            document.getElementById('notes-block-fill').value = orderObj["nbf"]
            document.getElementById('notes-block-color').value = orderObj["nbc"]
            document.getElementById('notes-cover-fill').value = orderObj["ncf"]
            document.getElementById('notes-cover-color').value = orderObj["ncc"]
            this.blockPages = orderObj["bps"]
            this.edition = orderObj["edn"]
            this.isLaminated = orderObj["add"]["lam"]
            break
          case "Конверты":
            document.getElementById('envelope-format').value = this.db["envelopeFormats"][orderObj["eft"]]
            document.getElementById('envelope-fill').value = orderObj["efl"]
            this.edition = orderObj["edn"]
            break
          default:
            alert('Ошибка загрузки заказа.')
        }
      }, 50)
      
      setTimeout(() => {
        this.getTotal()
      }, 100)
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
    document.getElementById('titlebar-btn-mnu').onclick = () => {
      const menu = new Menu()
      menu.append(new MenuItem({
        label: 'Открыть заказ',
        click() {
          app.triggerOpenView()
        }
      }))
      // menu.append(new MenuItem({ type: 'separator' }))
      // menu.append(new MenuItem({
      //   label: 'Настройки',
      //   click() {
      //     console.log('item 1 clicked')
      //   }
      // }))
      menu.popup({ window: remote.getCurrentWindow(), x: 0, y: 28, })
    }
    
    //load data resources/app/src/data.json
    fs.readFile('resources/app/src/data.json', 'utf-8', (err, data) => {
      if (err) throw err
      this.db = JSON.parse(data)
    });
  },
  beforeCreate() {
    fs.mkdir(ordersPath, (err) => {
      if (err.code === 'EEXIST') return
      throw err
    })
  }
})

var fsfrm = new Vue({
  el: '#files',
  data: {
    order: undefined
  },
  methods: {
    updateFileList() {
      fs.readdir(ordersPath, (err, files) => {
        if (err) throw err
  
        console.log(files)
        
        var filesList = document.getElementById('files')
        filesList.innerHTML = ''
        if (files.length == 0) {
          filesList.innerHTML = '<p class="list-group-item">нет сохраненных заказов</p>'
        } else {
          for (f in files) {
            var fileName = files[f].replace('.json', '').replace('_', ' ')
            filesList.innerHTML += `<div class="list-group-item list-group-item-action d-flex m-0 row"><div class="col m-0" onclick="fsfrm.openFile('${files[f]}')">${fileName}</div><div class="col-1 m-0 p-0"><button type="button" class="btn btn-outline-danger pt-0 m-0" style="padding-bottom: 1px;" onclick="fsfrm.removeFile('${files[f]}')">×</button></div></div>`
            // filesList.innerHTML += `<button type="button" class="list-group-item list-group-item-action" onclick="fsfrm.openFile('${files[f]}')">${fileName}</button>`
          }
        }
      })
    },
    openFile(file) {
      fs.readFile(ordersPath+file, 'utf-8', (err, data) => {
        if (err) throw err
        this.order = JSON.parse(data)
        app.loadOrder(JSON.parse(data))
      })
    },
    removeFile(file) {
      fs.unlinkSync(ordersPath+file)
      this.updateFileList()
    }
  },
  beforeMount() {
    this.updateFileList()
  }
})