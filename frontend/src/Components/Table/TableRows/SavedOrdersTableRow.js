import React from 'react'
import {map} from 'lodash'
import TableBtn from '../../Buttons/TableBtn'
export const SavedOrdersTableRow = ({
    data,
    handleDelete,
}) => {
    return (
        <>
            {map(data, (item, index) => (
                <tr key={index} className='tr'>
                    <td className='td py-2'>{1 + index}</td>
                    <td className='td text-end'>{item?.date}</td>
                    <td className='td text-end'>{item?.time}</td>
                    <td className='td text-left'>{item?.shopName}</td>
                    <td className='td text-end'>{item?.productCount.toLocaleString('ru-Ru')} {item?.productUnit}</td>
                    <td className='td text-end'>{item?.totalPrice.toLocaleString('ru-Ru')} USD</td>
                    <td className='td text-end'>{item?.totalPriceUZS.toLocaleString('ru-Ru')} UZS</td>
                    <td className='td border-r-0'>
                        <div className='flex items-center justify-center gap-[0.625rem]'>
                            <TableBtn
                                type={'print'}
                                bgcolor={'bg-primary-800'}
                            />
                            <TableBtn
                                type={'edit'}
                                bgcolor={'bg-warning-500'}
                            />
                            <TableBtn
                                type={'delete'}
                                bgcolor={'bg-error-500'}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
