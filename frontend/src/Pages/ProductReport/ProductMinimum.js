import {t} from 'i18next'
import {map} from 'lodash'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {exportExcel, universalSort} from '../../App/globalFunctions'
import ExportBtn from '../../Components/Buttons/ExportBtn'
import Table from '../../Components/Table/Table'
import { universalToast } from '../../Components/ToastMessages/ToastMessages'
import {getMinimumProducts} from './productreportSlice'

const ProductMinimum = () => {
    const dispatch = useDispatch()
    const {currencyType} = useSelector((state) => state.currency)
    const {minimumproducts} = useSelector((state) => state.productReport)

    const [currentData, setCurrentData] = useState([])
    const [storageData, setStorageData] = useState([])
    const [sorItem, setSorItem] = useState({
        filter: '',
        sort: '',
        count: 0,
    })

    const headers = [
        {title: t('№')},
        {
            filter: 'productdata.barcode',
            title: t('Shtrix kodi'),
        },
        {
            title: t('Kategoriyasi'),
            filter: t('category.code'),
        },
        {title: t('Kodi'), filter: 'productdata.code'},
        {title: t('Nomi'), filter: 'productdata.name'},
        {
            title: t('Soni'),
            filter: 'total',
        },
        {
            title: t('Olish'),
            filter:
                currencyType === 'UZS'
                    ? 'price.incomingpriceuzs'
                    : 'price.incomingprice',
        },
        {
            title: t('Sotish'),
            filter:
                currencyType === 'UZS'
                    ? 'price.sellingpriceuzs'
                    : 'price.sellingprice',
        },
        {
            title: 'Optom',
            filter:
                currencyType === 'UZS'
                    ? 'price.tradeprice'
                    : 'price.tradepriceuzs',
        },
        {
            title: 'Minimum qiymat',
            filter: 'minimumcount',
            styles: 'w-[5%]',
        },
    ]

    const exportData = () => {
        let fileName = 'Kam qolgan mahsulotlar'
        const exportHeader = [
            t('№'),
            t('Shtrix kodi'),
            t('Mahsulot kategoriyasi'),
            t('Mahsulot kodi'),
            t('Mahsulot nomi'),
            t('Soni'),
            t("O'lchov birligi"),
            t('Kelish narxi USD'),
            t('Kelish narxi UZS'),
            t('Sotish narxi USD'),
            t('Sotish narxi UZS'),
            'Optom narxi USD',
            'Optom narxi UZS',
            'Minimum qiymat',
        ]
        if(minimumproducts?.length > 0) {
            const newData = map(minimumproducts, (item, index) => ({
                nth: index + 1,
                barcode: item?.productdata?.barcode || '',
                category: item?.category?.code || '',
                code: item?.productdata?.code || '',
                name: item?.productdata?.name || '',
                total: item?.total || '',
                unit: item?.unit?.name || '',
                incomingprice: item?.price?.incomingprice || '',
                incomingpriceuzs: item?.price?.incomingpriceuzs || '',
                sellingprice: item?.price?.sellingprice || '',
                sellingpriceuzs: item?.price?.sellingpriceuzs || '',
                tradeprice: item?.price?.tradeprice || '',
                tradepriceuzs: item?.price?.tradepriceuzs || '',
                minimumcount: item?.minimumcount || '',
            }))
            exportExcel(newData, fileName, exportHeader)
        }
        else {
           universalToast("Jadvalda ma'lumot mavjud emas !","warning");
        }
    }

    const filterData = (filterKey) => {
        if (filterKey === sorItem.filter) {
            switch (sorItem.count) {
                case 1:
                    setSorItem({
                        filter: filterKey,
                        sort: '1',
                        count: 2,
                    })
                    universalSort(
                        currentData,
                        setCurrentData,
                        filterKey,
                        1,
                        storageData
                    )
                    break
                case 2:
                    setSorItem({
                        filter: filterKey,
                        sort: '',
                        count: 0,
                    })
                    universalSort(
                        currentData,
                        setCurrentData,
                        filterKey,
                        '',
                        storageData
                    )
                    break
                default:
                    setSorItem({
                        filter: filterKey,
                        sort: '-1',
                        count: 1,
                    })
                    universalSort(
                        currentData,
                        setCurrentData,
                        filterKey,
                        -1,
                        storageData
                    )
            }
        } else {
            setSorItem({
                filter: filterKey,
                sort: '-1',
                count: 1,
            })
            universalSort(
                currentData,
                setCurrentData,
                filterKey,
                -1,
                storageData
            )
        }
    }

    useEffect(() => {
        dispatch(getMinimumProducts())
    }, [dispatch])

    useEffect(() => {
        setStorageData(minimumproducts)
        setCurrentData(minimumproducts)
    }, [minimumproducts])

    return currentData.length > 0 ? (
        <div className='pt-[1rem]'>
            <div className='flex items-center justify-center mainPadding'>
                <p className='product_name text-center'>
                    Kam qolgan mahsulotlar
                </p>
            </div>
            {currentData.length && (
                <div className='mainPadding'>
                    <ExportBtn onClick={exportData} />
                </div>
            )}
            {currentData.length > 0 && (
                <div className='mainPadding'>
                    <Table
                        currencyType={currencyType}
                        headers={headers}
                        page={'product'}
                        data={currentData}
                        Sort={filterData}
                        sortItem={sorItem}
                        currency={currencyType}
                        productminimumpage={true}
                    />
                </div>
            )}
        </div>
    ) : (
        <div className='flex items-center justify-center pt-[2rem]'>
            <p className='product_name text-center'>
                Kam qolgan mahsulotlar mavjud emas...
            </p>
        </div>
    )
}

export default ProductMinimum
