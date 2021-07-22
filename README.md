# BACKEND KOA TEMPLATE

## What the fuck is this?
First of all I'm not a backend developer so I have some difficulties to creating backend apps and every time I need to do something I get the same issues/doubts I as before. Saying that, I've made an abstraction of my code, so that every time I need to create a new backend app, I'll have an initialized with the basics.

## What will this project follow?
I'm not pretty sure yet, but I'm doing some with MVC (Model, View, Controller) and another stuffs of my head.

## What is your Stack?
This project is build in NodeJs with KoaJs, and its common middlewares, and MongoDB with mongoose.

## What is your ideia with MVC?
I'm writting some basics operations that a CRUD will have, nothing more.   
   
**Model Layer**: The purpose of this layer is handle the ORM/Database, so only the models will have access, in this case, to mongoose or another library. I've created a class called BasicModel that have the CRUD functions.   
   
**Controller Layer**: The purpose of this layer is handle the requests of API with KoaRouter. The controller uses the model functions to query the data that is necessary to do what it should do, and its doesn't have access to ORM. I've created a abstract class called BaseController that hat have the CRUD functions.