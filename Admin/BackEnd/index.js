const port=4000;
const express=require("express");
const app= express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors=require("cors");

app.use(express.json());
app.use(cors());

// database connection with mgodb
mongoose.connect("mongodb+srv://theanh090104:theanh09@shopping.n050f.mongodb.net/Shopping");
//API createtion
app.get("/",(req,res)=>{
    res.send("Express App is running");
})
// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload =multer({storage:storage})
//creating upload endpoint for upload images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:String,
        required:true,
    },
    old_price:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})
// api them product
app.post('/addproduct',async(req,res)=>{
    let products= await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})
//api xoa product
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed item "+req.body.id);
    res.json({
        success:true,
        name:req.body.name
    })
})
// api xem tat ca product
app.get('/allproducts',async (req,res)=>{
    let products =await Product.find({});
    console.log("ALL products fetched");
    res.send(products);
})
app.listen(port,(error)=>{
    if(!error){
        console.log("server running on "+ port);
    }
    else{
        console.log("Error: "+error);
    }
})
