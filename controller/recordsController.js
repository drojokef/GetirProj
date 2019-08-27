// Import records model
const Record = require('../model/recordsModel');

// Import moment for date checking
const moment = require('moment');


// Handle post request
exports.postRecords = function (req, res) {
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;

    let startDateControl = moment(startDate, 'YYYY-MM-DD', true).isValid();
    let endDateControl = moment(endDate, 'YYYY-MM-DD', true).isValid();

    if (!(startDateControl && endDateControl)) {
        res.json({
            status: "ERROR",
            code: 1,
            msg: "DATE FORMAT ERROR",
        });
    } else {
        let minCount = req.body.minCount;
        let maxCount = req.body.maxCount;
        Record.find({"counts": {$gt: minCount, $lt: maxCount}}, function (err, recordRes) {
            if (err) {
                res.json({
                    status: "ERROR",
                    code: 2,
                    msg: err.toString(),
                });
                return handleError(err);
            } else {
                let resData = [];
                recordRes.forEach(function (record) {

                    let totalSum = record.counts.reduce(function (total, num) {
                        return total + num;
                    });

                    var resPojo = new ResultPojo(record.key, record.createdAt, totalSum);
                    resData.push(resPojo);
                });
                res.json({
                    status: "Success",
                    code: 0,
                    msg: "Success",
                    records: resData
                });
            }
        }).sort({"createdAt": -1});
    }

};

// Create Pojo For Results
function ResultPojo(key, createdAt, totalCount) {
    this.key = key;
    this.createdAt = createdAt;
    this.totalCount = totalCount;
}


// Send message for default URL
exports.index = function (req, res) {
    res.send('Ceyhun Erturk')
};

// Send message for GET
exports.getRecords = function (req, res) {
    res.json({
        status: "ERROR",
        msg: "CANNOT USE GET METHOD FOR THIS API",
    });
};

// Send message for PUT
exports.putRecords = function (req, res) {
    res.json({
        status: "ERROR",
        msg: "CANNOT USE PUT METHOD FOR THIS API",
    });
};

// Send message for DELETE
exports.deleteRecords = function (req, res) {
    res.json({
        status: "ERROR",
        msg: "CANNOT USE DELETE METHOD FOR THIS API",
    });
};




