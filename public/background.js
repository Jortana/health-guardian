function getMentalStatus() {
  let mentalStatus
  chrome.storage.sync.get('mentalStatus', (res) => {
    mentalStatus = res.mentalStatus
    console.log('mentalStatus', mentalStatus)
  })
  return mentalStatus
}

// function setMentalStatus(newStatus) {
//   const status = getMentalStatus() || {}
//   for (let key in newStatus) {
//     status[key] = newStatus[key]
//   }
//   // console.log(status)
//   chrome.storage.sync.set({ mentalStatus: status }, () => {
//     console.log('set successed!')
//   })
// }

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

// 发送请求
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

// background service worker 代码
// chrome.runtime.onMessage.addListener(async function (
//   request,
//   sender,
//   sendResponse
// ) {
//   if (request.contentScriptQuery == 'fetchUrl') {
//     const { url, data } = request
//     const response = await fetch(url, {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     })
//     console.log(response)
//     return true
//   }
// })

// function getSettings() {
//   return new Promise((resolve, reject) => {
//     chrome.storage.sync.get('settings', (res) => {
//       if (chrome.runtime.lastError) {
//         return reject(chrome.runtime.lastError)
//       }
//       resolve(res)
//     })
//   })
// }

// let portFromCS
// function connected(p) {
//   portFromCS = p
//   getSettings().then((res) => {
//     const { settings } = res
//     portFromCS.postMessage({ type: 'settings', settings })
//   })
// }

// 监听 fetch 的长链接
chrome.runtime.onConnect.addListener(async function (port) {
  console.log(port)
  if (port.name == 'fetch-connect') {
    await port.onMessage.addListener(async function (msg) {
      const { type, url, data } = msg
      if (type === 'post-data') {
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        port.postMessage({ ok: response.ok })
      }
    })
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
