const as=require("fs");
function akhileshread(){
 return new Promise(function(resolve)
{
as.readFile("a.txt", "utf-8", function(err, data)
   {

  resolve(data);

   });
})
}
function ondone(data)
{
  console.log(data)
}
akhileshread().then(ondone); 