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
    const { data } = req.body
    const emotionData = new Emotion(data)
    await emotionData.save()
    res.status(200).json(successRes({ message: '反馈成功' }))
  } catch (err) {
    next(err)
  }
}
