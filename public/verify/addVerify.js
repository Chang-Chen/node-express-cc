/**
 * Created by apple-w on 2017/8/2.
 */

var addVerify = {
    addUser: function (params,callback) {
        var result = {"status":200,"msg":'参数错误'};
        if(params.userName === "" || params.userName === "undefined" || params.userName === null){
            result = {"status":-200,"msg":'用户名不能为空'};
        }else if(params.sex === "" || params.sex === "undefined" || params.sex === null){
            result = {"status":-200,"msg":'性别不能为空'};
        }else if(params.age === '' || params.age === 'undefined' || params.age === null){
            result = {"status":-200,"msg":'年龄不能为空'};
        }else if(params.phone === '' || params.phone === 'undefined' || params.phone === null){
            result = {"status":-200,"msg":'手机号码不能为空'};
        }
        if(typeof callback === 'function'){
            callback(result);
        }
    }
};
module.exports = addVerify;