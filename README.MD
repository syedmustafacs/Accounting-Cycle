This is an example of using database model in express js application. By following the instruction mentioned in this document you would be able to connect to database and should be able to perform CRUD Operations. 

Following are the steps to follow in this example to achieve the target. 

1 ) Create Express Application
2 ) Add Necessary Node Packages for database model. 
3 ) ORM Implementation
4 ) Models & Migration Setup
5 ) Models Association
6 ) Interaction with the Models


1 ) Create Express Application

First of all you would need to setup an express application first or you can use already defined and created express application. I would recommend to use the structure that i have shared with you previously for API. 

$ express --view=pug iadserver04

$ cd iadserver04

$ npm install

This will create a new application named "iadserver04" in the directory where you run this command, after that you should install the npm packages. You can use the previous tutorial that i provided for expressJS app.


2 ) Add Necessary Node Packages for database model

We can use different databases for our application; mysql, mssql, postgres, mongodb and for that we would need to include different packages of Node in our application. 

## MYSQL = '$ npm install --save mysql'
## MSSQL = '$ npm install --save mysql'
## POSTGRESS = '$ npm install --save pg'

This will install the nodeJS module and saved it to your package.JSON file for future use. You would have to use only one from the above; because db should be maintained only one database server. 

3 ) ORM Implementation

We have already discussed the advantages of using ORM in projects so we will be using one of the popuplar ORM of NodeJS which is sequelize. 

Sequelize provides us model implementation, raw queries to database, migration, seed and model generation. To implement it we need add couple of packages in our package.json

$ npm install --save sequelize

This will install sequelize node package that will be used in our project for model generation and interaction.

$ npm install --save sequelize-cli

This will install sequelize cli tool which will be used to create model, seeds, migrations skeletion structure. 

4 ) Models & Migration Setup

Models are the database layers in our application which talks with the database and we don't have to directly connect with the database to perform various operations. Models provide us an easy way to query the database without understanding syntax of that particular database server.

We will first initialize the sequelize so that our application/project should be able to perform those ORM related operations: 

$ sequelize init

This will command will create  migration, seeds, model and config folders in your project directory, actually it basically initiate these four processes which eventually creates these folders. 

A file in config folder named config.json includes all the database related configurations such as database name, database host, database user, database password, database type (MySQl, MSSQL, Postgres). This is the configuration file which will be used by cli to perform any database related operation through model or cli.

Each database entity (relation) should be associated with a model in our project and we will be interacting with this model in our project to query to the database table. 

We write migrations to maintain the database structures of our application; Migration tool is provided by the framework and languagues to perform database DDL operation through application without writing the queries. We do it because in this way our database structure get consistent and we include these migration files in our VCS system to maintain the versioning of it which will eventually help us in team colloboration. 

We write seeds to provide seed data to our database entities in-order to run the project, Seed tool is also provided by the framework or languages to perform database Insert,Update and Delete Opertaions on a particular entity set. Let's take an example we have a country table in our database and by default we provide all the available countries when we setup the application in that case we will be writing a seed to insert default countries into our database. 

In this example we will be implementing this scenario in which user belongs to some role (pre-defined) and that user has blogs which belong to some categories.  

Roles Models:

$ sequelize model:create --name Roles --attributes name:string,slug:string

This will create Roles model and also create a migration file for this model which will create a role table in the database when we run. We selection two attributes (name, slug) for this particular model/entity.

$ sequelize model:create --name User --attributes firstname:string,lastname:string,dob:date,gender:string,roleId:string

This will create User model along with its create migration that will create a user table in the database when we run the migration. 

Now i am going to add some predefined roles in Roles Table so that user on signup will be linked to that particular role.

$ sequelize seed:create --name addRoles

This will create a seed file "20170414150557-addRoles.js" then i have the added the following code to that file to bulk insert data to this datable.

In Up function add the following code.

"
return queryInterface.bulkInsert('Roles', [{
        name: 'Admininstrator',
        slug: 'ADMIN'
      },{
        name:'Customer',
        slug: "CUSTOMER"
      },
      {
        name:'Staff/ Employees',
        slug: "STAFF"
      }], {});

"

This will add three roles to our Roles Table of Database.

Similarly in Down function we would need to add the the following code.

"
return queryInterface.bulkDelete('Roles', null, {});
"

This will delete all the records in Roles table. 

Moreover, we have a case in which blogs that will be created by the user can have many categories and similarly one category can have many blogs (Many-to-Many Relation) in that case a weak entity set is required and we will be creating a weak entity set model/migration here along with the blog and categories.

