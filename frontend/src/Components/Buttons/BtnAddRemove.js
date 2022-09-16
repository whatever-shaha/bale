import React from 'react'
import {BiPlus} from 'react-icons/bi'
import {MdOutlineClear} from 'react-icons/md'

const BtnAddRemove = ({onClick, text, add, edit}) => {
    return (
        <button
            onClick={onClick}
            className={`focus-visible:outline-none ${add ? 'createElement' : edit ? 'edit-button' : 'clearElement'}`}
        >
            {add && !edit ? (
                <div className='plusIcon'>
                    <BiPlus />
                </div>
            ) : !add && !edit ? (
                <div className='plusIcon'>
                    <MdOutlineClear />
                </div>
            ) : (
                ''
            )}
            {text}
        </button>
    )
}

export default BtnAddRemove
