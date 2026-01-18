import {createServer} from 'http';
import {Server} from 'socket.io'

const httpServer=createServer();
const socket=new Server(httpServer,{
  cors:{
    origin:'http://localhost:5173'
  }}
);
let crudData=[];

socket.on("connection",(socket)=>{
  socket.on('formData',(data)=>{
    crudData.push(data);
  });
  socket.on('editData',(res)=>{
    console.log(res);
    let currentIndex=crudData.findIndex((data)=>data.id===res.id);
    if(currentIndex!=-1)
    {
      crudData[currentIndex]={...crudData[currentIndex],...res};
    }
  })
  socket.on('deleteData',(id)=>{
    let currentIndex=crudData.findIndex((data)=>data.id===id);
    if(currentIndex!=-1)
    {
      crudData.splice(currentIndex,1);
    }
  })
  setInterval(()=>{
    socket.emit('crudData',crudData);
  },1000);
  });


httpServer.listen(3000,()=>{
  console.log('Server is running');
})
