const express = require('express')

const router = express.Router()

// 数据相关 api
router.use('/data', require('./data'))

module.exports = router
