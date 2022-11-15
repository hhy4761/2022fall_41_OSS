const DBManager = require("./models");

const apis = {
    async checkIdOverlap(req,res){
        let result = await DBManager.User.findOne({
            where: {
                id : req.body.id
            }
        })
        if(result){
            return res.json({
                success: false,
                message: "이미 존재하는 ID입니다."
            })
        }
        else{
            return res.json({
                success: true,
                message: "사용해도 좋은 ID입니다."
            })
        }
    },

    async userRegister(req,res) {
        await DBManager.User.create({
            id : req.body.id,
            nickname : req.body.nickname,
            password : req.body.password,
            name : req.body.name,
            birthday : req.body.birthday,
            univ : req.body.univ,
            major : req.body.major,
        })
        return res.json({
            message: "회원가입 완료."
        })
    },
    
    async userLogin(req,res) {
        const result = await DBManager.User.findOne({
            id : req.body.id,
            password : req.body.password
        })
        if(result){ //회원 정보 일치
            return res.json({
                success: true,
                message: "로그인 성공."
            })
        }
        else{ // 회원 정보 불일치
            return res.json({
                success: false,
                message: "일치하는 회원정보가 없습니다."
            })
        }
    },
    
}

module.exports = apis;