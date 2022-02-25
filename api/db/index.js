const mysql = require('mysql');
const pool = mysql.createConnection({
    host: '',
    user:'',
    password: '',
    database: 'ShoplerShopDB'
});

let chirprdb = {};

chirprdb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM shoplershopdb.productstable', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

chirprdb.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM shoplershopdb.productstable WHERE id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        })
    })
}

chirprdb.GetCategories = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM shoplershopdb.categorytable', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

chirprdb.GetUsers = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM shoplershopdb.userstable', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

chirprdb.GetUserUsername = (username) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM shoplershopdb.userstable WHERE username = ?', [username], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        })
    })
}

chirprdb.UserInsert = (user) => {
    return new Promise((resolve, reject) => {
        if (user.username != null && user.password != null) {
            const username = user.username;
            const password = user.password;
            console.table(user);
            pool.query('INSERT INTO `shoplershopdb`.`userstable` (`username`, `password`) VALUES (?, ?)', [username, password], (err, results) => {
                //;
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(results[0]);
            })
        } else {
            console.log("record is empty")
            reject("record is empty");
        }

    })
}





module.exports = chirprdb;

