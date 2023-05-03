const Tour = require('./../models/tourModel');

// 2) ROUTE HANDLERS (Makes code looks more declarative)
// TOUR HANDLERS

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    console.log(req.query);
    // Filtering
    let queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    // ADVANCED FILTERING
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );
    queryObj = JSON.parse(queryStr);

    // { difficulty: 'easy', duration: { $gte: '5' } }
    // { difficulty: 'easy', duration: { gte: '5' } }

    // Sorting
    // const

    const query = Tour.find(queryObj);

    // EXECUTE QUERY
    const tours = await query;

    // const query =  Tour.find()
    //   .where('difficulty')
    //   .equals('easy')
    //   .where('duration')
    //   .equals(5);

    // SEND RESPONSE

    res.status(200).json({
      status: 'Success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // const tour = await Tour.findOne({ _id: req.params.id });

    res.status(200).json({
      status: 'Success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      statuc: 'failed',
      message: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'Success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'Success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    });
  }
};
