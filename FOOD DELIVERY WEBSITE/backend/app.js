const express = require ('express');
const Registeruser = require("./schema/userschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const stripe = require('stripe')('sk_test_51N05btSDWf3oqPOsPza0OlLeorRhtVRw7GrMfskhp01Dcdo8jXj925ErxG54FH45mxXkSAyUv0OcHOrERkp6uEFO00KBXF38Ki')
 require("./connect");
 const newOrder = require("./schema/modal");

const app =express();
const jwtSecret = "mynmaeisshivamkumariminiiitmanipur"
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(

    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();

})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    express.urlencoded({
      extended: true
    })
)

app.get('/',(req,res)=>{
    res.send("hello");
})
app.post("/newuser",async(req,res)=>{
    const secpass = await bcrypt.hash(req.body.password,15);
    const user = new Registeruser({
        name:req.body.name,
        email:req.body.email,
        
        adress:req.body.adress,
        password:secpass,

    })
    console.log(req.body);
    // var name=req.body.firstname
    // // var lastname=req.body.lastname
    // var email = req.body.email
    // var adress = req.body.adress
    // // var sem = req.body.sem
    // // var branch = req.body.branch
    // // var enrollment=req.body.enroll
    // // var fname= req.body.fname
    // // const studentregistered = await studentregister.save();
    const userregistered = await user.save();
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'shivamkumar776591@gmail.com',
    //       pass: 'bdbovfvmeqyyuzuz'
    //     }
    //   });
      
    //   var mailOptions = {
    //     from: 'shivamkumar776591@gmail.com',
    //     to: req.body.email,
    //     subject: 'Registerd as Student',
    //     text: `Hey  ${name} , Congratulataion you are successfully registered in my website . Order and enjoy food.Your Detail are as follows
    //             Name:${name}
    //             Email:${email}
    //             Adress: ${adress}
    //                 `
    //   };
      
    //   transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });
    
    
console.log(userregistered);
})


app.post("/login/user",async(req,res)=>{
    try{
          const email = req.body.email;
    const pass = req.body.password;
    const findUser = await Registeruser.findOne({email:email});
    // console.log(findUser);
    if(!findUser){
        res.status(404).json({error:"no user found"});
    }
 if(!(bcrypt.compare(pass,findUser.password) )){
    return res.status(404).json({errors:"Try logging with correct credentials"});
 }
 const data = {
    user:{
        id:findUser.id,
    }
 }
 const authToken = jwt.sign(data,jwtSecret);

    return res.status(200).json({success:true,authToken:authToken});
 
 
    }catch(err){
        res.status(404).json({sucess:false});
    }
  


})
//display data

app.post('/foodData',async (req,res)=>{
    try{
        // const findFoddItems = await Fooditem.find({});
        // console.log(global.food_items)
        res.send([global.food_items,global.foodCategory]);
    }catch(err){
        res.send("server error");
    }
})
// app.post('/orderData',async(req,res)=>{
// console.log(req.body.order_data);
//     let item= req.body.order_data;
//     console.log("email is "+ req.body.email)
//     // console.log(data.length);
//     console.log(item);
//     const line_items = req.body.order_data.map(item =>{
//               return{
//                   price_data: {
//                       currency: 'inr',
//                       product_data: {
//                         name: item.name,
//                         metaData:{
//                           id : item._id
//                         },
                        
//                       },
//                       unit_amount: item.price*100,
//                     },
//                     quantity: item.qty, 
//               }
//           })
//           const session = await stripe.checkout.sessions.create({
//             line_items,
//             mode: 'payment',
//             success_url: 'http://localhost:3000/checkout-success',
//             cancel_url: 'http://localhost:3000/',
//           });
        
//           res.send({url: session.url});
//     await item.splice(0,0,{Order_date:req.body.order_date})
//     let eId = await newOrder.findOne({'email':req.body.email})
//     // console.log(eId);
//     if(eId===null){
//         try{
//             const order = new newOrder({
//                 email:req.body.email,
//                 order_data:[item]
        
//             })
//             const orderDone = await order.save();
//             console.log(orderDone);
//         }catch(error){
//             console.log(error);
//             // res.send("server error",error.message)
//         }
//     }
//     else{
//         try{
//            await newOrder.findOneAndUpdate({email:req.body.email},{
//             $push:{order_data:item}
//            }).then(()=>{
//             res.json({success:true});
//            })

                

//         }catch(error){
//             // res.send("Server ERROR",error.message)
//         }
//     }
// })

app.post('/create-checkout-session', async (req, res) => {
    let food = req.body.orderData;
    console.log(food);
    const line_items = req.body.orderData.map(item =>{
        return{
            price_data: {
                currency: 'inr',
                product_data: {
                  name: item.name,
                //   imgages:[item.image],
                  metaData:{
                    id : item._id,
                    // images:[item.image],
                  },
                  
                },
                unit_amount: item.price*100,
              },
              quantity: item.qty, 
            //   image:item.image,
        }
    })
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/checkout-success',
      cancel_url: 'http://localhost:3000/',
    });
  
    res.send({url: session.url});
    let item = req.body.orderData;
    console.log(item)
        console.log("email is "+ req.body.email)
        // console.log(data.length);
        // console.log(item);
        await item.splice(0,0,{Order_date:req.body.order_date})
        let eId = await newOrder.findOne({'email':req.body.email})
        // console.log(eId);
        if(eId===null){
            try{
                const order = new newOrder({
                    email:req.body.email,
                    order_data:[item]
            
                })
                
                const orderDone = await order.save();
                console.log(orderDone);
            }catch(error){
                console.log(error);
                // res.send("server error",error.message)
            }
        }
        else{
            try{
               await newOrder.findOneAndUpdate({email:req.body.email},{
                $push:{order_data:item}
               }).then(()=>{
                res.json({success:true});
               })
    
                    
    
            }catch(error){
                // res.send("Server ERROR",error.message)
            }
        }
  });

  
// app.get('/checkout-success')

app.post('/myOrderData',async (req,res)=>{
    try{
        let myData = await newOrder.findOne({'email':req.body.email})
        console.log(myData);

        res.json({orderData:myData})
    }catch(e){
        res.send(e);
    }
})
// app.post('/myOrderData', async (req, res) => {
//     try {
//       let myData = await newOrder.findOne({ 'email': req.body.email })
//       res.json({ orderData: [myData] }) // send as an array
//     } catch (e) {
//       res.send(e);
//     }
//   })
  

// app.post('/myOrderData', async (req, res) => {
//     try {
//       const orderDate = req.body.Order_date;
//       console.log(orderDate)
//     //   console.log(orderDate);
//     // const email  = req.body.email;
//     // console.log(email);
//       //     const order = await newOrder.findOne({ email: req.body.email, order_data: { $elemMatch: { email: email } } });
//       // console.log(order);
//       // if (!order) {
//       //   console.log("no order found")
//       //   res.json({ orderData: null });
//       // } else {
//       //   const orderData = order.order_data.find((item) => item.email === email);
//       //   console.log(orderData);
//       //   res.json({ orderData });
//       // }
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   });
  


app.listen(5000,"127.0.0.1",()=>{
    console.log("running on 5000");
})