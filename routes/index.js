var express = require('express'),
    router = express.Router();
router.get('/', function (req, res, next) {
    res.send({ message: 'This is Vortex version one' });
});
router.use('/header', require('./HomeHeaderRoutes'));
router.use('/home', require('./homeContentRoutes'));
router.use('/products', require('./ProductsRoute'));
router.use('/cart_details', require('./CartRoutes'));
router.use('/sub_content', require('./SubContentRoutes'));
router.use('/slot', require('./SlotBookingRoutes'));
router.use('/jobs', require('./NotificationJobsRoute'));
router.use('/section', require('./finalcontentRoutes'));
router.use('/doctor_availability', require('./AvailabilityRoutes'));
router.use('/doctor_unavailable', require('./UnAvailableRoutes'));
router.use('/clinic', require('./DoctorsListRoutes'));
router.use('/questionnaire', require('./QuestionnaireRoutes'));
router.use('/user_option', require('./UserQuestOption'));
router.use('/home_categories', require('./HomeCategoryRoutes'));
router.use('/categories', require('./CategoryRoutes'));
router.use('/sub_categories', require('./SubCategoryRoutes'));
// router.use('/sub_categories', require('./SubCategoryRoutes'));
// router.use('/sub_categories', require('./SubCategoryRoutes'));
router.use('/nomoreabout',require('./nomoreaboutRoutes'));


module.exports = router;
