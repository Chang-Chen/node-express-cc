/**
 * Created by apple-w on 2017/7/28.
 */
var UserSQL = {
    //添加用户
    insert:'INSERT INTO user(userName,age,sex,work,phone,province,city,county) VALUES(?,?,?,?,?,?,?,?)',
    //查询全部用户
    queryAll:'SELECT * FROM user',
    //查询单个用户
    findUser:'SELECT * FROM user WHERE id = ?',
    //查询名字是否存在
    findUserName:'SELECT * FROM user WHERE userName = ?',
    //删除用户
    deleteByUserId:'DELETE FROM user WHERE id = ?',
    //更新用户信息
    updateUSer:'UPDATE user SET userName=?,age=?,sex=?,work=?,phone=?,province=?,city=?,county=? WHERE id = ? '
};
module.exports = UserSQL;
