const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Review = require('../../models/Review');
const User = require('../../models/User');
const University = require('../../models/University');

// @route    POST api/reviews
// @desc     Save user's review
// @access   Public
router.post('/', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id, '_id university');

    // Check if user already has a saved review.
    // find() returns array as opposed to findOne which returns a string, hence .length check
    // const reviewStatus = await Review.find({ user_id: user.id });

    // if (reviewStatus.length) {
    //   return res
    //     .status(400)
    //     .json({ errors: [{ msg: 'You have already submitted a review' }] });
    // }

    const review = new Review({
      university: user.university,
      user_id: user.id,
      scores: [
        {
          internet: req.body.scores.internet,
          happiness: req.body.scores.happiness,
          nightlife: req.body.scores.nightlife,
        },
      ],
    });

    await review.save();
    res.json({ review });

    //After review is submitted update university with average scores
  } catch (err) {
    //Error will be server issue if caught
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/reviews
// @desc     Temp. route to test data aggregation + merging 
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id, '_id university');

    //Aggregate reviews, calculating average and replacing previous averages in the relative university document
    const averageScores = await Review.aggregate([
      { $match: { university: user.university } },
      { $unwind: '$scores' },
      {
        $group: {
          _id: '$university',
          internet: { $avg: '$scores.internet' },
          happiness: { $avg: '$scores.happiness' },
          nightlife: { $avg: '$scores.nightlife' },
        },
      },
      { $set: { lastUpdated: '$$NOW' } },
      {
        $project: {
          scores: [{
            internet: '$internet',
            happiness: '$happiness',
            nightlife: '$nightlife',
            total: { $avg: ['$internet', '$happiness', '$nightlife'] },
          }],
          lastUpdated: true,
        }
      },
      {
        $merge: {
          into: 'universities',
          on: '_id',
          whenMatched: 'merge',
          whenNotMatched: 'insert',
        },
      },
    ]);


    res.json({ msg: 'Review submitted' });

    //Save average scores in relevant university document
    //  University.findOneAndUpdate(
    //    { "university_id": university_id },
    //    { $average }
    //  )
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
