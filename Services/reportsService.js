const pool = require("../Config/dbconfig")
const connect = require("../Config/dbconfig")
const checkTable = async () => {
    await connect.query(`Create Table if not exists reports(
        id INT primary key,
        user_id int not null,
        attendant_id int not null,
        test_id int not null,
        foreign key user_id refrences user(id),
        foreign key attendant_id refrences attendant(id),
        foreign key test_id refrences test(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);`);
}
const createReports = async(req,res) => {
    await checkTable();
    pool.query(`Insert into reports(user_id,attendant_id,test_id) values(?,?,?)`,[req.user_id, req.attendant_id, req.test_id],
    (error,results)=> {
        if(error){
            return res.json({code: 500, data:[]})
        }
        return res.json({code: 200, data:results})
    })
}
const updateReports = async(req,res) => {
    await checkTable();
    pool.query(`Update reports set user_id = ?, attendant_id = ?, test_id where id=?`,[req.user_id,req.attendant_id, req.test_id, req.report_id],
    (error,results)=> {
        if(error){
            return res.json({code: 500, data:[]})
        }
        return res.json({code: 200, data:results})
    })
}
const deleteReports = async(req,res) => {
    await checkTable();
    pool.query(`Delete from reports where id = ?`,[req.report_id],
    (error,results)=> {
        if(error){
            return res.json({code: 500, data:[]})
        }
        return res.json({code: 200, data:results})
    })
}
const reviewReports = async(req,res) => {
    await checkTable();
    pool.query(`Select * from reports where id=?`,[req.report_id],
    (error,results)=> {
        if(error){
            return res.json({code: 500, data:[]})
        }
        return res.json({code: 200, data:results})
    })
}

module.exports = {
    createReports,
    updateReports,
    reviewReports,
    deleteReports
}