$ sequelize model:create --name Blogs --attributes name:string,description:text,image:string


$ sequelize model:create --name Categories --attributes name:string,description:text,image:string,sortOrder:integer


$ sequelize model:create --name Blogs2Categories --attributes blogId:integer,categoryId:integer,status:string

Above three commands will create blogs,categories and blog2categories models/migration. We need to provide pre-defined categories in our project so we need to create a seed file for that. 

$ sequelize seed:create --name AddBlogCategories

This will create a seed file, we need to add the following code in up function to add bulk data in this particular table.

"
return queryInterface.bulkInsert('Categories', [{
        name: 'Technical Blogs',
        description: "Complete Description of technical blogs",
        sortOrder:1,
      },{
        name: 'Motivational Blogs',
        description: "Complete Description of motivational blogs",
        sortOrder:2,
      },{
        name: 'General Section',
        description: "Complete Description of general section",
        sortOrder:3,
      }], {});

"
This will add three categories to our database table categories. Similarly we need to add the code for down function which will be called when revert the seed. 

"
return queryInterface.bulkDelete('Categories', null, {});
"

Moreover, the migrations and seeds we created to perform database level structure and data level changes are not implemented so far since we didn't start a migration and seeder, following are the commands to perform these operations.

$ sequelize db:migrate

$ sequelize db:seed

5 ) Models Association

We have created the models and run migrations & seeds to our database tables. Now let's understand the association between models that will be used in our project when we apply relations between entities. 

a) User Belongs to Roles 

This is the first association that we need to thinkn and for that we have already created roleId column in User table since one user belongs to one role. In Model we need to define this association so that later one when we fetch a particular record from the database we will also join the data from roles table. 

We will update the association function of User which is basically a classMethod of that particular sequelize object. 

"
associate: function(models) {
        User.belongsTo(models.Roles, {foreignKey: 'roleId',as: "Roles"})
        // associations can be defined here
        
      }

"

This will linke roleId as foreignKey of Roles table and we defined it Alias as Roles so we can call it using Roles from User Object. 


b) Role Has Many Users

There is a reverse association between users and roles which is one role can have many users and this 
association can be defined as 

"
  associate: function(models) {
        // associations can be defined here
        models.Roles.hasMany(models.User, {as:"Users",foreignKey:"roleId"})
      }

"

c) Blogs Belongs to Many Categories

We will be using an intermediate table that will maintain the many-to-many association between two entites and is named as blog2categories. We will update the associate method of blogs model as follow:

"
 associate: function(models) {
        // associations can be defined here
        Blogs.belongsToMany(models.Categories,{
          through:{
            model:models.Blogs2Categories,
            foreignKey: "blogId",
            as: 'category'
          }
        })
      }


"

This will associate blogs to categories through blog2categories (weak entity set)


d) Categories has Many Blogs

Similarly to associate categories with blogs we will amend the associate method in categories models as follows:

"
classMethods: {
      associate: function(models) {
        // associations can be defined here
        Categories.belongsToMany(models.Blogs,{
          through:{
            model: models.Blogs2Categories,
            foreignKey: "categoryId",
            as:"blog"

          }
        });

      }
    }

"

6 ) Interaction with the Models

We have defined association between models now we are going to interact with the models as follows. 

Wherever we need to access the models we need to include models/index.js in that particular file. 
>>> var model = require("../models");

To Create User we need to use the following code:

"
model.User.create({
    firstname:"John",
    lastname:"Doe",
    dob:"01/01/2017",
    gender:"male",
    roleId:1
  }).then(function(res){
        console.log(res)
  });

"

To Select the user from database table we need to use the following code: 


"
model.User.find({
      include: [
        { model: model.Roles }
    ]
  }).then(function(resp){
    console.log(resp);
  })


"

This will also include model object of that particular user this is where association would work. 


Now we are going to create a blog and then assign that blog to a particular category. 


"

/**** Blog Created ***/  
model.Blogs.create({
  name:"Tech 114 Blog",
  description:"Hello World"
}).then(function(blog){   
    /*** A Promise Handler when blog is created, now we will be assigning categories to it ****/
  
  /**** Category Assignment - Here it will first find the category model then assign it to blog */
  model.Categories.find({id:1}).then(function(category){

      /*** AddCategory and getCategory are the associative function that are provided by sequelize in case of belongsToMany relation ***/

      blog.addCategory(category).then(function(t){
        res.send("Blog Created");
      }); 
  });

  
  
 });
 /*******/



"
