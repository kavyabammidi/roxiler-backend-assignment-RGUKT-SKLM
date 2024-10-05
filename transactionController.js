const Transaction = require('./transactionModel');
const axios = require('axios');

// Initialize database with seed data from third-party API
const initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        await Transaction.insertMany(transactions);
        res.status(200).send('Database initialized with seed data');
    } catch (error) {
        res.status(500).send('Error initializing database');
    }
};

// List transactions with search and pagination
const listTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '' } = req.query;

    const searchQuery = search
        ? { $or: [{ title: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }, { price: search }] }
        : {};

    try {
        const transactions = await Transaction.find(searchQuery)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));
        
        const totalRecords = await Transaction.countDocuments(searchQuery);
        
        res.status(200).json({
            transactions,
            totalPages: Math.ceil(totalRecords / perPage),
            currentPage: page
        });
    } catch (error) {
        res.status(500).send('Error fetching transactions');
    }
};

// Get monthly statistics
const getStatistics = async (req, res) => {
    const { month } = req.query;

    try {
        const startDate = new Date(2023, month - 1, 1);
        const endDate = new Date(2023, month, 0);

        const transactions = await Transaction.find({
            dateOfSale: { $gte: startDate, $lt: endDate }
        });

        const totalSaleAmount = transactions.reduce((total, item) => total + item.price, 0);
        const totalSoldItems = transactions.filter(item => item.sold).length;
        const totalNotSoldItems = transactions.filter(item => !item.sold).length;

        res.status(200).json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        res.status(500).send('Error fetching statistics');
    }
};

module.exports = {
    initializeDatabase,
    listTransactions,
    getStatistics
};
