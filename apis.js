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

    async checkNickname(req,res) {
        const result = await DBManager.User.findOne({
            where: {
                nickname : req.body.nickname
            }
        })
        if(result){
            return res.json({
                success : false,
                message: "이미 존재하는 닉네임입니다."
            })
        }
        return res.json({
            success: true,
            meessage: "사용해도 좋은 닉네임입니다."
        })
    },

    async userRegister(req,res) {
        if(req.session.user){
            return res.json({
                message: "이미 로그인 되어있습니다."
            })
        }
        await DBManager.User.create({
            id : req.body.id,
            nickname : req.body.nickname,
            isStudent : req.body.isStudent,
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
            where:{
                id : req.body.id,
                password : req.body.password
            }
        })
        if(result){ //회원 정보 일치
            req.session.user = {
                id : result.id,
                nickname : result.nickname,
                password : result.password,
                isStudent : result.isStudent,
                name : result.name,
                birthday : result.birthday,
                univ : result.univ,
                major : result.major,
            }
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
    
    async userLogout(req,res) {
        if(req.session.user){
            await req.session.destroy(function (err) {
                if (err)
                    console.log(err)
                else {
                  return res.json({
                    success: true,
                    message: "로그아웃 완료."
                  })
                }
            })
        }
    },

    async listBoard(req,res) {
        const result = await DBManager.Board.findAll({
            include:[
                {
                    model: DBManager.User,
                    as: 'writer',
                    attributes: ['nickname'],
                }
            ]
        });
        return res.json(result);
    },

    async postBoard(req,res) {
        if(!req.session.user){
            return res.json({
                success : false,
                message: "로그인을 먼저 해주세요."
            })
        }
        await DBManager.Board.create({
            title : req.body.title,
            type : req.body.type,
            content : req.body.content,
            user_id : req.session.user.id
        })
        return res.json({
            success : true,
            message: "게시글이 성공적으로 등록되었습니다."
        })
    },

    async getBoard(req,res) {
        const result = await DBManager.Board.findOne({
            where:{
                id : req.params.id
            },
            include:[
                {
                    model: DBManager.User,
                    as: 'writer',
                    attributes: ['nickname']
                }
            ]
        })
        if(result){
            return res.json({
                success : true,
                data: result
            })
        }
        return res.json({
            success : false,
            message : "해당 id를 가진 게시글이 존재하지 않습니다."
        })
    },

    async checkLogin(req,res) {
        const user = req.session.user;
        if(user){
            return res.json({
                success: true,
                user : user
            })
        }
        return res.json({
            success: false,
            message: "현재 로그인하지 않았습니다."
        })
    },

}

module.exports = apis;