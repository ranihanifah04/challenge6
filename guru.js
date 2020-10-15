const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./config") //import konfigurasi database

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// end-point akses data siswa
app.get("/guru", (req, res) => {
    // create sql query
    let sql = "select * from guru"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                guru: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point akses data siswa berdasarkan id_siswa tertentu
app.get("/guru/:id", (req, res) => {
    let data = {
        id_guru: req.params.id
    }
    // create sql query
    let sql = "select * from guru where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                guru: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data siswa
app.post("/guru", (req,res) => {

    // prepare data
    let data = {
        nip: req.body.nip,
        nama_guru: req.body.nama_guru,
        tanggal_lahir: req.body.tanggal_lahir,
        alamat: req.body.alamat,
    }

    // create sql query insert
    let sql = "insert into guru set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data siswa
app.put("/guru/:id", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            nip: req.body.nip,
            nama_guru: req.body.nama_guru,
            tanggal_lahir: req.body.tanggal_lahir,
            alamat: req.body.alamat,
        },

        // parameter (primary key)
        {
            id_guru: req.params.id
        }
    ]

    // create sql query update
    let sql = "update guru set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data siswa
app.delete("/guru/:id", (req,res) => {

    // prepare data
    let data = 
        // parameter (primary key)
        {
            id_guru: req.params.id
        }
    
    // create sql query delete
    let sql = "delete from guru where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data delete"
            }
        }
        res.json(response) // send response
    })
})


//membuat web server dengan port 8000
app.listen(8000, () => {
    console.log("server run on port 8000")
})