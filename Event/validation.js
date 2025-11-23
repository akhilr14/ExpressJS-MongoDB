const {check, body} =require('express-validator');

exports.validateEvent = [
    check("title").trim().not().isEmpty().isLength({ max: 250}).
    withMessage("Title required"),
    check("details").trim().not().isEmpty().isLength({ max: 1000}).
    withMessage("details required"),
    check("on").trim().not().isEmpty().
    withMessage("Date required").
    isISO8601().withMessage('On must be a valid date'),
    check("venue").optional().trim().isLength({ max: 100}).
    withMessage("details required"),
    check("registrationLink").optional().trim().isLength({ max: 250}).
    withMessage("details required"),
    body().custom((value, {req}) => {
        if(!req.body.venue && !req.body.registrationLink){
            throw new Error("Either venue or registrationlink is mandatory");
        }
        return true;
    })
]