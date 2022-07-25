const levelLableMap = ['测试', '良好', '轻度', '中度', '重度']
const levelClassMap = [
  ['bg-sky-500', 'hover:bg-sky-600'],
  ['bg-emerald-400', 'hover:bg-emerald-500'], // 良好
  ['bg-amber-400', 'hover:bg-amber-500'], // 轻度
  ['bg-orange-400', 'hover:bg-orange-500'], // 中度
  ['bg-red-400', 'hover:bg-red-500'] //重度
]
const levelColorMap = [
  ['bg-slate-300'],
  ['bg-emerald-400'], // 良好
  ['bg-gradient-to-r', 'from-emerald-400', 'to-amber-400'], // 轻度
  ['bg-gradient-to-r', 'from-amber-400', 'to-orange-400'], // 中度
  ['bg-gradient-to-r', 'from-orange-400', 'to-red-400'] //重度
]

// document.getElementById('test').addEventListener('click', () => {
//   console.log('click')
//   chrome.runtime.sendMessage({
//     type: 'setMentalStatus',
//     data: { anxiety: 1, depression: 3, OCD: 4 }
//   })
// })

chrome.storage.sync.get('mentalStatus', (res) => {
  const mentalStatus = {
    anxiety: res.mentalStatus.anxiety.level,
    depression: res.mentalStatus.depression.level,
    OCD: res.mentalStatus.OCD.level
  }
  // mentalStatus = { anxiety: 1, depression: 3, OCD: 4 }
  const anxietyDom = document.getElementById('anxiety-label')
  const depressionDom = document.getElementById('depression-label')
  const ocdDom = document.getElementById('OCD-label')
  const anxietyColorDom = document.getElementById('anxiety-color')
  const depressionColorDom = document.getElementById('depression-color')
  const ocdColorDom = document.getElementById('OCD-color')
  // label 中的文字
  let anxietyText = '测试'
  let depressionText = '测试'
  let ocdText = '测试'
  // label 的 class
  let anxietyClass = levelClassMap[0]
  let depressionClass = levelClassMap[0]
  let ocdClass = levelClassMap[0]
  // 颜色条的 class
  let anxietyColorClass = levelColorMap[0]
  let depressionColorClass = levelColorMap[0]
  let ocdColorClass = levelColorMap[0]
  // 判断 label 中应该填的文字
  if (mentalStatus !== undefined && mentalStatus !== null) {
    if (mentalStatus.anxiety !== undefined) {
      anxietyText = levelLableMap[mentalStatus.anxiety]
      anxietyClass = levelClassMap[mentalStatus.anxiety]
      anxietyColorClass = levelColorMap[mentalStatus.anxiety]
    }

    if (!mentalStatus.depression !== undefined) {
      depressionText = levelLableMap[mentalStatus.depression]
      depressionClass = levelClassMap[mentalStatus.depression]
      depressionColorClass = levelColorMap[mentalStatus.depression]
    }

    if (!mentalStatus.OCD !== undefined) {
      ocdText = levelLableMap[mentalStatus.OCD]
      ocdClass = levelClassMap[mentalStatus.OCD]
      ocdColorClass = levelColorMap[mentalStatus.OCD]
    }
  }

  // 设置文字和 class
  anxietyDom.innerText = anxietyText
  anxietyDom.classList.add(...anxietyClass)
  anxietyDom.addEventListener('mouseenter', () => {
    if (anxietyDom.innerHTML !== '测试') {
      anxietyDom.innerHTML = '重测'
    }
  })
  anxietyDom.addEventListener('mouseleave', () => {
    anxietyDom.innerHTML = anxietyText
  })
  anxietyDom.addEventListener('click', () => {
    chrome.tabs.create({
      url: '../index.html'
    })
  })
  depressionDom.innerText = depressionText
  depressionDom.classList.add(...depressionClass)
  depressionDom.addEventListener('mouseenter', () => {
    if (depressionDom.innerHTML !== '测试') {
      depressionDom.innerHTML = '重测'
    }
  })
  depressionDom.addEventListener('mouseleave', () => {
    depressionDom.innerHTML = depressionText
  })
  ocdDom.innerText = ocdText
  ocdDom.classList.add(...ocdClass)
  ocdDom.addEventListener('mouseenter', () => {
    if (ocdDom.innerHTML !== '测试') {
      ocdDom.innerHTML = '重测'
    }
  })
  ocdDom.addEventListener('mouseleave', () => {
    ocdDom.innerHTML = ocdText
  })
  // 设置颜色条
  anxietyColorDom.classList.add(...anxietyColorClass)
  depressionColorDom.classList.add(...depressionColorClass)
  ocdColorDom.classList.add(...ocdColorClass)
})
