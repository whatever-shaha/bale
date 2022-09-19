import React from 'react'
import {map} from 'lodash'

export const RegisterOrdersTableRow = ({data, currentPage, countPage, currency}) => {

    return (
        <>
            {map(data, (item, index) => (
                <tr key={index} className='tr'>
                    <td className='td py-2'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-left'>{item?.shopName}</td>
                    <td className='td text-center'>{item?.inn}</td>
                    <td className='td text-center'>{item?.id}</td>
                    <td className='td text-end'>{item?.productType}</td>
                    <td className='td text-end'>{item?.productNumber} {item?.productUnitname}</td>
                    <td className='td text-end'>{currency === 'UZS' ? item?.totalPriceUZS.toLocaleString('ru-Ru') : item?.totalPrice.toLocaleString('ru-Ru')} {currency}</td>
                    <td className='td text-end'>{item?.status}</td>
                </tr>
            ))}
        </>
    )
}
