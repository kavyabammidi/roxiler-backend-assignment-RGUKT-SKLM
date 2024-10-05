const express = require('express');
const { initializeDatabase, listTransactions, getStatistics } = require('./transactionController');
const router = express.Router();

router.get('/initialize', initializeDatabase);
router.get('/transactions', listTransactions);
router.get('/statistics', getStatistics);

module.exports = router;
