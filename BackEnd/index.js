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
//schema for user
const Users=mongoose.model("Users",{
    name:{
        type:String,
    },
    password:{
        type:String,
    },
    email:{
        type:String,
        unique: true,
    },
    cardData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
// endpoint for register
app.post('/signup',async (req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({
            success:false,
            message:"Email already exists",
        })
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user=new Users({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
        cardData:cart,
    })

    await user.save();
    const data={
        user:{
            id:user.id,
        }
    }
    const token=jwt.sign(data,"secret_ecom");
    res.json({success:true,token})
})
// endpoint for login
app.post('/login',async (req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
        const passCompare=req.body.password===user.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id,
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({
                success:true,
                token:token,
            })
        }
        else{
            res.json({
                success:false,
                errors:"Wrong password",
            })
        }
    }
    else{
        res.json({
            success:false,
            errors:"Wrong email id",
        })
    }
})
//createing endpoint for new collection data
app.get('/newcollections',async (req,res)=>{
    let products= await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("new collection fetched");
    res.send(newcollection);
})

//createing endpoint for popular in women section
app.get('/popularinwomen',async (req,res)=>{
    let products= await Product.find({category:"women"});
    let popular_in_women=products.slice(0,4);
    console.log("popular in women collection fetched");
    res.send(popular_in_women);
})

//createing middleware to fetch user 
const fetchUser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token1"});
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        } catch(error){
            res.status(401).send({errors:"Please authenticate using a valid token2"});
        }
    }
}
app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userData=await Users.findOne({_id:req.user.id});
    userData.cardData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cardData:userData.cardData});
    res.send("Added to cart");
})
// create endpoint for remove cartdata
app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("removed",req.body.itemId);
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.cardData[req.body.itemId]>0){
        userData.cardData[req.body.itemId]-=1;
    }
    //userData.cardData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cardData:userData.cardData});
    res.send("Removed");
})
//creating endpoint for get cart data
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("get cart data");
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cardData);
})
app.listen(port,(error)=>{
    if(!error){
        console.log("server running on "+ port);
    }
    else{
        console.log("Error: "+error);
    }
})
