const express           =   require("express");
const bodyParser        =   require("body-parser");
const ejs               =   require("ejs");
const app               =   express();
const  _                =   require("lodash")

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

// my objects
let myNewContentHeaders  = [];
let myNewContents = [];


// default block texts
const content = "Learning new things is a huge part of life -- we should always be striving to grow and learn a new skill."+
"Whether you're learning Spanish or want to do math fast, it takes time to learn each lesson, and time is precious."+
"So how can you make the most of your time by speeding up the learning process?"+
"Thanks to neuroscience,we now have a better understanding of how we learn and the most effective ways our brains process and hold on to information.";

const about   = "During undergraduate and graduate studies in Mechatronics Engineering, had the opportunity to work in a wide range of fields from electronics to robotics,"+
"from software to 3D modeling. After all experience, on the verge of academic studies and applications on artificial intelligence and machine learning, which had the opportunity "+
"to work on during master's degree, chose to develop and advance myself in this field. During graduate education, became someone who is eager to learn and knows how to learn."+
"After all, chose the field of artificial intelligence as PhD field of study. Wants to improve myself and develop useful applications in this field in business life as well.";

let postObjectsList = [{header:"Learning",content:content}];

//creating home page response
app.get("/",function(req,res){
    res.render("home",{myHomePage:"Home",
    content1:content,
    content:myNewContents,
    contentHeader:myNewContentHeaders});   
});

//about page response
app.get("/about",function(req,res){
    res.render("about",{myHomePage:"About",content1:about})
})

//contact page response
app.get("/contact",function(req,res){
    res.render("contact",{myHomePage:"Contact"})
})

//compose page response
app.get("/compose",function(req,res){
    res.render("compose",{myHomePage:"Compose New Content"})
});


//compose post response
app.post("/compose",function(req,res){
    let newContentHeader = req.body.contentHeader;
    let newContent       = req.body.content;
    myNewContents.push(newContent);
    myNewContentHeaders.push(newContentHeader);
    postObjectsList.push({header:newContentHeader,content:newContent});
    res.redirect("/");
})

// routing params:
app.get("/:postId",function(req,res){
    const theTitle = _.lowerCase(req.params.postId);

    postObjectsList.forEach(function(object){ 
        const savedTitle =   _.lowerCase(object.header); 
            
        if(theTitle === savedTitle){
            res.render("post",{myHomePage:"The Post",
            postHeader:object.header,postContent:object.content});            
        }
        
    })
})

app.listen(8800,function(){
    console.log("The server is running on port 8800");
    
})
