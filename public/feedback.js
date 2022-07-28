// chrome.runtime.sendMessage({ method: 'getSettings' }, function (response) {
//   console.log('aaa')
//   console.log(response)
// })

const DATAURL = 'https://jortana.fun:9003/api/data/emotion-data'

chrome.storage.sync.get('settings', (res) => {
  const {
    settings: { allowFilter }
  } = res
  if (allowFilter) {
    addFeedbackBtn()
  }
})

let direction
const baseR = '-10px'
const baseL = '-60px'

const addDragEvent = (el, clickEl, children) => {
  let flag = false
  let disX
  let disY
  let startTime
  let endTime
  el.onmousedown = (e) => {
    e.stopPropagation()
    e.preventDefault()
    //算出鼠标相对元素的位置
    flag = true
    disX = e.clientX - el.offsetLeft
    disY = e.clientY - el.offsetTop
    startTime = new Date().getTime()
  }

  el.onclick = (e) => {
    console.log('点击container')
    if (endTime - startTime <= 100) {
      // let left = e.clientX - disX
      // let top = e.clientY - disY
      // let rightDis = document.body.clientWidth - left
      console.log('点击里面')
      // if (rightDis >= 120) {
      //   clickEl.click(rightDis)
      // }
    }
  }

  clickEl.addEventListener('click', (e) => {
    let left = e.clientX - disX
    let rightDis = document.body.clientWidth - left

    if (endTime - startTime <= 100) {
      if (rightDis >= 260) {
        direction = 1
        if (!children[0].classList.contains('in')) {
          children[0].style.left = '35px'
          children[0].style.opacity = '1'
          children[0].classList.add('in')
        } else {
          children[0].style.left = baseR
          children[0].style.opacity = '0'
          children[0].classList.remove('in')
        }

        if (!children[1].classList.contains('in')) {
          children[1].style.left = '150px'
          children[1].style.opacity = '1'
          children[1].classList.add('in')
        } else {
          children[1].style.left = baseR
          children[1].style.opacity = '0'
          children[1].classList.remove('in')
        }
      } else {
        direction = -1
        if (!children[0].classList.contains('in')) {
          children[0].style.left = '-115px'
          children[0].style.opacity = '1'
          children[0].classList.add('in')
        } else {
          children[0].style.left = baseL
          children[0].style.opacity = '0'
          children[0].classList.remove('in')
        }

        if (!children[1].classList.contains('in')) {
          children[1].style.left = '-230px'
          children[1].style.opacity = '1'
          children[1].classList.add('in')
        } else {
          children[1].style.left = '-60px'
          children[1].style.opacity = '0'
          children[1].classList.remove('in')
        }
      }
    }

    e.stopPropagation()

    // children[0].classList.add('fade-in-left')
  })

  document.onmousemove = (e) => {
    if (flag) {
      // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      let left = e.clientX - disX
      let top = e.clientY - disY

      // 设置按钮移动的边界
      if (top < 0) {
        top = 0
      } else if (top > document.body.clientHeight - el.offsetHeight) {
        top = document.body.clientHeight - el.offsetHeight
      }
      if (left < 0) {
        left = 0
      } else if (left > document.body.clientWidth - el.offsetWidth) {
        left = document.body.clientWidth - el.offsetWidth
      }
      // 移动当前元素
      el.style.left = left + 'px'
      el.style.top = top + 'px'
    }
  }

  document.onmouseup = () => {
    endTime = new Date().getTime()
    flag = false
    return false
  }
}

const addFeedbackBtn = () => {
  const feedbackContainer = document.createElement('div')
  feedbackContainer.classList.add('feedback-container')
  const feedbackBtn = document.createElement('button')
  feedbackBtn.type = 'button'
  feedbackBtn.classList.add('feedback-btn-base', 'feedback-btn')
  feedbackBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width=20 height=20 fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>
  `

  const anxietyBtn = document.createElement('button')
  anxietyBtn.type = 'button'
  anxietyBtn.textContent = '该网页使我焦虑'
  anxietyBtn.id = 'anxiety-btn'
  anxietyBtn.classList.add('feedback-btn-base', 'feedback-btn-option')
  anxietyBtn.addEventListener('click', (e) => {
    anxietyBtn.style.opacity = 0
    anxietyBtn.style.left = direction > 0 ? baseR : baseL
    depressionBtn.style.opacity = 0
    depressionBtn.style.left = direction > 0 ? baseR : baseL
    anxietyBtn.classList.remove('in')
    depressionBtn.classList.remove('in')
    e.stopPropagation()

    // content scripts 代码
    // chrome.runtime.sendMessage(
    //   {
    //     contentScriptQuery: 'fetchUrl',
    //     url: DATAURL,
    //     data: {
    //       data: {
    //         url: window.location.href,
    //         emotion: 'anxiety'
    //       }
    //     }
    //   },
    //   (response) => {
    //     console.log(response)
    //   }
    // )

    const port = chrome.runtime.connect({ name: 'fetch-connect' })
    port.postMessage({
      type: 'post-data',
      url: DATAURL,
      data: {
        data: {
          url: window.location.href,
          emotion: 'anxiety'
        }
      }
    })
    port.onMessage.addListener(function (msg) {
      if (msg.ok) {
        console.log('aa')
      }
    })
  })

  const depressionBtn = document.createElement('button')
  depressionBtn.type = 'button'
  depressionBtn.classList.add('feedback-btn-base', 'feedback-btn-option')
  depressionBtn.textContent = '该网页使我抑郁'
  depressionBtn.id = 'depression-btn'
  depressionBtn.addEventListener('click', (e) => {
    anxietyBtn.style.opacity = 0
    anxietyBtn.style.left = direction > 0 ? baseR : baseL
    depressionBtn.style.opacity = 0
    depressionBtn.style.left = direction > 0 ? baseR : baseL
    anxietyBtn.classList.remove('in')
    depressionBtn.classList.remove('in')
    e.stopPropagation()

    const port = chrome.runtime.connect({ name: 'fetch-connect' })
    port.postMessage({
      type: 'post-data',
      url: DATAURL,
      data: {
        data: {
          url: window.location.href,
          emotion: 'depression'
        }
      }
    })
    port.onMessage.addListener(function (msg) {
      if (msg.ok) {
        console.log('aa')
      }
    })
  })

  addDragEvent(feedbackContainer, feedbackBtn, [anxietyBtn, depressionBtn])

  feedbackContainer.appendChild(feedbackBtn)
  feedbackContainer.appendChild(anxietyBtn)
  feedbackContainer.appendChild(depressionBtn)
  document.body.insertAdjacentElement('afterbegin', feedbackContainer)
}

// let myPort = chrome.runtime.connect({ name: 'port-from-cs' })

// myPort.onMessage.addListener(function (m) {
//   const { type } = m
//   switch (type) {
//     case 'settings':
//       const {
//         settings: { allowFilter }
//       } = m
//       console.log(allowFilter)
//       break
//     default:
//       break
//   }
// })
