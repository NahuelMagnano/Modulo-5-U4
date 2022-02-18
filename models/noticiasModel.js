var pool = require('./bd');


async function getNoticias(){
    var query = 'select * from noticias order by id desc';
    var rows = await pool.query(query);
    return rows
}

async function insertNoticia(obj) {
    try {
        var query = 'insert into noticias set ? ';
        var rows = await pool.query(query, [obj]);
        return rows;
        
    } catch (error) {
        console.log(error);
        throw error
    }
}


module.exports = {getNoticias, insertNoticia}