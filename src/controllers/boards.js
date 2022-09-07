const crypto = require('crypto');
const { userInfo } = require('os');
const { Boards } = require('../models');

const salt = 32423;

const write = async(req, res) => {
    const { name, password, content, star } = req.body;
    const boardNumber = req.query.bn;

    const hashPassWord = crypto
        .createHash('sha256')
        .update(password + salt)
        .digest('hex');
    try{
        await Boards.create({
            name,
            password: hashPassWord,
            content,
            boardNumber,
            star
        });
        res.status(200).json({
            message: "작성 성공"
        });
    } catch(err){
        res.status(400).json({
            message: "작성 실패"
        });
    };
};

const update = async(req, res) =>{
    const{ password, content, star} = req.body;
    const boardNumber = req.query.bn;
    const id = req.query.id;

    const hashPassWord = crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');
    
    try{
        const user = await Boards.findOne({
            where: {
              id,
              boardNumber,
            },
        });

        if(user.password == hashPassWord){
            await Boards.update({
                content,
                star
            },{
                where: {
                    id,
                    boardNumber,
                }
            });
            res.status(200).json({
                message: "수정 성공"
            });
        } else{
            res.status(403).json({
                message: "수정 실패"
            });
        };
    } catch(err){
        console.error(err);
        res.status(400).json({
            message: "수정 실패"
        });
    };
};

const deletecontent = async(req, res) => {
    const { password } = req.body;
    const id = req.query.id;
    const boardNumber = req.query.bn;

    const hashPassWord = crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');

    try{
        const user = await Boards.findOne({
            where:{
                id,
                boardNumber
            }
        });

        if(user.password == hashPassWord){
            await Boards.destroy({
                where:{
                    id,
                    boardNumber
                }
            });
            res.status(200).json({
                message: "삭제 성공"
            });
        } else{
            res.status(404).josn({
                message: "삭제 실패"
            });
        }
    }catch(err){
        console.error(err);
        res.status(404).json({
            message: "삭제 실패"
        });
    };
};


const readOneBoard = async(req,res) =>{
    const boardNumber = req.query.bn;
    try{
        const board = await Boards.findAll({
            where:{
                boardNumber
            }
        });

        res.status(200).json({
            board
        });
    } catch(err){
        res.status(404).json({
            message : "게시물 없음"
        });
        console.log(err);
    }
};

module.exports = {
    write,
    update,
    deletecontent,
    readOneBoard,
};