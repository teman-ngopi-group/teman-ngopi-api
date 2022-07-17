const { EventPicModel } = require("../../../models");
const { errorResponse, errorParams, successResponse } =  require("../../../helpers")
const status = require("http-status");
const objectId = require("mongodb").ObjectId;
const { validationResult } = require("express-validator");
const moment = require("moment");

let result = {};

module.exports = {
    createEventPic: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return errorParams(req, res, errors.array());

            const currentPic = await EventPicModel.findOne({ email: req.body.email, is_deleted: false });
            if (currentPic) {
                result.status = status.BAD_REQUEST;
                result.message = `PIC with email ${req.body.email} already registered!`;
                return errorResponse(req, res, result);
            }

            const createEventPic = await EventPicModel.create(req.body);
            const { full_name, email } = createEventPic;

            result = {
                data: { full_name, email },
                message: "Event PIC successfully created"
            }
            return successResponse(req, res, status.CREATED, result);
        } catch (error) {
            next(error);
        }
    },
    modifyEventPic: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return errorParams(req, res, errors.array());

            const currentPic = await EventPicModel.findById(req.params.eventPicID);
            if (!currentPic) {
                result.status = status.BAD_REQUEST;
                result.message = `PIC with id ${req.params.eventPicID} not found!`;
                return errorResponse(req, res, result);
            }

            await EventPicModel.updateOne({ _id: objectId(req.params.eventPicID) }, { $set: req.body });

            result = {
                message: "Event PIC successfully modified"
            }
            return successResponse(req, res, status.OK, result);
        } catch (error) {
            next(error);
        }
    },
    findAllEventPic: async (req, res, next) => {
        try {
            let query = { is_deleted: false };
            let take = 10, skip = 0, total = 0

            if (req.query) {
                if (req.query.take) 
                    take = parseInt(req.query.take);
            
                if (req.query.skip) 
                    skip = parseInt(req.query.skip);

                if (req.query.full_name)
                    query.full_name = { $regex: req.query.full_name, $options: 'i' };

                if (req.query.fromCreatedDate && req.query.toCreatedDate) {
                    query.createdAt = { 
                        $gte: moment(req.query.fromCreatedDate, 'YYYY-MM-DD').startOf('day').toDate(),
                        $lte: moment(req.query.toCreatedDate, 'YYYY-MM-DD').endOf('day').toDate(),
                    }
                }
            }

            const eventPics = await EventPicModel.aggregate([
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

            let result = eventPics[0].data
            let pages = eventPics[0].pages

            if (pages.length)
                total = pages[0].total

            result = {
                data: { total, take, skip, result },
                message: "Successfully show Event Pics data"
            }

            return successResponse(req, res, status.OK, result);
        } catch (error) {
            next(error);
        }
    },
    deleteEventPic: async (req, res, next) => {
        try {
            const { eventPicID } = req.params;
            const currentEventPic = await EventPicModel.findById(eventPicID);

            if (!currentEventPic) {
                result.status = status.BAD_REQUEST;
                result.message = `PIC with id: ${eventPicID} not found!`;
                return errorResponse(req, res, result)
            }

            await EventPicModel.updateOne({ _id: objectId(eventPicID) }, { $set: { is_deleted: true } });

            result = {
                message: `Event PIC successfully deleted`
            }

            return successResponse(req, res, status.OK, result);
        } catch (error) {
            next(error);
        }
    }
};