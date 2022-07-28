// chrome.runtime.sendMessage({ method: 'getSettings' }, function (response) {
//   console.log('aaa')
//   console.log(response)
// })

chrome.storage.sync.get('settings', (res) => {
  const {
    settings: { allowFilter }
  } = res
  if (allowFilter) {
    addFeedbackBtn()
  }
})

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
  anxietyBtn.classList.add('feedback-btn-base', 'feedback-btn-option')
  const depresstionBtn = document.createElement('button')
  depresstionBtn.type = 'button'
  depresstionBtn.classList.add('feedback-btn-base', 'feedback-btn-option')
  feedbackContainer.appendChild(feedbackBtn, anxietyBtn, depresstionBtn)
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
