const { Emotion } = require('../models')
const { successRes } = require('../utils/resBuilder')

/**
 * 添加网页对情绪影响的记录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.setData = async (req, res, next) => {
  try {
    console.log(req.body)
    const { data } = req.body
    console.log(data)
    const emotionData = new Emotion(data)
    await emotionData.save()
    res.status(200).json(successRes({ message: '反馈成功' }))
  } catch (err) {
    next(err)
  }
}
