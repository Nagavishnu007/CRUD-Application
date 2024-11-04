import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import './App.css'

function App() {

    const [users,setUsers] = useState([])
    const [buttonState,setButtonState]=useState("add")

    const [userInfo,setUserInfo]=useState({
        id:uuid(),
        name:"",
        age:"",
        email:"",
        number:""
    })

    const handleChange =(e)=>{

           const {name,value} = e.target;
           setUserInfo((CurValue)=>{
             return{
                ...CurValue,[name]:value
             }
           })
     }

     const addData=()=>{
        setUsers((currUsers)=>[...currUsers,userInfo])
        setUserInfo({
            id:uuid(),
            name:"" ,
            age:"",
            email:"",
            number:""
        })
       
     }
    

     const deleteData=(id)=>{
           
        setUsers((currUsers)=>{
          return currUsers.filter((user)=>{
                 return user.id !== id
          })
        })
        
     }

     const startEdit=(user)=>{
           setUserInfo(user)
           setButtonState("edit")

     }
     
     const cancelEdit=()=>{
      setUserInfo({
        id:uuid(),
        name:"" ,
        age:"",
        email:"",
        number:""
      })
      setButtonState("add")
     }

     const updateData=()=>{
       setUsers((currUsers)=>{
         return currUsers.map((user)=>{
           if(user.id === userInfo.id){
             return userInfo
           }return user
         })
       })
       cancelEdit()
     }

  return (
    <div className='container'>

       <h1>CRUD Application</h1>

       <form>
           <input type="text" placeholder="Enter the name" name="name" value={userInfo.name} onChange={handleChange}/>
           <br/>
           <input type="number" placeholder="Enter the age" name="age" value={userInfo.age} onChange={handleChange}/>
           <br/>
           <input type="email" placeholder="Enter the email" name="email" value={userInfo.email} onChange={handleChange}/>
           <br/>
           <input type="number" placeholder="Enter the number" name="number" value={userInfo.number} onChange={handleChange}/>
       </form>

       {buttonState === "add"?(<button className="btn1" onClick={addData}>Add</button>):
                              (<div>
                                  <button className="btn1" onClick={updateData}>Update</button>
                                  <button className="btn1" onClick={cancelEdit}>Cancel</button>
                              </div>)}

       <table>
           <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Number</th>
                <th>Actions</th>
              </tr>
           </thead>
           <tbody>
             {users.map((user,index)=>{
                return(
                    <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.email}</td>
                        <td>{user.number}</td>
                        <td>
                            <button onClick={()=>{startEdit(user)}}>Edit</button>
                            <button onClick={()=>{deleteData(user.id)}}>Delete</button>
                        </td>
                    </tr>
                )
             })}

           </tbody>
       </table>
    </div>
  )
}


export default App
