import React from 'react'
import {map, reduce} from 'lodash'

export const RegisterOrdersTableRow = ({
    data,
    currentPage,
    countPage,
    currency,
}) => {
    return (
        <>
            {map(data, (item, index) => (
                <tr key={index} className='tr'>
                    <td className='td py-2'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-left'>{item?.sender?.name}</td>
                    <td className='td text-center'>{item?.sender?.inn}</td>
                    <td className='td text-center'>{item?.id}</td>
                    <td className='td text-end'>{item?.products?.length}</td>
                    <td className='td text-end'>
                        {currency === 'UZS'
                            ? item?.totalpriceuzs.toLocaleString('ru-Ru')
                            : item?.totalprice.toLocaleString('ru-Ru')}{' '}
                        {currency}
                    </td>
                    <td className='td text-end'>{item?.status}</td>
                </tr>
            ))}
        </>
    )
}
