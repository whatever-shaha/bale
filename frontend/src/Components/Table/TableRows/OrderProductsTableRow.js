import React from 'react'
import {map} from 'lodash'
import TableBtn from '../../Buttons/TableBtn'
import TableInput from '../../Inputs/TableInput'
import {IoAdd, IoRemove} from 'react-icons/io5'
export const OrderProductsTableRow = ({data, currency}) => {

    return (
        <>
            {map(data, (item, index) => (
                <tr key={index} className='tr'>
                    <td className='td py-2'>
                        {1 + index}
                    </td>
                    <td className='td text-center'>{item?.code}</td>
                    <td className='td text-left'>{item?.productName}</td>
                    <td className='td text-end'>{item?.productCount.toLocaleString('ru-Ru')} {item?.productUnit}</td>
                    <td className='td text-end'>{currency === 'UZS' ? item?.productPriceUZS.toLocaleString('ru-Ru') : item?.productPrice.toLocaleString('ru-Ru')} {currency}</td>
                    <td className='text-right td'>
                        <span className={'flex gap-[0.6rem] items-center'}>
                            <button
                                className={'rounded-[4px] duration-100 bg-error-500 hover:bg-error-600 p-[0.2rem] text-base text-white-900 active:scale-95'}
                                ><IoRemove
                                size={'0.875rem'} /></button>
                        <TableInput
                            value={''}
                            onChange={(e) =>
                                {}
                            }
                            type={'number'}
                        />
                          <button
                              className={'rounded-[4px] duration-100 bg-success-500 hover:bg-success-600 p-[0.2rem] text-base text-white-900 active:scale-95'}
                              ><IoAdd
                              size={'0.875rem'} /></button>
                        </span>
                    </td>
                    <td className='td'>
                    <div className='flex items-center justify-center gap-[5px]'>
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
