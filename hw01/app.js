/*1. ทำระบบแบ่งหน้า (pagination) โดยใช้ method : GET
	/products?_page=2&_limit=5
	หมายถึง แบ่งข้อมูลเป็น page ละ 5 item โดยแสดง page ที่ 2 (ส่งข้อมูลหน้าที่ 2 ออกมา)
	ถ้าไม่ระบุ limit จะเป็น 10 (default)
	ถ้าไม่ระบุ page จะมีค่าเป็น 1 (default)
2. ทำ service delete ตัวสินค้าจาก id ที่ต้องการ (ใช้ method : DELETE)
	/product/3
	หมายถึง ให้ลบสินค้าที่มี id = 3 โดยลบข้อมูลนี้ออกจากไฟล์ products.json แล้วนำข้อมูลทีลบไปเก็บรวมที่ไฟล์ deleted.json 
3. ทำ service ค้นหาสินค้าจากช่วงราคา ( ใช้ method : GET) 
	** ให้ออกแบบวิธีเรียก api เอง (จะใช้ path ชื่อใด? และใช้ params หรือ query แบบใด?)*/

const express = require("express");
const fs = require("fs/promises");
const path = require("path");
require("dotenv").config();
const app = express();

function dividePages(productsList, limit) {
  let productsAllPages = [];
  let productPage = [];
  for (let item of productsList) {
    if (productPage.length < limit) {
      productPage.push(item);
    } else {
      productsAllPages.push(productPage);
      productPage = [];
      productPage.push(item);
    }
  }
  return productsAllPages;
}

// read product.json file
const productsFilePath = path.resolve("products.json");
// console.log(productsFilePath);
const getProduct = () => fs.readFile(productsFilePath, "utf-8");

app.get("/products", (req, res) => {
  const { _page: page = 1, _limit: limit = 10 } = req.query;
  console.log("page: ", page, " limit: ", limit);
  getProduct().then((data) => {
    let productsList = JSON.parse(data);
    let productsAllPages = dividePages(productsList, limit);
    res.send(productsAllPages[page - 1]);
  });
});

app.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  getProduct().then((data) => {
    let productsList = JSON.parse(data);
    let deleteIndex = productsList.findIndex((item) => item.id === +id);
    console.log("deleteIndex:", deleteIndex);
    if (deleteIndex === -1) {
      res.json({ msg: "Not found item" });
      return;
    }
    let deletedItem = productsList.splice(deleteIndex, 1);
    console.log("deleted item:", deletedItem);

    const deleteItemFn = async () => {
      try {
        let deletedList = await fs.readFile("./deleted.json", "utf-8");
        console.log(`delelteFile :${deletedList}`);
        if (deletedList) {
          console.log("deletedList:", deletedList);
          fs.writeFile(
            "./deleted.json",
            JSON.stringify(JSON.parse(deletedList).push(...deletedItem))
          )
            .then(() => {
              console.log("delete true");
              res.send(deletedItem);
            })
            .catch((err) => console.log(err.message));
        } else {
          fs.writeFile("./deleted.json", JSON.stringify(deletedItem))
            .then(() => {
              console.log("write deleted.json done");
              res.send(deletedItem);
            })
            .catch((err) => console.log(err.message));
        }
      } catch (err) {
        console.log(err.message);
      }
      // console.log(JSON.parse(deletedList));
    };
    deleteItemFn();

    fs.writeFile(productsFilePath, JSON.stringify(productsList))
      .then(() => console.log("rewrite product.json done"))
      .catch((err) => console.log(err.message));
    return deletedItem;
  });
});

// Search item from price range from {from} to {to} by use /search?from=10&to=20
app.get("/search", (req, res) => {
  let { from, to } = req.query;
  fs.readFile("./products.json", "utf-8").then((data) => {
    let foundItemsList = JSON.parse(data).filter((item) => item.price >= from && item.price < to);
    console.log(foundItemsList);
    res.send(foundItemsList);
  });
});

app.use((req, res) => {
  res.status(404).json({ msg: "path not found" });
});

const port = process.env.PORT || 8080;
console.log(port);
app.listen(port, () => {
  console.log("Server run on ", port);
  console.log("-------------------------------------------------------");
});

// require('dotenv').config()
// const {readFile, writeFile} = require('fs/promises')
// const express = require('express')
// const app = express()

// // const getProducts = () => readFile("./products.json", "utf8").then(data => JSON.parse(data))
// const getProducts = () => readFile("./products.json", "utf8").then(JSON.parse)
// const saveFile = (file, data) => writeFile(file, JSON.stringify(data, null, 2))

// app.get('/products', (req,res) => {
//     const {_page = 1, _limit = 10} = req.query
//     getProducts().then(all => {
//         let start = (_page-1) * _limit
//         let end = start + +_limit
//         let scope_items = all.slice(start, end)
//         console.log(scope_items)
//         return scope_items
//     }).then( output => res.json(output))
// })

// app.delete('/product/:id', (req, res) => {
//     const {id} = req.params
//     getProducts().then(all => {
//         let del_idx = all.findIndex( el => el.id === +id)
//         if(del_idx === -1)
//             return {}
//         let [del_item] = all.splice(del_idx, 1)
//         // saveToDeleted
//         return {all, del_item}
//     }).then( ({all, del_item}) => {
//         if(del_item)
//             saveFile('./products.json', all)
//         return { msg: `${del_item?.id || 'nothing'} have deleted `}
//     }).then( msg => res.json(msg))
// })

// app.use((req, res)=> {
//     res.status(404).json({msg : "path not found"})
// })

// let port = process.env.PORT || 8080
// app.listen(port, ()=> console.log('Server on',port))
