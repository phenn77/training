const createMemberService = require("../service/member/createMember");
const getMemberService = require("../service/member/getMember");

const message = require("../lib/message");

const createMember = async (req, res) => {
    let data;

    try {
        data = await createMemberService.create(req.body);
    } catch (e) {
        return message.error(res, e);
    }

    return message.success(res, data);
};

const getMember = async (req, res) => {
    let data;
    try {
        data = await getMemberService.get(req.params.memberId);
    } catch (e) {
        return message.error(res, e);
    }

    return message.success(res, data);
};

module.exports = {
    createMember,
    getMember,
};
