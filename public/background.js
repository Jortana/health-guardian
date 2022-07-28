// function getMentalStatus() {
//   let mentalStatus
//   chrome.storage.sync.get('mentalStatus', (res) => {
//     mentalStatus = res.mentalStatus
//     console.log('mentalStatus', mentalStatus)
//   })
//   return mentalStatus
// }

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
  chrome.storage.sync.get('mentalStatus', (res) => {
    console.log('res', res)
    const { mentalStatus } = res
    if (!mentalStatus) {
      chrome.storage.sync.set({
        mentalStatus: {
          anxiety: {
            score: 0,
            total: 80,
            level: -1,
            label: '焦虑',
            url: '/anxiety'
          },
          depression: {
            score: 0,
            total: 80,
            level: -1,
            label: '抑郁',
            url: '/depression'
          },
          OCD: {
            score: 0,
            scoreArr: [0, 0],
            level: -1,
            label: '强迫',
            url: '/ocd'
          }
        }
      })
    }
  })

  chrome.storage.sync.get('cardInfo', (res) => {
    console.log('res', res)
    const { cardInfo } = res
    if (!cardInfo) {
      chrome.storage.sync.set({
        cardInfo: {
          name: '',
          emergency: '',
          situations: [{ location: '', address: '', phone: '' }],
          set: false
        }
      })
    }
  })

  chrome.storage.sync.get('settings', (res) => {
    console.log('res', res)
    const { settings } = res
    if (!settings) {
      chrome.storage.sync.set({
        settings: {
          allowFilter: true
        }
      })
    }
  })
})

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    )
  }
})
