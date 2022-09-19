import React from 'react'
import Table from '../../../../Components/Table/Table'
import {useSelector} from 'react-redux'
import Pagination from '../../../../Components/Pagination/Pagination'
import SearchForm from '../../../../Components/SearchForm/SearchForm'
function RegisterOrders() {
    const {currencyType} = useSelector((state) => state.currency)

    const data =[
        {
            shopName : "Alo24",
            inn : "123456789",
            id : "abs123",
            productType : '4',
            productNumber : 5,
            productUnitname : 'ta',
            totalPriceUZS : 250000,
            totalPrice : 25,
            status : ''
        },
        {
            shopName : "Alo24",
            inn : "123456789",
            id : "abs123",
            productType : '4',
            productNumber : 5,
            productUnitname : 'ta',
            totalPriceUZS : 250000,
            totalPrice : 25,
            status : ''
        },
        {
            shopName : "Alo24",
            inn : "123456789",
            id : "abs123",
            productType : '4',
            productNumber : 5,
            productUnitname : 'ta',
            totalPriceUZS : 250000,
            totalPrice : 25,
            status : ''
        }
    ]

    const headers = [
        {title: '№'},
        {
            filter: '',
            title: "Do'kon nomi",
        },
        {
            title: 'INN',
            filter: '',
        },
        {title: 'ID', filter: ''},
        {title: 'Maxsulot turi', filter: ''},
        {
            title: 'Maxsukot soni',
            filter: '',
        },
        {
            title: 'Umumiy narxi',
            filter: '',   
        },
        {
            title: 'Holati',
            filter: '',    
        }
    ]

    return (
        <section>
            <div className='pagination mainPadding'>
                <p className='flex items-center'>Ro'yxatlar</p>
                <Pagination
                />
            
            </div>
            <SearchForm
                filterBy={['total', 'startDate', 'endDate', 'id', 'marketName']}
            />
            <div className='tableContainerPadding'>
                    <Table
                        page='registerOrder'
                        currentPage={''}
                        countPage={''}
                        data={data}
                        headers={headers}
                        currency={currencyType}
                    />
            </div>
        </section>
    )
}

export default RegisterOrders
