const { BrowserWindow, remote } = require('electron')
const { Menu, MenuItem } = remote
const fs = require('fs')
const ordersPath = '/Users/user/Saved Games/orders/'
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
        var lamCost = this.isLaminated ? this.db['additional']['laminat'][editNum] : 0
        var cornerCost = this.isCorners ? this.db['additional']['corners'][editNum] : 0
        var biegenCost = this.isBiegen ? this.db['additional']['biegen'][editNum] : 0
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
        var lamCost = this.isLaminated ? this.db['additional']['laminat'][editNum] : 0
        var cornerCost = this.isCorners ? this.db['additional']['corners'][editNum] : 0
        var biegenCost = this.isBiegen ? this.db['additional']['biegen'][editNum] : 0
        console.log(paperCost, printCost, kRent, lamCost, cornerCost, biegenCost)

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
        var lamCost = this.isLaminated ? this.db['additional']['laminat'][this.edition] : 0
        var cornerCost = this.isCorners ? this.db['additional']['corners'][this.edition] : 0
        var biegenCost = this.db['additional']['biegen'][editNum] // this.isBiegen ? this.db['additional']['biegen'][editNum] : 0
        console.log(paperCost, printCost, kRent, lamCost, cornerCost, biegenCost)

        var total = ((paperCost + printCost) / 2) * this.edition * kRent + (lamCost / 2) + cornerCost + biegenCost
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

        var kRent = this.db['kRentOf']['notes'][format][editNum] // this.db['kRentOf']['notes'][format][blockColor][editNum] 
        var lamCost = this.isLaminated ? this.db['additional']['laminat'][editNum] : 0
        
        console.log(coverCost, this.blockPages, blockCost, printCost_cover, this.blockPages, printCost_block, springCost, this.edition, kRent, lamCost)

        var total
        if (format == "А4") {
          total = (1*coverCost + (this.blockPages * (blockCost/2)) + (0.5*printCost_cover) + (this.blockPages * (printCost_block/2)) + (1*springCost)) * this.edition * kRent + lamCost
        } else if (format == "А5") {
          total = (0.5*coverCost + (this.blockPages * (blockCost/4)) + (0.25*printCost_cover) + (this.blockPages * (printCost_block/4)) + (0.5*springCost)) * this.edition * kRent + lamCost
        } else if (format == "А6") {
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
    exportToFile() {
      remote.dialog.showSaveDialog({
        defaultPath: "export.txt"
      }).then((p) => {
        if (!p.canceled) {
          const data = new Uint8Array(Buffer.from(document.getElementById('outputList').innerText))
          fs.writeFile(p.filePath, data, (err) => {
            if (err) throw err
            new Notification('enDesign Calculator', { body: 'Файл сохранен' })
          })
        }
      })
    },
    saveOrder() {
      var product
      for (var key in app._data.db["productTypes"]) {
        if (app._data.db["productTypes"][key] === this.currentProduct) {
          product = key
        }
      }
      var paper = this.db["paperTypes"].indexOf(document.getElementById('blanks-paper').value)
      var fill = document.getElementById('blanks-fill').value
      // var 
      
      var out = {
        // optional
        "prd": parseInt(product),
        "ppr": paper,
        "fll": fill,
        // "clr": color,
        "edn": parseInt(this.edition),
        "lns": this.linesNumber,
        "pgs": this.blockPages,
        "add": {"lam": this.isLaminated, "crn": this.isCorners, "bgn": this.isBiegen},
        // required
        "title": "",
        "date": new Date().toLocaleTimeString()
      }
      
      var filePath = '/Users/user/Saved Games/orders/'
      var fileName = `${Math.floor((Math.random()**Math.random())*1e8)}_${new Date().toLocaleTimeString().replace(':', '.').replace(':', '.')}.json`
      const data = new Uint8Array(Buffer.from(JSON.stringify(out, null, '\t')))
      fs.writeFile(filePath+fileName, data, (err) => {
        if (err) throw err
        new Notification('enDesign Calculator', { body: 'Файл сохранен' })
      })
    },
    loadOrder(order) {

      // fs.readdir('/Users/user/Saved Games/orders', (err, files) => {
      //   if (err) throw err
      //   document.appendChild('<div><ul id="files"></ul></div>')
      //   var files = document.getElementById('files').innerHTML
      //   for (file in files) {
      //     files += `<li>${file}</li>`
      //   }
      //   console.log(files)
      // })

      document.getElementById('nav_'+app.currentProduct).classList.remove('active')
      this.currentProduct = order
      document.getElementById('nav_'+app.currentProduct).classList.add('active')

      setTimeout(() => {
        document.getElementById('blanks-paper').value = "Delight gloss в упак C2S Art Board мел.картон 2 ст. 310"
        document.getElementById('blanks-fill').value = "20"
        document.getElementById('blanks-color').value = "4+4"
        this.edition = 100
        this.isLaminated = true
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
          // app.loadOrder("Бланки")
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
    
    //load data
    fs.readFile('src/data.json', 'utf-8', (err, data) => {
      if (err) throw err
      this.db = JSON.parse(data)
    });
  }
})

var fsfrm = new Vue({
  el: '#files',
  data: {
    order: undefined
  },
  methods: {
    triggerOpenView() {
      console.log('ov - act')
      app.triggerOpenView()
    },
    openFile(file) {
      fs.readFile(ordersPath+file, 'utf-8', (err, data) => {
        if (err) throw err
        console.log(data)
        this.order = JSON.parse(data)
      })
    }
  },
  beforeMount() {
    fs.readdir(ordersPath, (err, files) => {
      if (err) throw err

      console.log(files)
      
      var filesList = document.getElementById('files')

      for (f in files) {
        var fileName = files[f].replace('.json', '').replace('_', ' ')
        filesList.innerHTML += `<button type="button" class="list-group-item list-group-item-action" onclick="fsfrm.openFile('${files[f]}')">${fileName}</button>`
      }
        
    })
  }
})