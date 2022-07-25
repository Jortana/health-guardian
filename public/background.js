function getMentalStatus() {
  let mentalStatus
  chrome.storage.sync.get('mentalStatus', (res) => {
    mentalStatus = res.mentalStatus
    console.log('mentalStatus', mentalStatus)
  })
  return mentalStatus
}

function setMentalStatus(newStatus) {
  const status = getMentalStatus() || {}
  for (let key in newStatus) {
    status[key] = newStatus[key]
  }
  // console.log(status)
  chrome.storage.sync.set({ mentalStatus: status }, () => {
    console.log('set successed!')
  })
}

// 第一次安装时初始化数据
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(
    {
      mentalStatus: {
        anxiety: { score: 0, total: 80, level: 0, label: '焦虑' },
        depression: { score: 0, total: 80, level: 0, label: '抑郁' },
        OCD: { score: 0, total: 80, level: 0, label: '强迫' }
      },
      cardInfo: {
        name: '',
        emergency: '',
        situations: [{ location: '', address: '', phone: '' }]
      }
    },
    () => {
      console.log('set successed!')
    }
  )
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type } = message
  console.log(type)
  switch (type) {
    case 'getMentalStatus':
      const status = getMentalStatus()
      sendResponse(status)
      break
    case 'setMentalStatus':
      const { data } = message
      setMentalStatus(data)
      break
    default:
      break
  }
})

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    )
  }
})
