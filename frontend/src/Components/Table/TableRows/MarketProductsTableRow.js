import React from 'react'
import TableBtn from '../../Buttons/TableBtn'
import {map} from 'lodash'

export const MarketProductsTableRow = ({data, currentPage, countPage}) => {

    return (
        <>
            {map(data, (product, index) => (
                <tr key={product._id} className='tr'>
                    <td className='td py-2'>
                        {currentPage * countPage + 1 + index}
                    </td>
                    <td className='td text-center'>{product?.productdata?.barcode}</td>
                    <td className='td text-center'>{product?.category?.code}</td>
                    <td className='td text-center'>{product?.productdata?.code}</td>
                    <td className='td text-left'>{product?.productdata?.name}</td>
                    <td className='td'>
                    <div className='flex items-center justify-center'>
                         <TableBtn
                                type={'marketProduct'}
                            />
                    </div>   
                    </td>
                </tr>
            ))}
        </>
    )
}
