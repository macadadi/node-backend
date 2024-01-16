var express = require('express');
var router = express.Router();



const User = require('../model/User')

router.post('/', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(201).json({
      status: 'Success',
      data: {
        user
      }
    })
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err
    })
  }
})


router.get('/', async (req, res) => {
  const user = await User.find({})
  try {
    res.status(200).json({
      status: 'Success',
      user
    })
  } catch (err) {
    console.log(err, 'currrent error')
    res.status(500).json({
      status: 'Failed',
      message: err
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'Failed',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'Success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message
    });
  }
});


router.patch('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  try {
    res.status(200).json({
      status: 'Success',
      data: {
        user
      }
    })
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)

  try {
    res.status(204).json({
      status: 'Success',
      data: {}
    })
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err
    })
  }
})


module.exports = router;
