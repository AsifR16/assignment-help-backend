const Database = require("./Database")

class Orders {
    constructor() { }
    newOrder(title, desc, subject, type, deadline) {
        const db = new Database()
        let stmt = db.prepare("INSERT INTO TABLE orders(title,descrip,sub,typ,deadline) VALUES (?,?,?,?,?);");
        stmt.run([title, desc, subject, type, deadline], function (err) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Inserted row with ID: ${this.lastID}`)
                return this.lastID
            }
        });
        stmt.finalize();
    }
    newOrderFile(orderid,file_name,original_file_name){
        const db = new Database()
        let stmt = db.prepare("INSERT INTO TABLE orders_file(orderid,file_name,original_file_name) VALUES (?,?,?);");
        stmt.run([title, file_name,original_file_name], function (err) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Inserted row with ID: ${this.lastID}`)
                return this.lastID
            }
        });
        stmt.finalize();

        let stmt1 = db.prepare("INSERT INTO TABLE order_details(orderid,status) VALUES (?,?)");
        stmt1.run([orderid,0],function(err){
            if(err){
                console.error(err.message)
            }else{
                return orderid;
            }
        })
        stmt1.finalize();

        let stmt2 = db.prepare("INSERT INTO TABLE order_value(orderid) VALUES (?)");
        stmt2.run([orderid],function(err){
            if(err){
                console.error(err.message)
            }else{
                return orderid;
            }
        })
        stmt2.finalize();
    }
    getAllOrders(){
        const db = new Database()
        db.all("SELECT * from orders;",(err,rows)=>{
            if(err){
                console.error(err.message)
                return -1
            }else{
                return rows
            }
        })

    }

    getAllOrdersFile(){
        const db = new Database()
        db.all("SELECT * from orders_file;",(err,rows)=>{
            if(err){
                console.error(err.message)
                return -1
            }else{
                return rows
            }
        })

    }

    UpdateTeacherByOrderID(orderid,teacher_id){
        const db = new Database()
        db.exec(`UPDATE order_details SET teacher_id=${teacher_id} WHERE orderid=${orderid}`,(err)=>{
            if (err) {
                console.error(err.message);
                return -1
            } else {
                return teacher_id
            }
        })
    }
    UpdateStatusByOrderID(orderid,status){
        const db = new Database()
        db.exec(`UPDATE order_details SET status=${status} WHERE orderid=${orderid}`,(err)=>{
            if (err) {
                console.error(err.message);
                return -1
            } else {
                return orderid
            }
        })
        
    }
    UpdateValueByOrderID(orderid,value){
        const db = new Database()
        db.exec(`UPDATE orders_value SET value=${value} WHERE orderid=${orderid}`,(err)=>{
            if (err) {
                console.error(err.message);
                return -1
            } else {
                return orderid
            }
        })
    }
    getAllOrdersByTeacherID(teacher_id){
        const db = new Database()
        db.all(`SELECT * FROM orders_details WHERE teacher_id=${teacher_id}`,(err,rows)=>{
            if(err){
                console.error(err.message)
                return -1
            }else{
                return rows
            }
        })
    }
    getOrderByID(orderid){
        const db = new Database()
        db.all(`SELECT * FROM orders WHERE orderid=${orderid}`,(err,rows)=>{
            if(err){
                console.error(err.message)
                return -1
            }else{
                return rows
            }
        })
    }

    getOrderDetailsByID(orderid){
        const db = new Database()
        db.all(`SELECT * FROM order_details WHERE orderid=${orderid}`,(err,rows)=>{
            if(err){
                console.error(err.message)
                return -1
            }else{
                return rows
            }
        })
    }

    getOrderValueByID(orderid){
        const db = new Database()
        db.all(`SELECT * FROM orders_value WHERE orderid=${orderid}`,(err,rows)=>{
            if(err){
                console.error(err.message)
                return -1
            }else{
                return rows
            }
        })
    }

    getOrderFileByID(orderid){
        const db = new Database()
        db.all(`SELECT * FROM orders_file WHERE orderid=${orderid}`,(err,rows)=>{
            if(err){
                console.error(err.message)
                return -1
            }else{
                return rows
            }
        })
    }

    getAllOrdersByUserID(userid){
        const db = new Database()
        db.all(`SELECT * FROM user_orders WHERE userid=${userid}`,(err,rows)=>{
            if(err){
                console.error(err.message)
                return -1
            }else{
                return rows
            }
        })
    }

    addOrderToUser(orderid,userid){
        const db = new Database()
        let stmt = db.prepare("INSERT INTO TABLE user_orders(userid,orderid) VALUES (?,?);");
        stmt.run([userid,orderid], function (err) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Inserted row with ID: ${this.lastID}`)
                return this.lastID
            }
        });
        stmt.finalize();
    }
}