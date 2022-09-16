import React from 'react';  
import FilialConnectionCard from '../../Components/FilialConnectionCard/FilialConnectionCard';
function Connection() {

    const data = [
        {
            director : {
                 image : 'https://images.theconversation.com/files/71098/original/image-20150204-28578-7qf35.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
                firstname : 'Jasurbek',
                lastname : 'Toshev'
            },
            shopInn : '12345678',
            directorName : "Jasurbek",
            directorLastName : "Toshev",
            phoneNumber : '+998 99 753 17 57',
            shopName : 'Pipe house darxon filiali'
        }
    ]
    return(
        <div className='mainPadding'>
            {
                data && data.map((item, index) => {
                   return(
                     <div key={index}>
                         <FilialConnectionCard value={item}/>
                     </div>
                   )
                })
            }       
        </div>
    )
}

export default Connection;