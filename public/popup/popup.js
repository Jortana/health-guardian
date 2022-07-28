const levelLableMap = ['良好', '轻度', '中度', '重度']
const baseLevelClass = ['bg-sky-500', 'hover:bg-sky-600']
const levelClassMap = [
  ['bg-emerald-400', 'hover:bg-emerald-500'], // 良好
  ['bg-amber-400', 'hover:bg-amber-500'], // 轻度
  ['bg-orange-400', 'hover:bg-orange-500'], // 中度
  ['bg-red-400', 'hover:bg-red-500'] //重度
]

const baseLevelColor = ['bg-slate-300']
const levelColorMap = [
  ['bg-emerald-400'], // 良好
  ['bg-gradient-to-r', 'from-emerald-400', 'to-amber-400'], // 轻度
  ['bg-gradient-to-r', 'from-amber-400', 'to-orange-400'], // 中度
  ['bg-gradient-to-r', 'from-orange-400', 'to-red-400'] //重度
]

// 设置健康卡片按钮
const setHealthCard = document.getElementById('set-health-card')
// 呼救按钮的 container
const sosContainer = document.getElementById('sos-btn-container')
// 呼救按钮
const sosBtn = document.getElementById('sos-btn')
// 成功提示
const checkModal = document.getElementById('check-modal')
// 控制打勾的 checkbox
const successCheckbox = document.getElementById('success-check')

// 设置健康卡片按钮的点击事件
setHealthCard &&
  setHealthCard.addEventListener('click', () => {
    chrome.tabs.create({
      url: '../index.html'
    })
  })

// 对心理状态的情况进行处理
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
  let anxietyClass = baseLevelClass
  let depressionClass = baseLevelClass
  let ocdClass = baseLevelClass
  // 颜色条的 class
  let anxietyColorClass = baseLevelColor
  let depressionColorClass = baseLevelColor
  let ocdColorClass = baseLevelColor
  // 判断 label 中应该填的文字
  if (mentalStatus !== undefined && mentalStatus !== null) {
    if (mentalStatus.anxiety !== undefined && mentalStatus.anxiety >= 0) {
      anxietyText = levelLableMap[mentalStatus.anxiety]
      anxietyClass = levelClassMap[mentalStatus.anxiety]
      anxietyColorClass = levelColorMap[mentalStatus.anxiety]
    }

    if (
      !mentalStatus.depression !== undefined &&
      mentalStatus.depression >= 0
    ) {
      depressionText = levelLableMap[mentalStatus.depression]
      depressionClass = levelClassMap[mentalStatus.depression]
      depressionColorClass = levelColorMap[mentalStatus.depression]
    }

    if (!mentalStatus.OCD !== undefined && mentalStatus.OCD >= 0) {
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
      url: '../index.html#/anxiety'
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
  depressionDom.addEventListener('click', () => {
    chrome.tabs.create({
      url: '../index.html#/depression'
    })
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
  ocdDom.addEventListener('click', () => {
    chrome.tabs.create({
      url: '../index.html#/ocd'
    })
  }) // 设置颜色条
  anxietyColorDom.classList.add(...anxietyColorClass)
  depressionColorDom.classList.add(...depressionColorClass)
  ocdColorDom.classList.add(...ocdColorClass)
})

// 对健康卡片的情况进行处理
chrome.storage.sync.get('cardInfo', (res) => {
  const { cardInfo } = res
  if (cardInfo.set === true) {
    setHealthCard.classList.add('hidden')
    sosBtn.classList.remove('hidden')
  } else {
    setHealthCard.classList.remove('hidden')
    sosBtn.classList.add('hidden')
  }

  // 根据场所的个数添加呼救按钮
  const { situations } = cardInfo
  const btnClassList = ['btn-secondary', 'btn-primary', 'btn-accent']
  situations.forEach((situation, index) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.classList.add(
      ...'btn-circle min-h-0 h-10 w-10 font-semibold text-tiny situation-btn z-10 hidden'.split(
        ' '
      ),
      btnClassList[index]
    )
    btn.innerText = situation.location
    btn.addEventListener('click', () => {
      console.log(situation)
      checkModal.classList.remove('hidden')
      checkModal.classList.add('flex')
      successCheckbox.checked = true

      setTimeout(() => {
        checkModal.classList.remove('flex')
        checkModal.classList.add('hidden')
        successCheckbox.checked = false
      }, 3000)
    })
    sosContainer.appendChild(btn)
  })

  // 当鼠标点击 sos 按钮的时候显示选项
  sosBtn.addEventListener('click', () => {
    console.log('sos click')
    sosBtn.classList.remove('flip-in-hor-bottom')
    sosBtn.classList.add('flip-out-hor-top')
    const btns = document.getElementsByClassName('situation-btn')
    for (let btn of btns) {
      btn.classList.add('flip-in-hor-top')
      btn.classList.remove('flip-out-hor-bottom', 'hidden')
    }
  })

  // 当鼠标移出 sos container 的时候将里面的内容还原
  sosContainer.addEventListener('mouseleave', () => {
    console.log('leave container')
    if (sosBtn.classList.contains('flip-out-hor-top')) {
      sosBtn.classList.remove('flip-out-hor-top')
      sosBtn.classList.add('flip-in-hor-bottom')
    }

    const btns = document.getElementsByClassName('situation-btn')
    for (let btn of btns) {
      btn.classList.remove('flip-in-hor-top')
      btn.classList.add('flip-out-hor-bottom')
      setTimeout(() => {
        btn.classList.add('hidden')
      }, 500)
    }
  })
})
