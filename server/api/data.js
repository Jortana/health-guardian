const express = require('express')

const router = express.Router()

const gameController = require('../controller/data')

// 获取库中最后一次游戏时间
router.post('/emotion-data', gameController.setData)

module.exports = router
