sequelize model:create --name Roles --attributes name:string,slug:string

sequelize model:create --name User --attributes firstname:string,lastname:string,dob:date,gender:string,roleId:string

sequelize seed:create --name addRoles


sequelize db:migrate

sequelize db:seed:all


sequelize model:create --name Blogs --attributes name:string,description:text,image:string


sequelize model:create --name Categories --attributes name:string,description:text,image:string,sortOrder:integer


sequelize model:create --name Blogs2Categories --attributes blogId:integer,categoryId:integer,status:string

sequelize db:migrate

sequelize seed:create --name AddBlogCategories

