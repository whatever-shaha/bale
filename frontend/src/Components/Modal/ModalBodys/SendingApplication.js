import React, {useState} from 'react'
import {IoShieldCheckmark, IoBanSharp, IoTrashOutline} from 'react-icons/io5'
import {map, filter} from 'lodash'
function SendingApplication() {
    const [data, setData] = useState([
        {
            id: 'aa1',
            inn: '123456789',
            directorName: 'Jasurbek1',
            directorLastName: 'Toshev',
            directorPhone: '+998 99 753 17 57',
            shopName: 'Pipe house darxon filiali',
            approveIcon: true,
            banIcon: false,
        },
        {
            id: 'aa2',
            inn: '123456789',
            directorName: 'Jasurbek2',
            directorLastName: 'Toshev',
            directorPhone: '+998 99 753 17 57',
            shopName: 'Pipe house darxon filiali',
            approveIcon: false,
            banIcon: true,
        },
        {
            id: 'aa3',
            inn: '123456789',
            directorName: 'Jasurbek3',
            directorLastName: 'Toshev',
            directorPhone: '+998 99 753 17 57',
            shopName: 'Pipe house darxon filiali',
            approveIcon: true,
            banIcon: false,
        },
        {
            id: 'aa4',
            inn: '123456789',
            directorName: 'Jasurbek4',
            directorLastName: 'Toshev',
            directorPhone: '+998 99 753 17 57',
            shopName: 'Pipe house darxon filiali',
            approveIcon: false,
            banIcon: true,
        },
        {
            id: 'aa5',
            inn: '123456789',
            directorName: 'Jasurbek5',
            directorLastName: 'Toshev',
            directorPhone: '+998 99 753 17 57',
            shopName: 'Pipe house darxon filiali',
            approveIcon: true,
            banIcon: false,
        },
        {
            id: 'aa6',
            inn: '123456789',
            directorName: 'Jasurbek6',
            directorLastName: 'Toshev',
            directorPhone: '+998 99 753 17 57',
            shopName: 'Pipe house darxon filiali',
            approveIcon: true,
            banIcon: false,
        },
    ])

    const deleteRequest = (id) => {
        const deleteData = filter(data, (item) => {
            return item.id !== id
        })
        setData(deleteData)
    }

    return (
        <div>
            <div className='pt-[2rem]'>
                {data &&
                    map(data, (item, index) => {
                        return (
                            <ul
                                className='request-application-ul'
                                key={index}
                            >
                                <li>
                                    <span className='request-application-ul-li'>
                                        INN
                                    </span>
                                    <p className='text-[1rem] text-black-900'>
                                        {item.inn}
                                    </p>
                                </li>
                                <li>
                                    <span className='request-application-ul-li'>
                                        Director Name
                                    </span>
                                    <p className='request-application-li-p'>
                                        <span>{item.directorName}</span>
                                        <span>{item.directorLastName}</span>
                                    </p>
                                </li>
                                <li>
                                    <span className='request-application-ul-li'>
                                        Director Phone
                                    </span>
                                    <p className='text-[1rem] text-black-900'>
                                        {item.directorPhone}
                                    </p>
                                </li>
                                <li>
                                    <span className='request-application-ul-li'>
                                        Shop Name
                                    </span>
                                    <p className='text-[1rem] text-black-900'>
                                        {item.shopName}
                                    </p>
                                </li>

                                <li>
                                    {item.approveIcon ? (
                                        <div className='mr-[10px] flex gap-[8px]'>
                                            <IoShieldCheckmark
                                                size={`1.5rem`}
                                                className='text-success-700'
                                            />
                                            <span
                                                className='request-application-delete-icon'
                                                onClick={() =>
                                                    deleteRequest(item.id)
                                                }
                                            >
                                                <IoTrashOutline size={`1rem`} />
                                            </span>
                                        </div>
                                    ) : item.banIcon ? (
                                        <div className='mr-[10px] flex gap-[8px]'>
                                            <IoBanSharp
                                                size={`1.5rem`}
                                                className='text-warning-700'
                                            />
                                            <span
                                                className='request-application-delete-icon'
                                                onClick={() =>
                                                    deleteRequest(item.id)
                                                }
                                            >
                                                <IoTrashOutline size={`1rem`} />
                                            </span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </li>
                            </ul>
                        )
                    })}
            </div>
        </div>
    )
}

export default SendingApplication
