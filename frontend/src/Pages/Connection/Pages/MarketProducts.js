import React, {useEffect, useState} from 'react'
import LinkToBack from '../../../Components/LinkToBack/LinkToBack.js'
import ExportBtn from '../../../Components/Buttons/ExportBtn.js'
import ImportBtn from '../../../Components/Buttons/ImportBtn.js'
import Pagination from '../../../Components/Pagination/Pagination.js'
import SearchForm from '../../../Components/SearchForm/SearchForm.js'
import {useDispatch, useSelector} from 'react-redux'
import {
    getProducts,
    getProductsAll,
} from '../../Products/Create/productSlice.js'
import {map} from 'lodash'
import {exportExcel} from '../../../App/globalFunctions.js'
import {universalToast} from '../../../Components/ToastMessages/ToastMessages.js'
import {useTranslation} from 'react-i18next'

const MarketProducts = () => {
    const {t} = useTranslation(['common'])
    const dispatch = useDispatch()
    const {
        products,
        total,
        loading,
        lastProductCode,
        searchedProducts,
        totalSearched,
        loadingExcel,
    } = useSelector((state) => state.products)
    const [data, setData] = useState(products)
    const [searchedData, setSearchedData] = useState(searchedProducts)
    const [showByTotal, setShowByTotal] = useState('10')
    const [currentPage, setCurrentPage] = useState(0)
    const [filteredDataTotal, setFilteredDataTotal] = useState(total)
    const [searchByCode, setSearchByCode] = useState('')
    const [searchByName, setSearchByName] = useState('')
    const [searchByCategory, setSearchByCategory] = useState('')
    const exportData = () => {
        let fileName = 'Maxsulotlar'
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
        const body = {
            search: {
                name: searchByName.replace(/\s+/g, ' ').trim(),
                code: searchByCode.replace(/\s+/g, ' ').trim(),
                category: searchByCategory.replace(/\s+/g, ' ').trim(),
            },
        }
        dispatch(getProductsAll(body)).then(({error, payload}) => {
            if (!error) {
                if (payload?.length > 0) {
                    const newData = map(payload, (item, index) => ({
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
                } else {
                    universalToast("Jadvalda ma'lumot mavjud emas !", 'warning')
                }
            }
        })
    }

    useEffect(() => {
        const body = {
            currentPage,
            countPage: showByTotal,
            search: {
                name: searchByName.replace(/\s+/g, ' ').trim(),
                code: searchByCode.replace(/\s+/g, ' ').trim(),
                category: searchByCategory.replace(/\s+/g, ' ').trim(),
            },
        }
        dispatch(getProducts(body))
        //    eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, showByTotal, dispatch])
    useEffect(() => {
        setData(products)
    }, [products])
    useEffect(() => {
        setSearchedData(searchedProducts)
    }, [searchedProducts])
    useEffect(() => {
        setFilteredDataTotal(total)
    }, [total])
    return (
        <div className='mainPadding'>
            <LinkToBack link={'/dukonlar/hamkorlar'} />
            <div className={'flex justify-between items-center mainPadding'}>
                <div className={'flex gap-[1.5rem]'}>
                    <ExportBtn onClick={exportData} />
                </div>
                <h3 className={'text-blue-900 text-[xl] leading-[1.875rem]'}>
                    {t('Maxsulotlar')}
                </h3>
                {(filteredDataTotal !== 0 || totalSearched !== 0) && (
                    <Pagination
                        countPage={Number(showByTotal)}
                        totalDatas={totalSearched || filteredDataTotal}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </div>
            <SearchForm
                filterBy={[
                    'total',
                    'barcode',
                    'category',
                    'code',
                    'name',
                    'doubleDate',
                ]}
                // filterByCode={filterByCode}
                // filterByCodeAndNameAndCategoryWhenPressEnter={
                //     filterByCodeAndNameAndCategoryWhenPressEnter
                // }
                // filterByName={filterByName}
                // filterByTotal={filterByTotal}
                // searchByCode={searchByCode}
                // searchByName={searchByName}
                // searchByCategory={searchByCategory}
                // filterByCategory={filterByCategory}
                // barCode={barCode}
                // filterByBarcode={filterByBarcode}
                // filterByBarcodeWhenPressEnter={filterByBarcodeWhenPressEnter}
            />
        </div>
    )
}

export default MarketProducts
