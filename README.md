# endicalc
 
```
// 1.1. Визитка на диз. картоне
var paperCost = 6.85 // Стоимость бумаги
var printCost = 8 // стоимость печати 100%
var edition = 100 // Тираж
var kRent = 7.5 // Коэффициент рентабельности по визиткам соответствующего тиража
var lamCost = 0 // Стоимость ламинации соответствующего тиража
var cornerCost = 0 // стоимость скругления углов

var total11 = ((paperCost + printCost) / 24) * edition * kRent + lamCost + cornerCost
console.log('Визитки (диз. картон) = ' + total11)

// 1.2. Визитка на диз. картоне
var paperCost = 6.85 // Стоимость бумаги
var printCost = 8 // стоимость печати 100%
var edition = 100 // Тираж
var kRent = 7.5 // Коэффициент рентабельности по визиткам соответствующего тиража
var lamCost = 0 // Стоимость ламинации соответствующего тиража
var cornerCost = 0 // стоимость скругления углов

var total12 = [(paperCost + printCost) / 24] * edition * kRent + lamCost + cornerCost
console.log('Визитки = ' + total12)

// 2. Листовки
var paperCost = 6.85 // Стоимость бумаги
var printCost = 8 // стоимость печати 100%
var flyerConst = 1 // А3: 1, А4: 2, А5: 4, А6: 8, 210*98: 6, 150*70: 12, 100*70: 18
var edition = 100 // Тираж
var kRent = 7.5 // Коэффициент рентабельности по соответствующему виду листовок, соответствующего тиража, соответствующей цветности
var lamCost = 0 // Стоимость ламинации соответствующего тиража (при выборе пользователем)
var cornerCost = 0 // стоимость скругления углов (при выборе пользователем)
var biegenCost = 0 // стоимость биговки соответствующего тиража (при выборе пользователем)

var total2 = ((paperCost + printCost) / flyerConst) * edition * kRent + lamCost + cornerCost + biegenCost
console.log('Листовки = ' + total2)

// 3. Бланки
var paperCost = 6.85 // Стоимость бумаги
var printCost = 8 // стоимость печати при 100% или 20% заливке
var edition = 100 // Тираж
var kRent = 7.5 // Коэффициент рентабельности по соответствующему виду бланков, соответствующего тиража, соответствующей цветности
var lamCost = 0 // Стоимость ламинации соответствующего тиража (при выборе пользователем)
var cornerCost = 0 // стоимость скругления углов (при выборе пользователем)
var biegenCost = 0 // стоимость биговки соответствующего тиража (при выборе пользователем)

var total3 = ((paperCost + printCost) / 2) * edition * kRent + lamCost + cornerCost + biegenCost
console.log('Бланки = ' + total3)


// 4. Буклеты и каталоги
var linesNumber = 52 // Количество полос 
var paperPerBlockCost = 1.84 // Стоимость бумаги для блока
var paperPerCoverCost = 6.85 // Стоимость бумаги для обложки
var printCost = 16 // Стоимость печати 100% при 4+4
var edition = 100 // Тираж
var skoba = 2.2 // стоимость скобы
var kRent = 1.77 // Коэффициент рентабельности по соответствующему виду каталогов (в зависимости от того одинаковые типы бумаги для обложки и блока или нет), соответствующего тиража
var lamCost = 0 // Стоимость ламинации соответствующего тиража (при выборе пользователем)
var cornerCost = 0 // стоимость скругления углов (при выборе пользователем)
// A4
var total41 = ( (linesNumber / 4) * paperPerBlockCost + 1 * paperPerCoverCost  + (linesNumber / 4) * printCost + skoba * 2) * edition * kRent + lamCost + cornerCost
console.log('Буклеты и каталоги (A4) = ' + total41)
// A5
var total42 = ((linesNumber / 4) * paperPerBlockCost/2 + 1 * paperPerCoverCost/2 + ((linesNumber / 4) * printCost) / 2 + skoba * 2) * edition * kRent + lamCost + cornerCost
console.log('Буклеты и каталоги (A5) = ' + total42)
// A6
var total42 = ((linesNumber / 4) * paperPerBlockCost/4 + 1 * paperPerCoverCost/4 + ((linesNumber / 4) * printCost) / 4 + skoba * 2) * edition * kRent + lamCost + cornerCost
console.log('Буклеты и каталоги (A6) = ' + total42)

// 5. Евробуклеты
var paperCost = 6.85 // Стоимость бумаги
var printCost = 16 // Стоимость печати 100% при 4+4
var edition = 100 // Тираж
var kRent = 1.77 // Коэффициент рентабельности по соответствующему виду листовок для формата А4, соответствующего тиража, соответствующей цветности
var lamCost = 0 // Стоимость ламинации соответствующего тиража (при выборе пользователем)
var cornerCost = 0 // стоимость скругления углов (при выборе пользователем)
var biegenCost = 0 // стоимость биговки соответствующего тиража (обязательно)

var total5 = ((paperCost + printCost) / 2) * edition * kRent + (lamCost / 2) + cornerCost + biegenCost
console.log('Евробуклеты = ' + total5)

// 6. Календари
var bravoCost = 1.77 // стоимость картона Bravo
var printCost = 16 // стоимость печати 4+0 при 100% заливке
var springCost = 0 // стоимость пружины
var grommetCost = 0 // стоимость люверса
var blockStd = 0 // календарный блок стандарт
var block85 = 0 // календарный блок 85*115
var skoba = 2.2 // стоимость скобы
var begunok = 0 // стоимость бегунка
var edition = 100 // тираж
var kRent = 1.77 // коэффициент рентабельности

var total6 = (bravoCost + printCost + springCost + grommetCost + blockStd + block85 + skoba + begunok) * edition * kRent
console.log('Календари = ' + total6)

// 7. Блокноты

var edition = 100 // тираж
var kRent = 1.77 // коэффициент рентабельности по блокнотам в зависимости от тиража
var lamCost = 0 // стоимость ламинации (только для обложки) в случае выбора пользователем
// А4
var total7 = [1*Стоимость листа картона для обложки + количество листов в блоке * Стоимость бумаги блока / 2 + 0,5 * стоимость печати обложки в зависимости от вида заливки + количество листов в блоке * стоимость печати блока в зависимости от вида запечатки и цветности / 2 + 1* стоимость пружины ] * edition * kRent + lamCost
console.log('Блокноты = ' + total7)
```