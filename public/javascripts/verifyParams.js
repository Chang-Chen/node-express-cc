/**
 * Created by apple-w on 2017/8/2.
 */
var parameter = {};
var verifyParams = {
    varifyGet: function (req) {
        if (req.query) {
            for (var i in req.query) {
                parameter[i] = req.query[i];
            }
        }
        return parameter;
    },
    verifyPost:function (req) {
        if (req.body) {
            for (var j in req.body) {
                parameter[j] = req.body[j];
            }
        }
        return parameter;
    },
    verifyParams:function (req) {
        if (req.params) {
            for (var p in req.params) {
                parameter[p] = req.params[p];
            }
        }
        return parameter;
    }
};
module.exports = verifyParams;