import React from 'react'
import { reduce } from 'lodash'

export const RegisterSaleTableFooter = ({ saleproducts, currency }) => {
    console.log(saleproducts);
    const totalprice = reduce(
        saleproducts,
        (summ, product) => summ + (Number(product.pieces) + (product.fromFilial || 0)) * product.unitprice,
        0
    )

    const totalpriceuzs = reduce(
        saleproducts,
        (summ, product) => summ + (Number(product.pieces) + (product.fromFilial || 0)) * product.unitpriceuzs,
        0
    )
    return (
        <tr>
            <th colSpan={5} className='text-right py-2'>
                Jami:
            </th>
            <th colSpan={2}>
                {currency === 'UZS'
                    ? totalpriceuzs.toLocaleString('ru-RU')
                    : totalprice.toLocaleString('ru-RU')}{' '}
                {currency}
            </th>
        </tr>
    )
}
