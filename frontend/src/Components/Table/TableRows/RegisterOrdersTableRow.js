import React from 'react'
import {map} from 'lodash'
import TableBtn from '../../Buttons/TableBtn.js'
import {useNavigate} from 'react-router-dom'
import {IoCloseCircleOutline} from 'react-icons/io5'

export const RegisterOrdersTableRow = ({
    data,
    currentPage,
    countPage,
    currency,
}) => {
    const navigate = useNavigate()
    const linkToSale = (order) => {
        navigate('/dukonlar/buyurtma_berish/buyurtmalar', {
            state: {order: {...order}},
        })
    }
    return (
        <>
            {map(data, (item, index) => (
                <tr key={index} className='tr'>
                    <td className='td py-2'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-end '>
                        <div className='flex justify-between'>
                            <span>
                                {new Date(item?.createdAt).toLocaleTimeString()}
                            </span>
                            <span>
                                {new Date(item?.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </td>
                    <td className='td text-end'>{item?.sender?.name}</td>
                    <td className='td text-start'>{item?.sender?.inn}</td>
                    <td className='td text-end'>{item?.id}</td>
                    <td className='td text-end'>{item?.products?.length}</td>
                    <td className='td text-end'>
                        {currency === 'UZS'
                            ? item?.totalpriceuzs?.toLocaleString('ru-Ru')
                            : item?.totalprice?.toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                    <td className='td text-center'>
                        <div className='flex items-center justify-center gap-[0.625rem]'>
                            {item?.position === 'requested' ? (
                                <TableBtn
                                    type={'edit'}
                                    bgcolor={'bg-warning-500'}
                                    onClick={() => linkToSale(item)}
                                />
                            ) : (
                                <IoCloseCircleOutline color='red ' size={22} />
                            )}
                        </div>
                    </td>
                    <td className='td text-end'>{item?.status}</td>
                </tr>
            ))}
        </>
    )
}
