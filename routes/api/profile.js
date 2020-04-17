const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const profile = require('../../models/Profile');
const user = require('../../models/User');
const university = require('../../models/University');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate({
      path: 'user',
      populate: {
        path: 'university',
      },
    });

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
