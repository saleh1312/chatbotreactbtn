import React from 'react'
import { userContext } from '../context'
import axios from 'axios'

export function ButtonsMsg(props) {
    const [ele,i,send_message]=props.data

    return(
        <div className="w-100 d-flex flex-row mt-2 pl-2" key={i}>
            <div className="p-2 d-flex flex-column" style={{borderRadius:"25px",backgroundColor:"rgb(220,220,220)",maxWidth:"80%"}}>
                {
                    ele.data.map((btn,j)=>{
                        return(<button onClick={()=>{send_message(false,ele.data[j].id,ele.data[j].content)}} className='btn btn-secondary m-2' key={j} style={{minWidth:"110px"}}>{btn.content}</button>)
                    })
                }

                

            </div>
        </div>
    )

}
export function TextMsg(props) {
    const [ele,i]=props.data
    if(ele.me===true){
        return(
          <div className="w-100 d-flex flex-row-reverse mt-2 pr-2" key={i}>
            <div className="bg-warning p-2" style={{borderRadius:"25px",maxWidth:"80%"}}>
              <span style={{wordWrap: "break-word"}}>{ele.content}</span>

            </div>
          </div>
        )
      }else{
        return(
          <div className="w-100 d-flex flex-row mt-2 pl-2" key={i}>
            <div className="p-2" style={{borderRadius:"25px",backgroundColor:"rgb(220,220,220)",maxWidth:"80%"}}>
              <span style={{wordWrap: "break-word"}}>{ele.content}</span>

            </div>
          </div>
        )
    }
}
  