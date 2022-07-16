const { EventTypeModel } = require("../../../models");
const { errorResponse, errorInternalHandle, errorParams, successResponse } =  require("../../../helpers");
const status = require("http-status");
const objectId = require("mongodb").ObjectId;
const { validationResult } = require("express-validator");
const moment = require("moment");

let result = {};

module.exports = {
    createEventType: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return errorParams(req, res, errors.array());

            const createEventType = await EventTypeModel.create(req.body);
            const { name } = createEventType;

            result = {
                data: { name },
                message: "Event Type successfully created"
            }
            return successResponse(req, res, status.CREATED, result);
        } catch (error) {
            return errorInternalHandle(req, res, error);
        }
    },
    modifyEventType: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return errorParams(req, res, errors.array());

            const { eventTypeID } = req.params;
            const currentType = await EventTypeModel.findById(eventTypeID);
            
            if (!currentType) {
                result.status = status.BAD_REQUEST;
                result.message = `Event Type with id ${eventTypeID} not found!`;
                return errorResponse(req, res, result)
            }

            await EventTypeModel.updateOne({ _id: objectId(eventTypeID) }, { $set: req.body });

            result = { message: "Event Type successfully modified" };
            return successResponse(req, res, status.OK, result);
        } catch (error) {
            return errorInternalHandle(req, res, error);
        }
    },
    findAllEventType: async (req, res) => {
        try {
            let query = { is_deleted: false };
            let take = 10, skip = 0, total = 0

            if (req.query) {
                if (req.query.take) 
                    take = parseInt(req.query.take);
            
                if (req.query.skip) 
                    skip = parseInt(req.query.skip);

                if (req.query.name)
                    query.name = { $regex: req.query.name, $options: 'i' };

                if (req.query.fromCreatedDate && req.query.toCreatedDate) {
                    query.createdAt = { 
                        $gte: moment(req.query.fromCreatedDate, 'YYYY-MM-DD').startOf('day').toDate(),
                        $lte: moment(req.query.toCreatedDate, 'YYYY-MM-DD').endOf('day').toDate(),
                    }
                }
            }

            const eventTypes = await EventTypeModel.aggregate([
                { $match: query},
                {
                    $facet: {
                        data: [
                            { $skip: skip },
                            { $limit: take },
                            { $sort: { updatedAt: -1 } },
                            { $project: { '__v': 0 } }
                        ],
                        pages: [
                            { $count: "total" }
                        ]
                    }
                }
            ]);

            let result = eventTypes[0].data
            let pages = eventTypes[0].pages

            if (pages.length)
                total = pages[0].total

            result = {
                data: { total, take, skip, result },
                message: "Successfully show Event Types data"
            }

            return successResponse(req, res, status.OK, result);
        } catch (error) {
            return errorInternalHandle(req, res, error);
        }
    },
    deleteEventType: async (req, res) => {
        try {
            const { eventTypeID } = req.params;
            const currentEventType = await EventTypeModel.findById(eventTypeID);

            if (!currentEventType) {
                result.status = status.BAD_REQUEST;
                result.message = `Event Type with id: ${eventTypeID} not found!`;
                return errorResponse(req, res, result)
            }

            await EventTypeModel.updateOne({ _id: objectId(eventTypeID) }, { $set: { is_deleted: true } });

            result = {
                message: `Event Type successfully deleted`
            }

            return successResponse(req, res, status.OK, result);
        } catch (error) {
            return errorInternalHandle(req, res, error);
        }
    }
};