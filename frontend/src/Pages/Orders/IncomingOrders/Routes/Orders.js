import React from 'react'
import FieldContainer from '../../../../Components/FieldContainer/FieldContainer'
import Table from '../../../../Components/Table/Table'
import {useSelector} from 'react-redux'

function Orders() {

    const {currencyType} = useSelector((state) => state.currency)

    const data = [
        {
            code : '1010',
            productName : 'Balgarka drel',
            productCount : 20,
            productUnit : 'ta',
            productPriceUZS : 300000,
            productPrice : 30,
        },
        {
            code : '1010',
            productName : 'Balgarka drel',
            productCount : 20,
            productUnit : 'ta',
            productPriceUZS : 300000,
            productPrice : 30,
        },
        {
            code : '1010',
            productName : 'Balgarka drel',
            productCount : 20,
            productUnit : 'ta',
            productPriceUZS : 300000,
            productPrice : 30,
        },
    ]
    const headers = [
        {title: '№', styles: 'w-[10%]'},
        {
            filter: '',
            title: "Maxsulot kodi",
            styles: 'w-[10%]'
        },
        {
            title: 'Maxsulot nomi',
            filter: 'name',
        },
        {title: 'Maxsulot soni', filter: 'count',styles: 'w-[15%]'},
        {title: 'Maxsulot narxi', filter: 'price',styles: 'w-[15%]'},
        {
            title: 'Soni', filter: '' ,styles: 'w-[15%]'
        },
        {
            title: '',
            filter: '', 
            styles: 'w-[10%]'  
        }
    ]
    return (
        <section >
            <div className='mainPadding'>
                <h2 className='pb-[1.25rem] text-[1.25rem]'>Alo24 Amerika Filiali</h2>
                <FieldContainer
                    select={true}
                    placeholder={'misol: kompyuter'}
                    value={''}
                    label={'Maxsulotlar'}
                    onChange={() => {}}
                    options={[]}
                />
            </div>
            <div className='tableContainerPadding'>
                    <Table
                        page='orderProducts'
                         data={data}
                         headers={headers}
                         currency={currencyType}
                    />
            </div>
        </section>
    )
}

export default Orders
