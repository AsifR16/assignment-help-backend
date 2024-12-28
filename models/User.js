const Database = require("./Database")

class User{
    contructor(){}
    newUser(name,email,password){
        const db = new Database()
        let stmt = db.prepare("INSERT INTO TABLE users(name,email,password) VALUES (?,?,?);");
        stmt.run([name,email,password], function (err) {
            if (err) {
                console.error(err.message);
                return -1
            } else {
                console.log(`Inserted row with ID: ${this.lastID}`)
                return this.lastID
            }
        });
        stmt.finalize();
        db.close()
    }
    UpdateContactByUserID(contact,userid){
        const db = new Database()
        db.exec(`UPDATE users SET contact=${contact} WHERE id=${userid}`,(err)=>{
            if (err) {
                console.error(err.message);
                return -1
            } else {
                return userid
            }
        })
        db.close()
    }
    UpdatePasswordByUserID(password,userid){
        const db = new Database()
        db.exec(`UPDATE users SET password=${password} WHERE id=${userid}`,(err)=>{
            if (err) {
                console.error(err.message);
                return -1
            } else {
                return userid
            }
        })
        db.close()
    }
}