const idtousermap=new Map(); //map to store userId and user details

function setuser(id,user){
    idtousermap.set(id,user);
}

function getuser(id){
    return idtousermap.get(id);
}
module.exports={setuser,getuser};