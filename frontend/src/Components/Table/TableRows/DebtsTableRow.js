import {uniqueId, map} from 'lodash'
import React from 'react'
import TableBtn from '../../Buttons/TableBtn'

export const DebtsTableRow = ({data, currency, Pay, Print}) => {
    return (
        <>
            {map(data, (debt, index) => (
                <tr className='tr' key={uniqueId('debt')}>
                    <td className='text-left td'>{1 + index}</td>
                    <td className='text-right td'>
                        {new Date(debt.createdAt).toLocaleDateString()}
                    </td>
                    <td className='text-right td'>{debt.id}</td>
                    <td className='text-left td'>
                        {debt.client && debt.client.name}
                    </td>
                    <td className='text-right td font-medium'>
                        {(currency === 'USD'
                            ? debt.totalprice
                            : debt.totalpriceuzs
                        ).toLocaleString('ru-RU')}{' '}
                        <span className='text-warning-500'>{currency}</span>
                    </td>
                    <td className='text-right td py-[0.625rem] font-medium'>
                        {currency === 'UZS'
                            ? (Math.round(debt.debtuzs * 1) / 1).toLocaleString(
                                  'ru-RU'
                              )
                            : (
                                  Math.round(debt.debt * 1000) / 1000
                              ).toLocaleString('ru-RU')}{' '}
                        <span className='text-error-500'>{currency}</span>
                    </td>
                    <td className='td border-r-0 py-[6px]'>
                        <div className='flex justify-center items-center gap-[0.625rem]'>
                            <TableBtn
                                type={'print'}
                                bgcolor={'bg-primary-800'}
                                onClick={() => Print(debt.saleconnector)}
                            />
                            <TableBtn
                                type={'pay'}
                                bgcolor={'bg-success-500'}
                                onClick={() => Pay(debt)}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
