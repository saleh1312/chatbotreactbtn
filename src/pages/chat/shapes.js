import React from 'react'
import { userContext } from '../context'
import axios from 'axios'
import './shapes.css'
export function ButtonsMsg(props) {
    const [ele,i,send_message]=props.data

    return(
      <div>

      <div className=' ' style = {{ paddingLeft:"15px", paddingTop:"10px" ,  paddingBottom:"10px" , width:"fit-content", marginLeft:"10px",paddingRight:"10px", maxWidth:"70%", backgroundColor:"#e0e0e0"  , borderTopLeftRadius:"20px" , borderTopRightRadius:"20px" ,  borderBottomRightRadius:"20px"}}>
            <span className='pl-2'>{ele.data[0]?.content}</span>
            </div>
        <div className="w-100 d-flex flex-column justify-content-center align-items-center mt-2 pl-2" key={i}>
            
           
            <div className="p-2 d-flex flex-column" style={{borderTopLeftRadius:"20px" , borderTopRightRadius:"20px" ,  borderBottomRightRadius:"20px" , backgroundColor:"transparent",maxWidth:"80%" }}>
              
              <div className='d-flex flex-column ' >
                  {
                      ele.data.slice(1,ele.data.length).map((btn,j)=>{
                          return(<button onClick={()=>{send_message(false,ele.data[j+1].id,ele.data[j+1].content,btn)}} className='btn btn-secondary m-2' key={j} style={{minWidth:"110px" ,backgroundColor:"transparent" , color:"#0067fe" , borderColor:"#0067fe" , borderRadius:"15px" , outline:"none" }}>{btn.content}</button>)
                      })
                  }
              </div>
                

                

            </div>
        </div>
        </div>
    )

}
export function TextMsg(props) {
    const [ele,i]=props.data
    if(ele.sent_by_customer===true){
        return(
          <div className="w-100 d-flex flex-row-reverse mt-2 pr-2" key={i} >
            <div className=" p-2 d-flex flex-row justify-content-center align-items-center" style={{maxWidth:"80%",minWidth:"20%"  , backgroundColor:"#0067fe" ,color:"white" , borderTopLeftRadius:"20px" , borderTopRightRadius:"20px" ,  borderBottomLeftRadius:"20px"}}>
              <span style={{wordWrap: "break-word"}}>{ele.title}</span>

            </div>
          </div>
        )
      }else{
        return(
          <div className="w-100 d-flex flex-row mt-2 pl-2" key={i} >
            <div className="p-2" style={{backgroundColor:"#e0e0e0",maxWidth:"80%" , borderTopLeftRadius:"20px" , borderTopRightRadius:"20px" ,  borderBottomLeftRadius:"20px"}}>
              <span style={{wordWrap: "break-word"}}>{ele.title}</span>

            </div>
          </div>
        )
    }
}
export function RepliedButton(props) {
  const [ele,i]=props.data
  if(ele.sent_by_customer===true){
      return(
        <div className="w-100 d-flex flex-row-reverse mt-2 pr-2" key={i} >
          <div className="p-2 d-flex flex-row justify-content-center align-items-center" style={{marginBottom:"15px",backgroundColor:"#e0e0e0", maxWidth:"80%",minWidth:"20%" , borderTopLeftRadius:"20px" , borderTopRightRadius:"20px" ,  borderBottomLeftRadius:"20px" }}>
            <span style={{wordWrap: "break-word"}}>{ele.data.content}</span>

          </div>
        </div>
      )
    }else{
      return(
        <div className="w-100 d-flex flex-row mt-2 pl-2" key={i} >
          <div className="p-2" style={{backgroundColor:"#e0e0e0",maxWidth:"80%"  , borderTopLeftRadius:"20px" , borderTopRightRadius:"20px" ,  borderBottomRightRadius:"20px"}}>
            <span style={{wordWrap: "break-word"}}>{ele.data.content}</span>

          </div>
        </div>
      )
  }
}